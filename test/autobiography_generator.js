// Autobiography Generator - Creates first-person narratives revealing internal character perspectives
class AutobiographyGenerator {
    constructor() {
        this.milestones = [];
        this.struggles = [];
        this.passions = [];
        this.writingStyles = [];
        this.loadData();
    }

    // Load all autobiography data
    async loadData() {
        try {
            this.milestones = await this.loadCSVData('autobiography_milestones.csv') || this.getDefaultMilestones();
            this.struggles = await this.loadCSVData('personal_struggles.csv') || this.getDefaultStruggles();
            this.passions = await this.loadCSVData('secret_passions.csv') || this.getDefaultPassions();
            this.writingStyles = await this.loadCSVData('writing_styles.csv') || this.getDefaultStyles();
        } catch (error) {
            console.warn('Using fallback autobiography data:', error);
            this.milestones = this.getDefaultMilestones();
            this.struggles = this.getDefaultStruggles();
            this.passions = this.getDefaultPassions();
            this.writingStyles = this.getDefaultStyles();
        }
    }

    // Load CSV data helper
    async loadCSVData(filename) {
        try {
            const response = await fetch(filename);
            const text = await response.text();
            return this.parseCSV(text);
        } catch (error) {
            console.warn(`Could not load ${filename}:`, error);
            return null;
        }
    }

