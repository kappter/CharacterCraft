// Enhanced CharacterCraft - Main Script with Autobiography Features
class CharacterCraft {
    constructor() {
        this.characters = JSON.parse(localStorage.getItem('characters')) || [];
        this.currentCharacter = null;
        this.autobiographyData = this.initializeAutobiographyData();
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.initializeTheme();
        this.updateCharacterSelects();
        this.displaySavedCharacters();
        console.log('Enhanced CharacterCraft initialized');
    }

    initializeAutobiographyData() {
        return {
            milestones: [
                { category: 'childhood', text: 'I remember the smell of {locale_food} cooking in our kitchen, and how {parent_figure} would tell me stories about {cultural_element}.' },
                { category: 'education', text: 'School was where I first realized I was {trait1}. My teacher, {teacher_name}, saw something in me that I didn\'t see in myself.' },
                { category: 'first_job', text: 'My first real job taught me that being {trait2} wasn\'t always an advantage in the workplace.' },
                { category: 'relationships', text: 'I learned about love through {relationship_type}, which showed me both my capacity for {positive_trait} and my tendency toward {struggle_area}.' },
                { category: 'transportation', text: 'I still remember my first {transport_method} - it represented freedom, but also the weight of responsibility.' }
            ],
            struggles: [
                { type: 'health', text: 'What people don\'t know is that I\'ve been dealing with {health_issue} for years. It\'s shaped how I approach {life_area}.' },
                { type: 'financial', text: 'Money has always been a source of anxiety for me. Growing up {financial_background}, I learned to {coping_mechanism}.' },
                { type: 'relationships', text: 'I struggle with {relationship_issue}, which makes it hard for people to see past my {public_trait} exterior.' },
                { type: 'identity', text: 'Sometimes I feel like I\'m performing a version of myself that others expect, rather than being who I really am.' }
            ],
            secrets: [
                { type: 'creative', text: 'In private, I write {creative_outlet}. It\'s something I\'ve never shared because {fear_reason}.' },
                { type: 'dreams', text: 'I\'ve always dreamed of {secret_dream}, but I\'ve never told anyone because it seems {perceived_barrier}.' },
                { type: 'past', text: 'There\'s something from my past in {locale} that I\'ve never talked about - {past_event}.' }
            ],
            writingStyles: {
                young: { tone: 'energetic', uncertainty: 'high', discovery: 'high' },
                middle: { tone: 'reflective', uncertainty: 'medium', discovery: 'medium' },
                mature: { tone: 'contemplative', uncertainty: 'low', discovery: 'low' }
            }
        };
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = e.target.dataset.tab;
                this.switchTab(tabId);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', () => this.toggleTheme());
        }

        // Character creation
        document.querySelector('.randomize-everything')?.addEventListener('click', () => this.randomizeAll());
        document.querySelector('.generate-bio')?.addEventListener('click', () => this.generateBio());
        document.querySelector('.generate-autobiography')?.addEventListener('click', () => this.generateAutobiography());
        document.querySelector('.save-character')?.addEventListener('click', () => this.saveCharacter());

        // Individual randomization buttons
        document.querySelector('.randomize-name')?.addEventListener('click', () => this.randomizeName());
        document.querySelector('.randomize-age')?.addEventListener('click', () => this.randomizeAge());
        document.querySelector('.randomize-gender')?.addEventListener('click', () => this.randomizeGender());
        document.querySelector('.randomize-locale')?.addEventListener('click', () => this.randomizeLocale());
        document.querySelector('.randomize-occupation')?.addEventListener('click', () => this.randomizeOccupation());
        document.querySelector('.randomize-traits')?.addEventListener('click', () => this.randomizeTraits());

        // Export buttons
        document.querySelector('.export-bio')?.addEventListener('click', () => this.exportBio());
        document.querySelector('.export-autobiography')?.addEventListener('click', () => this.exportAutobiography());
        document.querySelector('.export-full-report')?.addEventListener('click', () => this.exportFullReport());

        // Character comparison
        document.querySelector('.compare-characters')?.addEventListener('click', () => this.compareCharacters());
        document.querySelector('.randomize-comparison')?.addEventListener('click', () => this.randomizeComparison());
        document.querySelector('.randomize-conflict')?.addEventListener('click', () => this.randomizeConflict());
        document.querySelector('.export-comparison')?.addEventListener('click', () => this.exportComparison());