    // Parse CSV data
    parseCSV(text) {
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = this.parseCSVLine(line);
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            return obj;
        });
    }

    // Parse CSV line handling quoted values
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    // Generate complete autobiography for a character
    generateAutobiography(character) {
        const age = character.basicInfo.age;
        const style = this.getWritingStyle(age);
        const selectedMilestones = this.selectMilestones(character);
        const selectedStruggles = this.selectStruggles(character);
        const selectedPassions = this.selectPassions(character);

        const autobiography = {
            opening: this.generateOpening(character, style),
            childhood: this.generateChildhoodSection(character, selectedMilestones, style),
            formativeYears: this.generateFormativeSection(character, selectedMilestones, style),
            struggles: this.generateStrugglesSection(character, selectedStruggles, style),
            passions: this.generatePassionsSection(character, selectedPassions, style),
            relationships: this.generateRelationshipsSection(character, selectedMilestones, style),
            currentLife: this.generateCurrentSection(character, style),
            reflection: this.generateReflection(character, style)
        };

        return this.assembleAutobiography(autobiography, style);
    }

    // Get appropriate writing style for age
    getWritingStyle(age) {
        const style = this.writingStyles.find(s => {
            const [min, max] = s.age_range.split('-').map(n => parseInt(n));
            return age >= min && age <= max;
        });

        return style || this.writingStyles[0] || this.getDefaultStyle();
    }

    // Select relevant milestones for character
    selectMilestones(character) {
        const age = character.basicInfo.age;
        const relevantMilestones = this.milestones.filter(milestone => {
            const [min, max] = milestone.age_range.split('-').map(n => parseInt(n));
            return age >= max; // Character is old enough to have experienced this
        });

        // Select 3-5 diverse milestones
        const selected = [];
        const categories = [...new Set(relevantMilestones.map(m => m.category))];
        
        categories.forEach(category => {
            const categoryMilestones = relevantMilestones.filter(m => m.category === category);
            if (categoryMilestones.length > 0) {
                const random = categoryMilestones[Math.floor(Math.random() * categoryMilestones.length)];
                selected.push(random);
            }
        });

        return selected.slice(0, 5); // Limit to 5 milestones
    }

    // Select relevant struggles for character
    selectStruggles(character) {
        const age = character.basicInfo.age;
        const traits = this.getAllTraits(character);
        
        // Filter struggles by age relevance
        const ageAppropriate = this.struggles.filter(struggle => {
            if (struggle.age_relevance === 'All') return true;
            if (struggle.age_relevance === 'Teen+' && age >= 13) return true;
            if (struggle.age_relevance === 'Adult' && age >= 18) return true;
            return false;
        });

        // Select 2-3 struggles that might fit the character
        const selected = [];
        const categories = ['Health', 'Financial', 'Family', 'Mental', 'Relationships', 'Work', 'Identity'];
        
        categories.forEach(category => {
            const categoryStruggles = ageAppropriate.filter(s => s.category === category);
            if (categoryStruggles.length > 0 && Math.random() < 0.4) { // 40% chance per category
                const random = categoryStruggles[Math.floor(Math.random() * categoryStruggles.length)];
                selected.push(random);
            }
        });

        return selected.slice(0, 3); // Limit to 3 struggles
    }

    // Select secret passions for character
    selectPassions(character) {
        const age = character.basicInfo.age;
        const occupation = character.basicInfo.occupation;
        
        // Filter passions that might conflict with their public persona
        const relevant = this.passions.filter(passion => {
            const [min, max] = passion.age_discovery.includes('-') ? 
                passion.age_discovery.split('-').map(n => parseInt(n)) : 
                [parseInt(passion.age_discovery) || 15, 99];
            return age >= min;
        });

        // Select 1-2 passions
        const selected = [];
        const types = ['Creative', 'Musical', 'Intellectual', 'Physical', 'Spiritual'];
        
        types.forEach(type => {
            const typePassions = relevant.filter(p => p.passion_type === type);
            if (typePassions.length > 0 && Math.random() < 0.3) { // 30% chance per type
                const random = typePassions[Math.floor(Math.random() * typePassions.length)];
                selected.push(random);
            }
        });

        return selected.slice(0, 2); // Limit to 2 passions
    }

    // Get all traits for a character
    getAllTraits(character) {
        const allTraits = [];
        if (character.traits) {
            Object.keys(character.traits).forEach(category => {
                allTraits.push(...character.traits[category]);
            });
        }
        return allTraits;
    }

    // Generate opening section
    generateOpening(character, style) {
        const phrases = style.typical_phrases.split('|');
        const openingPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        
        return `${openingPhrase} that my life has been a series of contradictions. To most people, I'm ${character.basicInfo.name}, a ${character.basicInfo.age}-year-old ${character.basicInfo.occupation} from ${character.basicInfo.locale}. But that's just the surface, the version of me that fits neatly into conversations and forms. The real story is messier, more complicated, and infinitely more human.`;
    }

    // Generate childhood section
    generateChildhoodSection(character, milestones, style) {
        const childhoodMilestones = milestones.filter(m => m.category === 'Childhood');
        if (childhoodMilestones.length === 0) {
            return `My childhood in ${character.basicInfo.locale} shaped me in ways I'm still discovering. Like most kids, I thought my family was normal until I started comparing it to others.`;
        }

        const milestone = childhoodMilestones[0];
        const continuations = milestone.continuation_options.split('|');
        const continuation = continuations[Math.floor(Math.random() * continuations.length)];
        
        return `${milestone.template_start}, ${continuation}. That memory captures something essential about who I was then - and maybe who I still am underneath everything else. Growing up in ${character.basicInfo.locale}, I learned early that the world was bigger and more complex than our little corner of it.`;
    }

    // Generate formative years section
    generateFormativeSection(character, milestones, style) {
        const formativeMilestones = milestones.filter(m => 
            m.category === 'Education' || m.category === 'Transportation' || m.category === 'Independence'
        );
        
        if (formativeMilestones.length === 0) {
            return `My teenage years were a blur of trying to figure out who I was supposed to be. School, friends, family expectations - everything felt like it was pulling me in different directions.`;
        }

        const milestone = formativeMilestones[0];
        const continuations = milestone.continuation_options.split('|');
        const continuation = continuations[Math.floor(Math.random() * continuations.length)];
        
        return `${milestone.template_start} ${continuation}. Looking back, that was probably the moment I started understanding that growing up meant making choices that would define me. Every decision felt enormous then, like it would determine the rest of my life.`;
    }

    // Generate struggles section
    generateStrugglesSection(character, struggles, style) {
        if (struggles.length === 0) {
            return `Like everyone, I've had my share of challenges. Some I've overcome, others I'm still working through. The hardest part is that most people never see the struggles that shape us most.`;
        }

        const struggle = struggles[0];
        return `${struggle.narrative_hook} ${struggle.internal_dialogue}. ${struggle.coping_mechanism}. It's something I don't talk about much, but it's been a constant companion in my journey to becoming who I am today.`;
    }

    // Generate passions section
    generatePassionsSection(character, passions, style) {
        if (passions.length === 0) {
            return `I've always had interests that don't quite fit the image people have of me. There are parts of myself I keep private, not because I'm ashamed, but because they feel too precious to share with just anyone.`;
        }

        const passion = passions[0];
        return `${passion.expression} ${passion.internal_motivation}. But ${passion.external_barrier}. So I keep this part of myself hidden, a secret garden that blooms only when no one is watching.`;
    }

    // Generate relationships section
    generateRelationshipsSection(character, milestones, style) {
        const relationshipMilestones = milestones.filter(m => m.category === 'Relationships');
        
        if (relationshipMilestones.length === 0) {
            return `Relationships have always been complicated for me. I want to connect with people, but I also fear being truly known. It's easier to show people the version of me they expect to see.`;
        }

        const milestone = relationshipMilestones[0];
        const continuations = milestone.continuation_options.split('|');
        const continuation = continuations[Math.floor(Math.random() * continuations.length)];
        
        return `${milestone.template_start} ${continuation}. That experience taught me that love - whether romantic, familial, or friendship - requires a kind of courage I'm still learning to cultivate.`;
    }

    // Generate current life section
    generateCurrentSection(character, style) {
        const perspectives = style.perspective_markers.split('|');
        const perspective = perspectives[Math.floor(Math.random() * perspectives.length)];
        
        return `${perspective} that being a ${character.basicInfo.occupation} is both exactly what I expected and nothing like I imagined. The day-to-day reality is different from the dreams, but there's something satisfying about building a life that's recognizably mine, even if it's not perfect.`;
    }

    // Generate reflection section
    generateReflection(character, style) {
        const age = character.basicInfo.age;
        
        if (age < 25) {
            return `I'm still figuring out who I'm supposed to be. Some days I feel like I have it all together, other days I feel like I'm pretending to be an adult. But maybe that's normal. Maybe everyone is just making it up as they go along.`;
        } else if (age < 40) {
            return `I'm learning to accept that I'm not the person I thought I'd be at this age, and that's okay. Life has a way of surprising you, of taking you down paths you never planned to walk. The key is staying open to the journey.`;
        } else if (age < 60) {
            return `Looking back, I can see the threads that connect all the different versions of myself. The child who dreamed, the young adult who struggled, the person I am now - we're all the same person, just at different points in the story.`;
        } else {
            return `At this stage of life, I'm more interested in authenticity than approval. I've learned that the opinions that matter most are the ones that come from people who truly know me - including my own.`;
        }
    }

    // Assemble complete autobiography
    assembleAutobiography(sections, style) {
        return `
<div class="autobiography">
    <p class="opening">${sections.opening}</p>
    
    <p class="childhood">${sections.childhood}</p>
    
    <p class="formative">${sections.formativeYears}</p>
    
    <p class="struggles">${sections.struggles}</p>
    
    <p class="passions">${sections.passions}</p>
    
    <p class="relationships">${sections.relationships}</p>
    
    <p class="current">${sections.currentLife}</p>
    
    <p class="reflection">${sections.reflection}</p>
</div>`;
    }

    // Default data if CSV files aren't available
    getDefaultMilestones() {
        return [
            {
                category: 'Childhood',
                milestone: 'First Memory',
                age_range: '3-7',
                template_start: 'I remember when I was small',
                emotional_tone: 'nostalgic',
                continuation_options: 'the smell of my grandmother\'s kitchen|the sound of rain on our old roof|my father\'s hands lifting me up'
            },
            {
                category: 'Education',
                milestone: 'Influential Teacher',
                age_range: '8-18',
                template_start: 'There was this teacher who',
                emotional_tone: 'formative',
                continuation_options: 'saw something in me that I didn\'t see myself|made me believe I was smarter than I thought|taught me that failure wasn\'t the end of the world'
            }
        ];
    }

    getDefaultStruggles() {
        return [
            {
                category: 'Mental',
                struggle_type: 'Self-Doubt',
                description: 'Questioning self-worth and abilities',
                age_relevance: 'Teen+',
                narrative_hook: 'What people don\'t see is',
                internal_dialogue: 'how often I question whether I\'m good enough',
                coping_mechanism: 'I\'ve learned to focus on progress, not perfection'
            }
        ];
    }

    getDefaultPassions() {
        return [
            {
                passion_type: 'Creative',
                activity: 'Writing',
                why_secret: 'Fear of judgment',
                age_discovery: 'Teen',
                expression: 'I write in my spare time',
                internal_motivation: 'Words help me make sense of the world',
                external_barrier: 'People think it\'s impractical'
            }
        ];
    }

    getDefaultStyles() {
        return [
            {
                age_range: '15-25',
                style_name: 'Discovering',
                characteristics: 'Uncertain, energetic, questioning',
                vocabulary_level: 'Simple-Medium',
                sentence_structure: 'Short, fragmented',
                typical_phrases: 'I don\'t know if|Maybe I\'m wrong but|I feel like',
                emotional_tone: 'Intense, hopeful, confused',
                perspective_markers: 'I\'m still figuring out|I don\'t understand why|Everything feels so'
            }
        ];
    }

    getDefaultStyle() {
        return {
            age_range: '25-35',
            style_name: 'Establishing',
            characteristics: 'Reflective, building foundations',
            vocabulary_level: 'Medium',
            sentence_structure: 'Clear, structured',
            typical_phrases: 'I\'ve learned that|What I know is|I realize now',
            emotional_tone: 'Confident, focused',
            perspective_markers: 'I know now|I\'ve learned|I understand'
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutobiographyGenerator;
} else {
    window.AutobiographyGenerator = AutobiographyGenerator;
}