        // Reset app
        document.querySelector('.reset-app')?.addEventListener('click', () => this.resetApp());
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.checked = savedTheme === 'dark';
        }
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    switchTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`)?.classList.add('active');

        // Refresh data for specific tabs
        if (tabId === 'saved') {
            this.displaySavedCharacters();
        } else if (tabId === 'compare') {
            this.updateCharacterSelects();
        }
    }

    // Character Creation Methods
    randomizeAll() {
        this.randomizeName();
        this.randomizeAge();
        this.randomizeGender();
        this.randomizeLocale();
        this.randomizeOccupation();
        this.randomizeTraits();
    }

    randomizeName() {
        const names = [
            // Western Names
            'Elena Rodriguez', 'Marcus Chen', 'Aria Patel', 'Kai Thompson', 'Luna Nakamura',
            'Diego Santos', 'Zara Ahmed', 'Felix Kowalski', 'Maya Singh', 'River Johnson',
            'Sophia Andersson', 'Dmitri Volkov', 'Amara Okafor', 'Liam O\'Brien', 'Yuki Tanaka',
            'Isabella Garcia', 'Noah Williams', 'Emma Thompson', 'Oliver Martinez', 'Ava Davis',
            'Ethan Brown', 'Mia Wilson', 'Lucas Anderson', 'Charlotte Taylor', 'Mason Moore',
            
            // International Names
            'Akira Yamamoto', 'Priya Sharma', 'Hassan Al-Rashid', 'Ingrid Larsson', 'Raj Gupta',
            'Fatima Hassan', 'Nikolai Petrov', 'Kenji Sato', 'Aaliyah Johnson', 'Tariq Rahman',
            'Anastasia Kozlov', 'Hiroshi Tanaka', 'Leila Mansouri', 'Viktor Novak', 'Sakura Ito',
            'Amara Diallo', 'Ravi Krishnan', 'Nadia Popov', 'Kenzo Watanabe', 'Zara Okafor',
            
            // Modern Names
            'Phoenix Rivera', 'Sage Mitchell', 'Rowan Clarke', 'Indigo Walsh', 'Atlas Stone',
            'Nova Sterling', 'Orion Blake', 'Iris Delacroix', 'Jasper Cross', 'Willow Hayes',
            'Aspen Reid', 'Ember Fox', 'Storm Blackwood', 'Rain Sinclair', 'Sky Winters',
            
            // Classic Names
            'Alexander Blackthorne', 'Victoria Ashworth', 'Theodore Pemberton', 'Evangeline Cross',
            'Sebastian Hartwell', 'Cordelia Fairfax', 'Maximilian Grey', 'Ophelia Sinclair',
            'Augustus Sterling', 'Persephone Vale', 'Bartholomew Ashford', 'Seraphina Blackwood',
            
            // Cultural Names
            'Kwame Asante', 'Chioma Okwu', 'Rajesh Mehta', 'Ananya Iyer', 'Kofi Mensah',
            'Adaora Nwosu', 'Vikram Reddy', 'Kavya Nair', 'Kwaku Boateng', 'Nneka Okafor',
            'Arjun Kapoor', 'Deepika Rao', 'Kojo Appiah', 'Folake Adebayo', 'Rohit Joshi',
            
            // Unique Names
            'Zephyr Nightingale', 'Lyra Moonstone', 'Caspian Wilde', 'Serenity Dawn',
            'Orion Blackwater', 'Luna Starweaver', 'Phoenix Shadowmere', 'Aria Stormwind',
            'Sage Thornfield', 'River Goldleaf', 'Atlas Ironwood', 'Nova Brightwater',
            
            // Professional Names
            'Dr. Miranda Foster', 'Prof. James Whitfield', 'Captain Sarah Mitchell', 'Chef Antoine Dubois',
            'Detective Rosa Morales', 'Judge Patricia Wong', 'Mayor David Kim', 'Senator Lisa Park'
        ];
        const randomName = names[Math.floor(Math.random() * names.length)];
        document.getElementById('name').value = randomName;
    }

    randomizeAge() {
        const age = Math.floor(Math.random() * 60) + 18; // 18-77
        document.getElementById('age').value = age;
    }

    randomizeGender() {
        const genders = ['Male', 'Female', 'Non-binary', 'Other'];
        const randomGender = genders[Math.floor(Math.random() * genders.length)];
        document.getElementById('gender').value = randomGender;
    }

    randomizeLocale() {
        const locales = [
            // Major Cities
            'Barcelona, Spain', 'Tokyo, Japan', 'New York, USA', 'London, UK', 'Sydney, Australia',
            'Toronto, Canada', 'Berlin, Germany', 'Mumbai, India', 'São Paulo, Brazil', 'Cairo, Egypt',
            'Stockholm, Sweden', 'Cape Town, South Africa', 'Seoul, South Korea', 'Dublin, Ireland',
            'Paris, France', 'Rome, Italy', 'Amsterdam, Netherlands', 'Vienna, Austria', 'Prague, Czech Republic',
            
            // Asian Cities
            'Bangkok, Thailand', 'Singapore', 'Hong Kong', 'Kyoto, Japan', 'Beijing, China',
            'Shanghai, China', 'Kuala Lumpur, Malaysia', 'Manila, Philippines', 'Jakarta, Indonesia',
            'Ho Chi Minh City, Vietnam', 'Taipei, Taiwan', 'Osaka, Japan', 'Busan, South Korea',
            
            // European Cities
            'Copenhagen, Denmark', 'Helsinki, Finland', 'Oslo, Norway', 'Zurich, Switzerland',
            'Brussels, Belgium', 'Lisbon, Portugal', 'Athens, Greece', 'Budapest, Hungary',
            'Warsaw, Poland', 'Reykjavik, Iceland', 'Edinburgh, Scotland', 'Florence, Italy',
            
            // American Cities
            'San Francisco, USA', 'Los Angeles, USA', 'Chicago, USA', 'Boston, USA',
            'Vancouver, Canada', 'Montreal, Canada', 'Mexico City, Mexico', 'Buenos Aires, Argentina',
            'Lima, Peru', 'Bogotá, Colombia', 'Santiago, Chile', 'Montevideo, Uruguay',
            
            // African Cities
            'Lagos, Nigeria', 'Nairobi, Kenya', 'Marrakech, Morocco', 'Casablanca, Morocco',
            'Addis Ababa, Ethiopia', 'Accra, Ghana', 'Dakar, Senegal', 'Tunis, Tunisia',
            'Johannesburg, South Africa', 'Durban, South Africa', 'Alexandria, Egypt',
            
            // Middle Eastern Cities
            'Dubai, UAE', 'Tel Aviv, Israel', 'Istanbul, Turkey', 'Beirut, Lebanon',
            'Doha, Qatar', 'Kuwait City, Kuwait', 'Riyadh, Saudi Arabia', 'Tehran, Iran',
            
            // Unique/Smaller Places
            'Reykjavik, Iceland', 'Tallinn, Estonia', 'Riga, Latvia', 'Vilnius, Lithuania',
            'Ljubljana, Slovenia', 'Sarajevo, Bosnia', 'Skopje, North Macedonia', 'Tirana, Albania',
            'Wellington, New Zealand', 'Perth, Australia', 'Adelaide, Australia', 'Darwin, Australia'
        ];
        const randomLocale = locales[Math.floor(Math.random() * locales.length)];
        document.getElementById('locale').value = randomLocale;
    }

    randomizeOccupation() {
        const occupations = [
            // Technology
            'Software Engineer', 'Data Scientist', 'UX Designer', 'Cybersecurity Analyst', 'AI Researcher',
            'Web Developer', 'Mobile App Developer', 'DevOps Engineer', 'Product Manager', 'Systems Administrator',
            
            // Creative Arts
            'Graphic Designer', 'Photographer', 'Filmmaker', 'Musician', 'Artist', 'Writer', 'Animator',
            'Fashion Designer', 'Interior Designer', 'Sculptor', 'Illustrator', 'Video Editor',
            
            // Healthcare
            'Doctor', 'Nurse', 'Therapist', 'Psychologist', 'Dentist', 'Veterinarian', 'Pharmacist',
            'Physical Therapist', 'Surgeon', 'Pediatrician', 'Radiologist', 'Paramedic',
            
            // Education
            'Teacher', 'Professor', 'School Principal', 'Librarian', 'Educational Consultant',
            'Tutor', 'Research Scientist', 'Academic Advisor', 'Curriculum Developer',
            
            // Business & Finance
            'Accountant', 'Financial Advisor', 'Investment Banker', 'Marketing Manager', 'Sales Representative',
            'Business Analyst', 'Consultant', 'Entrepreneur', 'Real Estate Agent', 'Insurance Agent',
            
            // Service Industry
            'Chef', 'Restaurant Manager', 'Barista', 'Hotel Manager', 'Travel Agent', 'Event Planner',
            'Personal Trainer', 'Hairstylist', 'Massage Therapist', 'Wedding Planner',
            
            // Media & Communications
            'Journalist', 'News Anchor', 'Radio Host', 'Public Relations Specialist', 'Social Media Manager',
            'Content Creator', 'Podcaster', 'Translator', 'Editor', 'Copywriter',
            
            // Science & Research
            'Marine Biologist', 'Environmental Scientist', 'Chemist', 'Physicist', 'Archaeologist',
            'Geologist', 'Astronomer', 'Botanist', 'Zoologist', 'Climate Researcher',
            
            // Public Service
            'Police Officer', 'Firefighter', 'Social Worker', 'Judge', 'Lawyer', 'Diplomat',
            'City Planner', 'Government Official', 'Military Officer', 'Emergency Dispatcher',
            
            // Unique/Specialized
            'Food Critic', 'Wine Sommelier', 'Professional Athlete', 'Life Coach', 'Voice Actor',
            'Stunt Performer', 'Cruise Ship Captain', 'Park Ranger', 'Museum Curator', 'Art Restorer'
        ];
        const randomOccupation = occupations[Math.floor(Math.random() * occupations.length)];
        document.getElementById('occupation').value = randomOccupation;
    }

    randomizeTraits() {
        const traits = [
            // Positive Traits
            'Creative', 'Analytical', 'Empathetic', 'Ambitious', 'Calm', 'Adventurous',
            'Organized', 'Spontaneous', 'Patient', 'Energetic', 'Optimistic', 'Confident',
            'Independent', 'Collaborative', 'Loyal', 'Honest', 'Generous', 'Compassionate',
            'Resilient', 'Innovative', 'Charismatic', 'Diplomatic', 'Resourceful', 'Determined',
            'Witty', 'Charming', 'Thoughtful', 'Reliable', 'Adaptable', 'Courageous',
            
            // Personality Types
            'Introverted', 'Extroverted', 'Intuitive', 'Logical', 'Emotional', 'Practical',
            'Idealistic', 'Realistic', 'Perfectionist', 'Flexible', 'Traditional', 'Progressive',
            'Cautious', 'Bold', 'Reserved', 'Outgoing', 'Methodical', 'Impulsive',
            
            // Social Traits
            'Sociable', 'Solitary', 'Talkative', 'Quiet', 'Friendly', 'Aloof', 'Warm',
            'Distant', 'Supportive', 'Critical', 'Trusting', 'Skeptical', 'Open-minded',
            'Judgmental', 'Inclusive', 'Exclusive', 'Humble', 'Proud', 'Modest', 'Boastful',
            
            // Work Ethic
            'Hardworking', 'Lazy', 'Dedicated', 'Casual', 'Focused', 'Scattered',
            'Disciplined', 'Undisciplined', 'Punctual', 'Tardy', 'Thorough', 'Hasty',
            'Detail-oriented', 'Big-picture', 'Efficient', 'Inefficient',
            
            // Emotional Traits
            'Sensitive', 'Thick-skinned', 'Moody', 'Even-tempered', 'Passionate', 'Indifferent',
            'Jealous', 'Secure', 'Anxious', 'Relaxed', 'Excitable', 'Stoic', 'Dramatic',
            'Understated', 'Volatile', 'Stable', 'Melancholic', 'Cheerful',
            
            // Intellectual Traits
            'Curious', 'Incurious', 'Wise', 'Naive', 'Scholarly', 'Practical', 'Philosophical',
            'Concrete', 'Abstract', 'Literal', 'Imaginative', 'Factual', 'Speculative',
            'Empirical', 'Theoretical', 'Applied',
            
            // Unique Traits
            'Eccentric', 'Conventional', 'Mysterious', 'Transparent', 'Unpredictable', 'Consistent',
            'Quirky', 'Serious', 'Playful', 'Stern', 'Mischievous', 'Responsible', 'Rebellious',
            'Conformist', 'Artistic', 'Scientific', 'Spiritual', 'Materialistic'
        ];
        const selectedTraits = [];
        const numTraits = Math.floor(Math.random() * 3) + 2; // 2-4 traits
        
        for (let i = 0; i < numTraits; i++) {
            const availableTraits = traits.filter(trait => !selectedTraits.includes(trait));
            if (availableTraits.length > 0) {
                const randomTrait = availableTraits[Math.floor(Math.random() * availableTraits.length)];
                selectedTraits.push(randomTrait);
            }
        }
        
        document.getElementById('traits').value = selectedTraits.join(', ');
    }

    generateBio() {
        const character = this.getCharacterFromForm();
        if (!character.name) {
            alert('Please enter a character name first.');
            return;
        }

        const bio = this.generateDetailedBio(character);
        const bioOutput = document.getElementById('shortBioOutput');
        if (bioOutput) {
            bioOutput.innerHTML = bio;
            bioOutput.classList.remove('empty');
        }
        
        // Enable export buttons
        this.enableExportButtons(['bio', 'full']);
    }

    generateAutobiography() {
        const character = this.getCharacterFromForm();
        if (!character.name) {
            alert('Please enter a character name first.');
            return;
        }

        const autobiography = this.generateDetailedAutobiography(character);
        const autobiographyOutput = document.getElementById('autobiographyOutput');
        if (autobiographyOutput) {
            autobiographyOutput.innerHTML = autobiography;
            autobiographyOutput.classList.remove('empty');
        }
        
        // Enable export buttons
        this.enableExportButtons(['autobiography', 'full']);
    }

    generateDetailedBio(character) {
        const age = character.age;
        const traits = character.traits.split(',').map(t => t.trim()).filter(t => t);
        
        // Generate contextual details based on character info
        const ageGroup = age < 30 ? 'young' : age < 50 ? 'middle-aged' : 'experienced';
        const primaryTraits = traits.slice(0, 3);
        const locale = character.locale || 'an undisclosed location';
        
        return `
            <h3>Character Biography</h3>
            <p><strong>${character.name}</strong>, a ${age}-year-old ${character.gender} ${character.occupation} from ${locale}, is known for their distinctive personality traits including ${primaryTraits.join(', ')}.</p>
            <p>As a ${ageGroup} professional in their field, ${character.name} has developed a reputation for being ${primaryTraits[0]?.toLowerCase() || 'dedicated'} and ${primaryTraits[1]?.toLowerCase() || 'reliable'}. Their background in ${locale} has given them a unique perspective that influences both their personal relationships and professional approach.</p>
            <p>Colleagues and friends describe ${character.name} as someone who embodies ${primaryTraits.slice(0, 2).join(' and ')}, making them both memorable and influential in their personal and professional circles. Their work as a ${character.occupation} reflects their core values and has shaped their worldview significantly.</p>
            <p>Those who know ${character.name} well would say that their ${traits.slice(-1)[0]?.toLowerCase() || 'unique'} nature, combined with their life experiences in ${locale}, has created a complex individual whose external persona only hints at the depth of their character.</p>
        `;
    }

    generateDetailedAutobiography(character) {
        const age = character.age;
        const traits = character.traits.split(',').map(t => t.trim()).filter(t => t);
        const locale = character.locale || 'my hometown';
        const occupation = character.occupation || 'my work';
        
        // Determine writing style based on age
        let ageStyle = '';
        let lifeReflection = '';
        
        if (age < 25) {
            ageStyle = "I'm still figuring out who I'm supposed to be. Some days I feel like I have it all together, other days I feel like I'm pretending to be an adult.";
            lifeReflection = "Everything feels so immediate, so important. I know I'm supposed to have a plan, but honestly, I'm just trying to figure out what makes me happy.";
        } else if (age < 40) {
            ageStyle = "I'm learning to accept that I'm not the person I thought I'd be at this age, and that's okay. Life has a way of surprising you.";
            lifeReflection = "I've started to understand that the path isn't always straight, and that the detours often teach you more than the destination.";
        } else if (age < 60) {
            ageStyle = "Looking back, I can see the threads that connect all the different versions of myself. The experiences that shaped me, the choices that defined me.";
            lifeReflection = "I've learned that wisdom isn't about having all the answers - it's about asking better questions and being comfortable with uncertainty.";
        } else {
            ageStyle = "At this stage of life, I'm more interested in authenticity than approval. I've learned that the opinions that matter most come from people who truly know me.";
            lifeReflection = "Time has taught me that legacy isn't about what you accomplish, but about how you touch the lives of others along the way.";
        }

        // Generate personal struggles and secrets
        const struggles = this.generatePersonalStruggles(character);
        const secrets = this.generateSecrets(character);
        
        return `
            <h3>Autobiography</h3>
            <div class="autobiography-output">
                <p>My name is ${character.name}, and if you met me, you'd probably see a ${age}-year-old ${character.occupation} from ${locale}. But that's just the surface, the version of me that fits neatly into conversations and forms. The real story is messier, more complicated, and infinitely more human.</p>
                
                <p>Growing up in ${locale}, I learned early that the world was bigger and more complex than our little corner of it. My childhood was filled with moments that seemed ordinary then but feel significant now - the smell of morning coffee, the sound of familiar voices, the weight of expectations I didn't yet understand.</p>
                
                <p>People often describe me as ${traits.slice(0, 2).join(' and ')}, and I suppose that's accurate enough. But what they don't see is how those traits developed - through struggles with self-doubt, through relationships that taught me about vulnerability, through quiet moments when I questioned everything I thought I knew about myself.</p>
                
                <p>${struggles}</p>
                
                <p>My work as a ${occupation} is both exactly what I expected and nothing like I imagined. The day-to-day reality is different from the dreams, but there's something satisfying about building a life that's recognizably mine, even if it's not perfect.</p>
                
                <p>${secrets}</p>
                
                <p class="quote">${ageStyle} ${lifeReflection}</p>
                
                <p>Maybe that's what growing up really means - not having all the answers, but being comfortable with the questions. Not being perfect, but being real. Not having everything figured out, but being willing to keep learning, keep growing, keep becoming.</p>
            </div>
        `;
    }

    generatePersonalStruggles(character) {
        const struggles = [
            `What people don't know is that I've been dealing with anxiety for years. It's shaped how I approach relationships and work, making me both more empathetic and more guarded.`,
            `Money has always been a source of stress for me. Growing up, we didn't have much, and I learned to be careful with every dollar. Sometimes I think I'm too careful.`,
            `I struggle with feeling like I'm not enough - not smart enough, not successful enough, not interesting enough. It's something I work on every day.`,
            `There are parts of my past that I don't talk about much. Not because they're shameful, but because they're mine, and some things need to stay private to stay sacred.`
        ];
        
        return struggles[Math.floor(Math.random() * struggles.length)];
    }

    generateSecrets(character) {
        const secrets = [
            `In private, I write poetry. It's something I've never shared because it feels too vulnerable, too revealing of who I really am underneath all the roles I play.`,
            `I've always dreamed of traveling the world, not as a tourist but as someone who really understands different cultures. But I've never told anyone because it seems impractical, unrealistic.`,
            `Sometimes I feel like I'm performing a version of myself that others expect, rather than being who I really am. It's exhausting, but I'm not sure how to stop.`,
            `There's a part of me that's still that kid from ${character.locale || 'home'}, wondering if I'm fooling everyone into thinking I belong in the life I've built.`
        ];
        
        return secrets[Math.floor(Math.random() * secrets.length)];
    }

    saveCharacter() {
        const character = this.getCharacterFromForm();
        if (!character.name) {
            alert('Please enter a character name first.');
            return;
        }

        // Get generated content
        const bioElement = document.getElementById('shortBioOutput');
        const autobiographyElement = document.getElementById('autobiographyOutput');
        
        if (bioElement && !bioElement.classList.contains('empty')) {
            character.bio = bioElement.innerHTML;
        }
        
        if (autobiographyElement && !autobiographyElement.classList.contains('empty')) {
            character.autobiography = autobiographyElement.innerHTML;
        }

        character.id = Date.now().toString();
        character.createdAt = new Date().toISOString();

        this.characters.push(character);
        localStorage.setItem('characters', JSON.stringify(this.characters));

        this.updateCharacterSelects();
        this.displaySavedCharacters();
        
        alert(`Character "${character.name}" saved successfully!`);
    }

    getCharacterFromForm() {
        return {
            name: document.getElementById('name')?.value || '',
            age: parseInt(document.getElementById('age')?.value) || 25,
            gender: document.getElementById('gender')?.value || '',
            locale: document.getElementById('locale')?.value || '',
            occupation: document.getElementById('occupation')?.value || '',
            traits: document.getElementById('traits')?.value || ''
        };
    }

    compareCharacters() {
        const char1Id = document.getElementById('character1')?.value;
        const char2Id = document.getElementById('character2')?.value;
        const context = document.getElementById('context')?.value || '';

        if (!char1Id || !char2Id) {
            alert('Please select two characters to compare.');
            return;
        }

        if (char1Id === char2Id) {
            alert('Please select two different characters.');
            return;
        }

        const char1 = this.characters.find(c => c.id === char1Id);
        const char2 = this.characters.find(c => c.id === char2Id);

        const comparison = this.generateComparison(char1, char2, context);
        const comparisonOutput = document.getElementById('comparisonOutput');
        if (comparisonOutput) {
            comparisonOutput.innerHTML = comparison;
            comparisonOutput.classList.remove('empty');
        }
        
        this.enableExportButtons(['comparison']);
    }

    randomizeComparison() {
        // Random scenario contexts for character interactions
        const scenarios = [
            'trapped in an elevator together',
            'working on a project together',
            'stuck in traffic during a road trip',
            'waiting in a long line at the DMV',
            'attending the same wedding as strangers',
            'sharing a table at a crowded coffee shop',
            'both applying for the same job',
            'neighbors dealing with a power outage',
            'passengers on a delayed flight',
            'volunteers at a community event',
            'students in the same class',
            'roommates for the first time',
            'competing in a cooking competition',
            'lost in a foreign city together',
            'witnesses to the same unusual event',
            'both trying to adopt the same pet',
            'sharing an Uber during a storm',
            'contestants on a game show',
            'jury members on the same case',
            'camping in adjacent sites',
            'both trying to return the same item',
            'meeting at a speed networking event',
            'both caring for the same elderly relative',
            'competing for the last apartment',
            'both attending their first yoga class',
            'sharing a hospital waiting room',
            'both learning to drive from the same instructor',
            'meeting at a book club',
            'both trying to catch the same bus',
            'attending a cooking class together'
        ];

        // Randomly select a scenario
        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        // Set the context field
        const contextField = document.getElementById('context');
        if (contextField) {
            contextField.value = randomScenario;
        }

        // If characters are already selected, automatically generate comparison
        const char1Id = document.getElementById('character1')?.value;
        const char2Id = document.getElementById('character2')?.value;
        
        if (char1Id && char2Id && char1Id !== char2Id) {
            // Small delay to let the context field update visually
            setTimeout(() => {
                this.compareCharacters();
            }, 100);
        } else {
            alert(`Random scenario set: "${randomScenario}"\n\nPlease select two characters to see how they would interact in this situation.`);
        }
    }

    randomizeConflict() {
        // Random conflict types for character interactions
        const conflictTypes = [
            'ideological differences about social justice',
            'competing for the same romantic interest',
            'disagreement over a major life decision',
            'conflicting approaches to solving a problem',
            'past betrayal that needs to be addressed',
            'competition for a promotion or opportunity',
            'different values about money and success',
            'clash over parenting or family responsibilities',
            'opposing views on risk-taking vs. safety',
            'disagreement about loyalty vs. honesty',
            'conflict over personal boundaries',
            'different communication styles causing misunderstandings',
            'competing creative visions on a project',
            'clash between tradition and innovation',
            'disagreement about work-life balance',
            'conflict over environmental vs. economic priorities',
            'different approaches to handling conflict itself',
            'competing for limited resources or funding',
            'clash between individual needs and group needs',
            'disagreement about privacy vs. transparency',
            'conflict over religious or spiritual beliefs',
            'different attitudes toward authority and rules',
            'competing interpretations of the same event',
            'clash between perfectionism and pragmatism',
            'disagreement about timing and urgency',
            'conflict over personal vs. professional priorities',
            'different approaches to handling failure',
            'clash between optimism and realism',
            'disagreement about change vs. stability',
            'conflict over trust and vulnerability'
        ];

        // Randomly select a conflict type
        const randomConflict = conflictTypes[Math.floor(Math.random() * conflictTypes.length)];
        
        // Set the context field with conflict focus
        const contextField = document.getElementById('context');
        if (contextField) {
            contextField.value = `experiencing conflict over ${randomConflict}`;
        }

        // If characters are already selected, automatically generate comparison
        const char1Id = document.getElementById('character1')?.value;
        const char2Id = document.getElementById('character2')?.value;
        
        if (char1Id && char2Id && char1Id !== char2Id) {
            // Small delay to let the context field update visually
            setTimeout(() => {
                this.compareCharacters();
            }, 100);
        } else {
            alert(`Random conflict set: "${randomConflict}"\n\nPlease select two characters to see how they would handle this conflict.`);
        }
    }

    generateComparison(char1, char2, context) {
        const contextText = context ? ` in the context of "${context}"` : '';
        const char1Traits = char1.traits.split(',').map(t => t.trim()).filter(t => t);
        const char2Traits = char2.traits.split(',').map(t => t.trim()).filter(t => t);
        
        // Find potential conflicts and synergies
        const conflicts = this.findCharacterConflicts(char1Traits, char2Traits);
        const synergies = this.findCharacterSynergies(char1Traits, char2Traits);
        
        return `
            <h3>Character Comparison & Writing Prompt</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 1rem 0;">
                <div style="background: var(--surface-color); padding: 1.5rem; border-radius: 8px;">
                    <h4>${char1.name}</h4>
                    <p><strong>Age:</strong> ${char1.age}<br>
                    <strong>Gender:</strong> ${char1.gender}<br>
                    <strong>Occupation:</strong> ${char1.occupation}<br>
                    <strong>Location:</strong> ${char1.locale}<br>
                    <strong>Key Traits:</strong> ${char1.traits}</p>
                </div>
                <div style="background: var(--surface-color); padding: 1.5rem; border-radius: 8px;">
                    <h4>${char2.name}</h4>
                    <p><strong>Age:</strong> ${char2.age}<br>
                    <strong>Gender:</strong> ${char2.gender}<br>
                    <strong>Occupation:</strong> ${char2.occupation}<br>
                    <strong>Location:</strong> ${char2.locale}<br>
                    <strong>Key Traits:</strong> ${char2.traits}</p>
                </div>
            </div>
            
            <h4>Detailed Writing Prompt</h4>
            <div style="background: var(--surface-color); padding: 1.5rem; border-left: 4px solid var(--secondary-color); margin: 1rem 0;">
                <p><strong>Setting:</strong> ${char1.name} and ${char2.name} find themselves${contextText}. Their different backgrounds (${char1.locale} vs ${char2.locale}) and contrasting ages (${char1.age} vs ${char2.age}) create an interesting dynamic from the start.</p>
                
                <p><strong>Character Dynamics:</strong></p>
                <ul style="margin-left: 2rem;">
                    <li><strong>Potential Conflicts:</strong> ${conflicts}</li>
                    <li><strong>Possible Synergies:</strong> ${synergies}</li>
                    <li><strong>Professional Tension:</strong> The difference between a ${char1.occupation} and a ${char2.occupation} could create interesting workplace or social dynamics.</li>
                </ul>
                
                <p><strong>Story Arc Suggestions:</strong></p>
                <ul style="margin-left: 2rem;">
                    <li><strong>Initial Conflict:</strong> Their first interaction highlights their differences, particularly ${char1.name}'s ${char1Traits[0]?.toLowerCase()} nature clashing with ${char2.name}'s ${char2Traits[0]?.toLowerCase()} approach.</li>
                    <li><strong>Growing Understanding:</strong> As they work together${contextText}, they begin to appreciate each other's perspectives and strengths.</li>
                    <li><strong>Character Growth:</strong> Both characters learn something valuable - ${char1.name} discovers the value of ${char2Traits[1]?.toLowerCase()}, while ${char2.name} learns to appreciate ${char1Traits[1]?.toLowerCase()}.</li>
                    <li><strong>Resolution:</strong> They find a way to combine their different approaches, creating something neither could have achieved alone.</li>
                </ul>
                
                <p><strong>Dialogue Prompts:</strong></p>
                <ul style="margin-left: 2rem;">
                    <li>"You know, I never thought someone from ${char2.locale} would understand..." - ${char1.name}</li>
                    <li>"That's exactly what I'd expect a ${char1.occupation} to say." - ${char2.name}</li>
                    <li>"Maybe we're more alike than I thought." - Either character</li>
                </ul>
            </div>
        `;
    }

    findCharacterConflicts(traits1, traits2) {
        const conflictPairs = {
            'Organized': 'Spontaneous',
            'Introverted': 'Extroverted',
            'Calm': 'Energetic',
            'Realistic': 'Optimistic',
            'Independent': 'Collaborative',
            'Analytical': 'Creative'
        };
        
        const conflicts = [];
        traits1.forEach(trait1 => {
            traits2.forEach(trait2 => {
                if (conflictPairs[trait1] === trait2 || conflictPairs[trait2] === trait1) {
                    conflicts.push(`${trait1} vs ${trait2}`);
                }
            });
        });
        
        return conflicts.length > 0 ? conflicts.join(', ') : 'Their traits complement rather than conflict with each other';
    }

    findCharacterSynergies(traits1, traits2) {
        const synergyPairs = {
            'Creative': ['Analytical', 'Organized'],
            'Empathetic': ['Patient', 'Calm'],
            'Ambitious': ['Organized', 'Energetic'],
            'Collaborative': ['Empathetic', 'Patient']
        };
        
        const synergies = [];
        traits1.forEach(trait1 => {
            traits2.forEach(trait2 => {
                if (synergyPairs[trait1]?.includes(trait2) || synergyPairs[trait2]?.includes(trait1)) {
                    synergies.push(`${trait1} + ${trait2}`);
                }
            });
        });
        
        return synergies.length > 0 ? synergies.join(', ') : 'They could learn from each other\'s different approaches';
    }

    updateCharacterSelects() {
        const selects = ['character1', 'character2'];
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Select a character</option>';
                
                this.characters.forEach(char => {
                    const option = document.createElement('option');
                    option.value = char.id;
                    option.textContent = char.name;
                    select.appendChild(option);
                });
                
                select.value = currentValue;
            }
        });
    }

    displaySavedCharacters() {
        const container = document.getElementById('characterList');
        if (!container) return;

        if (this.characters.length === 0) {
            container.innerHTML = '<div class="empty">No saved characters yet. Create and save a character to see it here.</div>';
            return;
        }

        container.innerHTML = this.characters.map(char => `
            <div class="character-card">
                <div class="character-info">
                    <h4>${char.name}</h4>
                    <p>${char.age} years old, ${char.gender} ${char.occupation} from ${char.locale}</p>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">Traits: ${char.traits}</p>
                    ${char.createdAt ? `<p style="font-size: 0.75rem; color: var(--text-muted);">Created: ${new Date(char.createdAt).toLocaleDateString()}</p>` : ''}
                </div>
                <div class="character-actions">
                    <button class="btn-secondary" onclick="app.editCharacter('${char.id}')">Edit</button>
                    <button class="btn-primary" onclick="app.viewCharacterReport('${char.id}')">Report</button>
                    <button class="btn-danger" onclick="app.deleteCharacter('${char.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    deleteCharacter(characterId) {
        const character = this.characters.find(c => c.id === characterId);
        if (!character) return;

        if (confirm(`Are you sure you want to delete "${character.name}"?`)) {
            this.characters = this.characters.filter(c => c.id !== characterId);
            localStorage.setItem('characters', JSON.stringify(this.characters));
            this.displaySavedCharacters();
            this.updateCharacterSelects();
        }
    }

    editCharacter(characterId) {
        const character = this.characters.find(c => c.id === characterId);
        if (!character) return;

        // Load character data into the form
        document.getElementById('name').value = character.name || '';
        document.getElementById('age').value = character.age || '';
        document.getElementById('gender').value = character.gender || '';
        document.getElementById('locale').value = character.locale || '';
        document.getElementById('occupation').value = character.occupation || '';
        document.getElementById('traits').value = character.traits || '';

        // Load existing bio and autobiography if they exist
        if (character.bio) {
            const bioOutput = document.getElementById('shortBioOutput');
            if (bioOutput) {
                bioOutput.innerHTML = character.bio;
                bioOutput.classList.remove('empty');
                this.enableExportButtons(['bio', 'full']);
            }
        }

        if (character.autobiography) {
            const autobiographyOutput = document.getElementById('autobiographyOutput');
            if (autobiographyOutput) {
                autobiographyOutput.innerHTML = character.autobiography;
                autobiographyOutput.classList.remove('empty');
                this.enableExportButtons(['autobiography', 'full']);
            }
        }

        // Switch to Create Character tab
        this.switchTab('create');
        
        alert(`Character "${character.name}" loaded for editing. Make your changes and save to update.`);
    }

    viewCharacterReport(characterId) {
        const character = this.characters.find(c => c.id === characterId);
        if (!character) return;

        // Generate a detailed report
        const reportContent = this.generateCharacterReport(character);
        
        // Create a modal or new window to display the report
        const reportWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
        reportWindow.document.write(reportContent);
        reportWindow.document.close();
    }

    generateCharacterReport(character) {
        const createdDate = character.createdAt ? new Date(character.createdAt).toLocaleDateString() : 'Unknown';
        
        return `
<!DOCTYPE html>
<html>
<head>
    <title>Character Report: ${character.name}</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            line-height: 1.6; 
            background: #f8f9fa;
        }
        .header { 
            background: linear-gradient(135deg, #2c3e50, #3498db); 
            color: white; 
            padding: 2rem; 
            border-radius: 12px; 
            margin-bottom: 2rem; 
            text-align: center;
        }
        .section { 
            background: white;
            margin-bottom: 20px; 
            padding: 20px; 
            border: 1px solid #ddd; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .basic-info { background: #e8f4fd; }
        .bio-section { background: #f0f8f0; }
        .autobiography-section { background: #fff8e1; }
        h1, h2 { color: #2c3e50; margin-top: 0; }
        .info-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 1rem; 
            margin: 1rem 0; 
        }
        .info-item { 
            background: rgba(255,255,255,0.7); 
            padding: 0.5rem; 
            border-radius: 4px; 
        }
        .autobiography-output { font-family: Georgia, serif; }
        .autobiography-output p { text-indent: 2rem; margin-bottom: 1.5rem; }
        .quote { 
            font-style: italic; 
            border-left: 4px solid #3498db; 
            padding-left: 1.5rem; 
            margin: 2rem 0; 
            background: rgba(52, 152, 219, 0.1);
            padding: 1rem 1rem 1rem 2rem;
            border-radius: 0 8px 8px 0;
        }
        .print-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 5px;
        }
        .print-btn:hover { background: #2980b9; }
        @media print {
            .no-print { display: none; }
            body { background: white; }
            .section { box-shadow: none; border: 1px solid #ccc; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Character Report</h1>
        <h2>${character.name}</h2>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
    
    <div class="no-print" style="text-align: center; margin-bottom: 20px;">
        <button class="print-btn" onclick="window.print()">Print Report</button>
        <button class="print-btn" onclick="window.close()">Close Window</button>
    </div>
    
    <div class="section basic-info">
        <h2>Basic Information</h2>
        <div class="info-grid">
            <div class="info-item"><strong>Name:</strong> ${character.name}</div>
            <div class="info-item"><strong>Age:</strong> ${character.age}</div>
            <div class="info-item"><strong>Gender:</strong> ${character.gender}</div>
            <div class="info-item"><strong>Location:</strong> ${character.locale}</div>
            <div class="info-item"><strong>Occupation:</strong> ${character.occupation}</div>
            <div class="info-item"><strong>Created:</strong> ${createdDate}</div>
        </div>
        <div style="margin-top: 1rem;">
            <strong>Key Traits:</strong> ${character.traits}
        </div>
    </div>
    
    ${character.bio ? `
    <div class="section bio-section">
        <h2>External Biography</h2>
        <div>${character.bio}</div>
    </div>
    ` : ''}
    
    ${character.autobiography ? `
    <div class="section autobiography-section">
        <h2>Personal Autobiography</h2>
        <div class="autobiography-output">${character.autobiography}</div>
    </div>
    ` : ''}
    
    ${!character.bio && !character.autobiography ? `
    <div class="section">
        <h2>Additional Content</h2>
        <p><em>No biography or autobiography has been generated for this character yet. Use the "Generate Bio" and "Generate Autobiography" buttons in the main application to create detailed content.</em></p>
    </div>
    ` : ''}
    
    <div class="section">
        <h2>Character Development Notes</h2>
        <p><strong>Character Archetype:</strong> Based on the traits (${character.traits}), this character represents a complex individual with multiple facets to explore in storytelling.</p>
        <p><strong>Story Potential:</strong> The combination of ${character.occupation} background and ${character.locale} origin provides rich material for character development and plot creation.</p>
        <p><strong>Writing Tips:</strong> Consider how this character's age (${character.age}) and life experiences would influence their dialogue, decision-making, and relationships with other characters.</p>
    </div>
    
    <footer style="text-align: center; margin-top: 3rem; padding: 2rem; color: #666; border-top: 1px solid #ddd;">
        <p>Generated by CharacterCraft - Enhanced Character Creation Tool</p>
        <p style="font-size: 0.9rem;">This report contains detailed character information for creative writing and storytelling purposes.</p>
    </footer>
</body>
</html>`;
    }

    enableExportButtons(types) {
        types.forEach(type => {
            const button = document.querySelector(`.export-${type}`);
            if (button) {
                button.disabled = false;
            }
        });
    }

    // Export Methods
    exportBio() {
        const bioContent = document.getElementById('shortBioOutput')?.innerHTML;
        if (!bioContent || bioContent.includes('empty')) {
            alert('Please generate a bio first.');
            return;
        }
        this.downloadFile('character_bio.html', this.wrapContentForExport(bioContent, 'Character Biography'), 'text/html');
    }

    exportAutobiography() {
        const autobiographyContent = document.getElementById('autobiographyOutput')?.innerHTML;
        if (!autobiographyContent || autobiographyContent.includes('empty')) {
            alert('Please generate an autobiography first.');
            return;
        }
        this.downloadFile('character_autobiography.html', this.wrapContentForExport(autobiographyContent, 'Character Autobiography'), 'text/html');
    }

    exportFullReport() {
        const character = this.getCharacterFromForm();
        const bioContent = document.getElementById('shortBioOutput')?.innerHTML || '';
        const autobiographyContent = document.getElementById('autobiographyOutput')?.innerHTML || '';
        
        if ((!bioContent || bioContent.includes('empty')) && (!autobiographyContent || autobiographyContent.includes('empty'))) {
            alert('Please generate a bio or autobiography first.');
            return;
        }
        
        const fullReport = this.generateFullReport(character, bioContent, autobiographyContent);
        this.downloadFile('character_full_report.html', fullReport, 'text/html');
    }

    exportComparison() {
        const comparisonContent = document.getElementById('comparisonOutput')?.innerHTML;
        if (!comparisonContent || comparisonContent.includes('empty')) {
            alert('Please generate a comparison first.');
            return;
        }
        this.downloadFile('character_comparison.html', this.wrapContentForExport(comparisonContent, 'Character Comparison'), 'text/html');
    }

    wrapContentForExport(content, title) {
        return `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1, h2, h3 { color: #2c3e50; }
        .autobiography-output { font-family: Georgia, serif; }
        .autobiography-output p { text-indent: 2rem; margin-bottom: 1.5rem; }
        .quote { font-style: italic; border-left: 4px solid #3498db; padding-left: 1.5rem; margin: 2rem 0; }
    </style>
</head>
<body>
    ${content}
    <hr style="margin-top: 3rem;">
    <p style="text-align: center; color: #666; font-size: 0.9rem;">Generated by CharacterCraft - Enhanced Character Creation Tool</p>
</body>
</html>`;
    }

    generateFullReport(character, bioContent, autobiographyContent) {
        return `
<!DOCTYPE html>
<html>
<head>
    <title>Character Report: ${character.name}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        h1, h2 { color: #2c3e50; }
        .basic-info { background: #f8f9fa; }
        .autobiography-output { font-family: Georgia, serif; }
        .autobiography-output p { text-indent: 2rem; margin-bottom: 1.5rem; }
        .quote { font-style: italic; border-left: 4px solid #3498db; padding-left: 1.5rem; margin: 2rem 0; }
    </style>
</head>
<body>
    <h1>Character Report: ${character.name}</h1>
    
    <div class="section basic-info">
        <h2>Basic Information</h2>
        <p><strong>Name:</strong> ${character.name}</p>
        <p><strong>Age:</strong> ${character.age}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Location:</strong> ${character.locale}</p>
        <p><strong>Occupation:</strong> ${character.occupation}</p>
        <p><strong>Key Traits:</strong> ${character.traits}</p>
    </div>
    
    ${bioContent ? `<div class="section"><h2>External Biography</h2>${bioContent}</div>` : ''}
    
    ${autobiographyContent ? `<div class="section"><h2>Personal Autobiography</h2>${autobiographyContent}</div>` : ''}
    
    <hr style="margin-top: 3rem;">
    <p style="text-align: center; color: #666; font-size: 0.9rem;">Generated by CharacterCraft - Enhanced Character Creation Tool</p>
</body>
</html>`;
    }

    downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    resetApp() {
        if (confirm('Are you sure you want to reset the app? This will clear all saved characters and data.')) {
            localStorage.clear();
            location.reload();
        }
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CharacterCraft();
});

// Legacy function support for existing HTML
function generateDetailedBio() {
    if (app) app.generateBio();
}

function generateAutobiography() {
    if (app) app.generateAutobiography();
}

function saveCharacter() {
    if (app) app.saveCharacter();
}

function randomizeEverything() {
    if (app) app.randomizeAll();
}

