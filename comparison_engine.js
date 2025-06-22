// Enhanced Character Comparison Engine
class ComparisonEngine {
    constructor(characterManager) {
        this.characterManager = characterManager;
        this.scenarios = [];
        this.conflictTypes = [];
        this.collaborationTypes = [];
        this.loadComparisonData();
    }

    // Load comparison data from CSV files or fallback data
    async loadComparisonData() {
        try {
            // Load scenario data
            this.scenarios = await this.loadCSVData('comparison_scenarios.csv') || this.getDefaultScenarios();
            this.conflictTypes = await this.loadCSVData('conflict_types.csv') || this.getDefaultConflicts();
            this.collaborationTypes = await this.loadCSVData('collaboration_types.csv') || this.getDefaultCollaborations();
        } catch (error) {
            console.warn('Using fallback comparison data:', error);
            this.scenarios = this.getDefaultScenarios();
            this.conflictTypes = this.getDefaultConflicts();
            this.collaborationTypes = this.getDefaultCollaborations();
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
            const values = line.split(',').map(v => v.trim());
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            return obj;
        });
    }

    // Default scenarios if CSV not available
    getDefaultScenarios() {
        return [
            { type: 'Workplace', context: 'forced to work together on a critical project', setting: 'office environment', tension_level: 'medium' },
            { type: 'Crisis', context: 'trapped together during an emergency', setting: 'isolated location', tension_level: 'high' },
            { type: 'Social', context: 'meet at a mutual friend\'s gathering', setting: 'social event', tension_level: 'low' },
            { type: 'Competition', context: 'competing for the same opportunity', setting: 'competitive environment', tension_level: 'high' },
            { type: 'Travel', context: 'stuck together on a delayed journey', setting: 'transportation', tension_level: 'medium' },
            { type: 'Family', context: 'brought together by family obligations', setting: 'family gathering', tension_level: 'medium' },
            { type: 'Romantic', context: 'both interested in the same person', setting: 'social setting', tension_level: 'high' },
            { type: 'Mentorship', context: 'one must teach or guide the other', setting: 'learning environment', tension_level: 'low' }
        ];
    }

    // Default conflict types
    getDefaultConflicts() {
        return [
            { source: 'Values', description: 'fundamental disagreement about what\'s right', intensity: 'high' },
            { source: 'Methods', description: 'different approaches to solving problems', intensity: 'medium' },
            { source: 'Goals', description: 'wanting different outcomes', intensity: 'high' },
            { source: 'Communication', description: 'misunderstanding each other\'s intentions', intensity: 'low' },
            { source: 'Past', description: 'history that creates tension', intensity: 'medium' },
            { source: 'Personality', description: 'incompatible ways of being', intensity: 'medium' },
            { source: 'Resources', description: 'competing for limited resources', intensity: 'high' },
            { source: 'Status', description: 'disagreement about hierarchy or respect', intensity: 'medium' }
        ];
    }

    // Default collaboration types
    getDefaultCollaborations() {
        return [
            { type: 'Complementary Skills', description: 'each has abilities the other lacks', synergy: 'high' },
            { type: 'Shared Values', description: 'both care deeply about the same things', synergy: 'high' },
            { type: 'Mutual Respect', description: 'each admires qualities in the other', synergy: 'medium' },
            { type: 'Common Enemy', description: 'united against a shared threat', synergy: 'medium' },
            { type: 'Learning Exchange', description: 'each can teach the other something valuable', synergy: 'high' },
            { type: 'Emotional Support', description: 'each provides what the other needs emotionally', synergy: 'medium' },
            { type: 'Practical Partnership', description: 'working together serves both their interests', synergy: 'medium' },
            { type: 'Protective Instinct', description: 'one or both feel compelled to protect the other', synergy: 'high' }
        ];
    }

    // Compare two characters and generate detailed analysis
    compareCharacters(character1Id, character2Id, context = '') {
        const char1 = this.characterManager.getCharacter(character1Id);
        const char2 = this.characterManager.getCharacter(character2Id);

        if (!char1 || !char2) {
            throw new Error('One or both characters not found');
        }

        const analysis = {
            characters: { char1, char2 },
            basicComparison: this.compareBasicInfo(char1, char2),
            traitAnalysis: this.analyzeTraits(char1, char2),
            conflictPotential: this.analyzeConflicts(char1, char2),
            collaborationPotential: this.analyzeCollaboration(char1, char2),
            dynamicPrediction: this.predictDynamics(char1, char2),
            writingPrompts: this.generateWritingPrompts(char1, char2, context),
            timestamp: Date.now()
        };

        return analysis;
    }

    // Compare basic character information
    compareBasicInfo(char1, char2) {
        const ageDiff = Math.abs(char1.basicInfo.age - char2.basicInfo.age);
        const sameGender = char1.basicInfo.gender === char2.basicInfo.gender;
        const sameLocale = char1.basicInfo.locale === char2.basicInfo.locale;
        const sameOccupation = char1.basicInfo.occupation === char2.basicInfo.occupation;

        return {
            ageDifference: ageDiff,
            ageCategory: ageDiff < 5 ? 'peers' : ageDiff < 15 ? 'different generations' : 'significant age gap',
            genderDynamic: sameGender ? 'same gender' : 'different genders',
            culturalBackground: sameLocale ? 'shared cultural background' : 'different cultural backgrounds',
            professionalRelation: sameOccupation ? 'same profession' : 'different professions',
            commonalities: [
                sameGender && 'gender',
                sameLocale && 'locale',
                sameOccupation && 'occupation'
            ].filter(Boolean),
            differences: [
                !sameGender && 'gender',
                !sameLocale && 'locale',
                !sameOccupation && 'occupation',
                ageDiff > 10 && 'age'
            ].filter(Boolean)
        };
    }

    // Analyze character traits for compatibility and conflict
    analyzeTraits(char1, char2) {
        const analysis = {
            sharedTraits: [],
            complementaryTraits: [],
            conflictingTraits: [],
            uniqueToChar1: [],
            uniqueToChar2: []
        };

        // Get all traits for both characters
        const char1Traits = this.getAllTraits(char1);
        const char2Traits = this.getAllTraits(char2);

        // Find shared traits
        char1Traits.forEach(trait => {
            if (char2Traits.includes(trait)) {
                analysis.sharedTraits.push(trait);
            } else {
                analysis.uniqueToChar1.push(trait);
            }
        });

        // Find traits unique to char2
        char2Traits.forEach(trait => {
            if (!char1Traits.includes(trait)) {
                analysis.uniqueToChar2.push(trait);
            }
        });

        // Analyze trait relationships (simplified - could be enhanced with trait relationship data)
        analysis.complementaryTraits = this.findComplementaryTraits(char1Traits, char2Traits);
        analysis.conflictingTraits = this.findConflictingTraits(char1Traits, char2Traits);

        return analysis;
    }

    // Get all traits for a character
    getAllTraits(character) {
        const allTraits = [];
        Object.keys(character.traits).forEach(category => {
            allTraits.push(...character.traits[category]);
        });
        return allTraits;
    }

    // Find complementary traits (simplified logic)
    findComplementaryTraits(traits1, traits2) {
        const complementaryPairs = [
            ['introverted', 'extroverted'],
            ['analytical', 'creative'],
            ['cautious', 'adventurous'],
            ['organized', 'spontaneous'],
            ['logical', 'emotional'],
            ['leader', 'follower'],
            ['detail-oriented', 'big-picture'],
            ['patient', 'energetic']
        ];

        const found = [];
        complementaryPairs.forEach(pair => {
            const [trait1, trait2] = pair;
            if ((traits1.some(t => t.toLowerCase().includes(trait1)) && traits2.some(t => t.toLowerCase().includes(trait2))) ||
                (traits1.some(t => t.toLowerCase().includes(trait2)) && traits2.some(t => t.toLowerCase().includes(trait1)))) {
                found.push(`${trait1} / ${trait2}`);
            }
        });

        return found;
    }

    // Find conflicting traits (simplified logic)
    findConflictingTraits(traits1, traits2) {
        const conflictingPairs = [
            ['aggressive', 'passive'],
            ['perfectionist', 'careless'],
            ['trusting', 'suspicious'],
            ['optimistic', 'pessimistic'],
            ['generous', 'selfish'],
            ['honest', 'deceptive'],
            ['calm', 'anxious'],
            ['flexible', 'rigid']
        ];

        const found = [];
        conflictingPairs.forEach(pair => {
            const [trait1, trait2] = pair;
            if ((traits1.some(t => t.toLowerCase().includes(trait1)) && traits2.some(t => t.toLowerCase().includes(trait2))) ||
                (traits1.some(t => t.toLowerCase().includes(trait2)) && traits2.some(t => t.toLowerCase().includes(trait1)))) {
                found.push(`${trait1} vs ${trait2}`);
            }
        });

        return found;
    }

    // Analyze potential conflicts
    analyzeConflicts(char1, char2) {
        const conflicts = [];
        
        // Age-based conflicts
        const ageDiff = Math.abs(char1.basicInfo.age - char2.basicInfo.age);
        if (ageDiff > 15) {
            conflicts.push({
                type: 'Generational',
                description: 'Different life experiences and perspectives due to age gap',
                likelihood: 'medium'
            });
        }

        // Occupation-based conflicts
        if (char1.basicInfo.occupation !== char2.basicInfo.occupation) {
            conflicts.push({
                type: 'Professional',
                description: 'Different work cultures and priorities',
                likelihood: 'low'
            });
        }

        // Add trait-based conflicts
        const traitConflicts = this.findConflictingTraits(this.getAllTraits(char1), this.getAllTraits(char2));
        traitConflicts.forEach(conflict => {
            conflicts.push({
                type: 'Personality',
                description: `Conflicting traits: ${conflict}`,
                likelihood: 'medium'
            });
        });

        return conflicts;
    }

    // Analyze collaboration potential
    analyzeCollaboration(char1, char2) {
        const collaborations = [];

        // Age-based collaboration
        const ageDiff = Math.abs(char1.basicInfo.age - char2.basicInfo.age);
        if (ageDiff > 10) {
            collaborations.push({
                type: 'Mentorship',
                description: 'Older character can mentor younger, younger can bring fresh perspective',
                potential: 'high'
            });
        }

        // Occupation-based collaboration
        if (char1.basicInfo.occupation !== char2.basicInfo.occupation) {
            collaborations.push({
                type: 'Cross-functional',
                description: 'Different professional skills can complement each other',
                potential: 'medium'
            });
        }

        // Add trait-based collaborations
        const complementaryTraits = this.findComplementaryTraits(this.getAllTraits(char1), this.getAllTraits(char2));
        complementaryTraits.forEach(complement => {
            collaborations.push({
                type: 'Complementary Skills',
                description: `Complementary traits: ${complement}`,
                potential: 'high'
            });
        });

        return collaborations;
    }

    // Predict character dynamics
    predictDynamics(char1, char2) {
        const dynamics = {
            overallCompatibility: 'neutral',
            primaryDynamic: 'unknown',
            secondaryDynamics: [],
            evolutionPotential: 'medium'
        };

        // Simple compatibility scoring
        const sharedTraits = this.analyzeTraits(char1, char2).sharedTraits.length;
        const complementaryTraits = this.findComplementaryTraits(this.getAllTraits(char1), this.getAllTraits(char2)).length;
        const conflictingTraits = this.findConflictingTraits(this.getAllTraits(char1), this.getAllTraits(char2)).length;

        const compatibilityScore = sharedTraits + (complementaryTraits * 2) - (conflictingTraits * 1.5);

        if (compatibilityScore > 3) {
            dynamics.overallCompatibility = 'high';
            dynamics.primaryDynamic = 'natural allies';
        } else if (compatibilityScore < -1) {
            dynamics.overallCompatibility = 'low';
            dynamics.primaryDynamic = 'natural tension';
        } else {
            dynamics.overallCompatibility = 'medium';
            dynamics.primaryDynamic = 'complex relationship';
        }

        return dynamics;
    }

    // Generate detailed writing prompts
    generateWritingPrompts(char1, char2, userContext = '') {
        const scenario = this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
        const analysis = this.analyzeTraits(char1, char2);
        const conflicts = this.analyzeConflicts(char1, char2);
        const collaborations = this.analyzeCollaboration(char1, char2);

        const prompts = {
            mainScenario: this.generateMainScenario(char1, char2, scenario, userContext),
            conflictPrompts: this.generateConflictPrompts(char1, char2, conflicts),
            collaborationPrompts: this.generateCollaborationPrompts(char1, char2, collaborations),
            dialoguePrompts: this.generateDialoguePrompts(char1, char2, analysis),
            plotTwists: this.generatePlotTwists(char1, char2),
            characterArcs: this.generateCharacterArcs(char1, char2)
        };

        return prompts;
    }

    // Generate main scenario prompt
    generateMainScenario(char1, char2, scenario, userContext) {
        const context = userContext || scenario.context;
        
        return {
            title: `${scenario.type}: ${char1.basicInfo.name} and ${char2.basicInfo.name}`,
            setup: `${char1.basicInfo.name}, a ${char1.basicInfo.age}-year-old ${char1.basicInfo.gender} ${char1.basicInfo.occupation} from ${char1.basicInfo.locale}, and ${char2.basicInfo.name}, a ${char2.basicInfo.age}-year-old ${char2.basicInfo.gender} ${char2.basicInfo.occupation} from ${char2.basicInfo.locale}, find themselves ${context}.`,
            initialTension: this.generateInitialTension(char1, char2),
            stakesAndGoals: this.generateStakesAndGoals(char1, char2, scenario),
            settingDetails: this.generateSettingDetails(scenario),
            openingQuestions: [
                `What brings these two characters together in this situation?`,
                `What does each character want from this encounter?`,
                `What are they each trying to hide or protect?`,
                `How do their different backgrounds affect their approach to this situation?`
            ]
        };
    }

    // Generate initial tension
    generateInitialTension(char1, char2) {
        const char1Traits = this.getAllTraits(char1);
        const char2Traits = this.getAllTraits(char2);
        const conflicting = this.findConflictingTraits(char1Traits, char2Traits);

        if (conflicting.length > 0) {
            return `Immediate tension arises from their conflicting approaches: ${conflicting[0]}. This fundamental difference colors their first interaction.`;
        }

        const ageDiff = Math.abs(char1.basicInfo.age - char2.basicInfo.age);
        if (ageDiff > 15) {
            return `A generational divide creates subtle tension as their different life experiences lead to different assumptions and expectations.`;
        }

        return `While not immediately obvious, underlying differences in their backgrounds and personalities create a subtle undercurrent of tension.`;
    }

    // Generate stakes and goals
    generateStakesAndGoals(char1, char2, scenario) {
        return {
            char1Stakes: `For ${char1.basicInfo.name}, success in this situation could mean advancing their career as a ${char1.basicInfo.occupation} or proving themselves in their community.`,
            char2Stakes: `For ${char2.basicInfo.name}, the outcome affects their reputation and future opportunities in their field.`,
            sharedStakes: `Both characters risk losing something valuable if they can't find a way to work together or resolve their differences.`,
            hiddenStakes: `Beneath the surface, each character is also protecting personal vulnerabilities and secret fears.`
        };
    }

    // Generate setting details
    generateSettingDetails(scenario) {
        return {
            atmosphere: `The ${scenario.setting} creates a ${scenario.tension_level}-pressure environment that amplifies the characters' natural tendencies.`,
            constraints: `The setting limits their options and forces them to confront their differences directly.`,
            opportunities: `The environment also provides unexpected opportunities for connection and understanding.`
        };
    }

    // Generate conflict prompts
    generateConflictPrompts(char1, char2, conflicts) {
        return conflicts.map(conflict => ({
            type: conflict.type,
            prompt: `Explore how ${conflict.description.toLowerCase()} creates tension between ${char1.basicInfo.name} and ${char2.basicInfo.name}. How does each character's background influence their response to this conflict?`,
            escalation: `What would push this conflict to a breaking point?`,
            resolution: `How might they find common ground despite this difference?`
        }));
    }

    // Generate collaboration prompts
    generateCollaborationPrompts(char1, char2, collaborations) {
        return collaborations.map(collab => ({
            type: collab.type,
            prompt: `Show how ${collab.description.toLowerCase()} allows ${char1.basicInfo.name} and ${char2.basicInfo.name} to work together effectively.`,
            development: `How does this collaboration change each character?`,
            obstacles: `What threatens to undermine their partnership?`
        }));
    }

    // Generate dialogue prompts
    generateDialoguePrompts(char1, char2, analysis) {
        return [
            {
                situation: 'First Meeting',
                prompt: `Write the first conversation between ${char1.basicInfo.name} and ${char2.basicInfo.name}. How do their different backgrounds and personalities show in their speech patterns and word choices?`
            },
            {
                situation: 'Moment of Conflict',
                prompt: `Create a heated exchange where their fundamental differences come to the surface. What does each character say that reveals their core values?`
            },
            {
                situation: 'Unexpected Understanding',
                prompt: `Write a scene where they discover an unexpected commonality. How does this shared experience change the dynamic between them?`
            },
            {
                situation: 'Crisis Point',
                prompt: `In a moment of crisis, how do they communicate? Do they fall back on old patterns or find new ways to connect?`
            }
        ];
    }

    // Generate plot twists
    generatePlotTwists(char1, char2) {
        return [
            `${char1.basicInfo.name} discovers that ${char2.basicInfo.name} has been hiding a significant secret that changes everything.`,
            `A revelation about their past shows they have an unexpected connection neither knew about.`,
            `External pressure forces them to choose between their individual goals and their growing partnership.`,
            `One character must sacrifice something important to help the other, testing the strength of their relationship.`,
            `A misunderstanding threatens to destroy the progress they've made in understanding each other.`
        ];
    }

    // Generate character arcs
    generateCharacterArcs(char1, char2) {
        return {
            char1Arc: {
                startingPoint: `${char1.basicInfo.name} begins with their established patterns and assumptions.`,
                challenge: `Their interaction with ${char2.basicInfo.name} challenges their worldview.`,
                growth: `Through conflict and collaboration, they develop new perspectives.`,
                resolution: `They emerge changed, having learned something valuable about themselves and others.`
            },
            char2Arc: {
                startingPoint: `${char2.basicInfo.name} enters the situation with their own goals and methods.`,
                challenge: `${char1.basicInfo.name}'s different approach forces them to question their assumptions.`,
                growth: `The relationship pushes them to develop new skills or insights.`,
                resolution: `They gain a deeper understanding of themselves and their capacity for change.`
            },
            relationshipArc: {
                beginning: `Initial tension or misunderstanding based on surface differences.`,
                development: `Gradual recognition of each other's strengths and vulnerabilities.`,
                climax: `A crucial moment that tests their ability to trust and support each other.`,
                resolution: `A new understanding that transforms how they see each other and themselves.`
            }
        };
    }

    // Export comparison as formatted document
    exportComparison(analysis, format = 'html') {
        switch (format.toLowerCase()) {
            case 'html':
                return this.generateComparisonHTML(analysis);
            case 'text':
                return this.generateComparisonText(analysis);
            case 'json':
                return JSON.stringify(analysis, null, 2);
            default:
                return null;
        }
    }

    // Generate HTML comparison report
    generateComparisonHTML(analysis) {
        const { char1, char2 } = analysis.characters;
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Character Comparison: ${char1.basicInfo.name} & ${char2.basicInfo.name}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .character-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .character-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .prompt-box { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .conflict { border-left: 4px solid #e74c3c; }
        .collaboration { border-left: 4px solid #27ae60; }
        .neutral { border-left: 4px solid #3498db; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Character Comparison & Writing Prompts</h1>
        <h2>${char1.basicInfo.name} & ${char2.basicInfo.name}</h2>
        <p>Generated on ${new Date(analysis.timestamp).toLocaleDateString()}</p>
    </div>

    <div class="character-grid">
        <div class="character-card">
            <h3>${char1.basicInfo.name}</h3>
            <p><strong>Age:</strong> ${char1.basicInfo.age}</p>
            <p><strong>Gender:</strong> ${char1.basicInfo.gender}</p>
            <p><strong>Occupation:</strong> ${char1.basicInfo.occupation}</p>
            <p><strong>Locale:</strong> ${char1.basicInfo.locale}</p>
        </div>
        <div class="character-card">
            <h3>${char2.basicInfo.name}</h3>
            <p><strong>Age:</strong> ${char2.basicInfo.age}</p>
            <p><strong>Gender:</strong> ${char2.basicInfo.gender}</p>
            <p><strong>Occupation:</strong> ${char2.basicInfo.occupation}</p>
            <p><strong>Locale:</strong> ${char2.basicInfo.locale}</p>
        </div>
    </div>

    <div class="section">
        <h3>Main Writing Prompt</h3>
        <div class="prompt-box neutral">
            <h4>${analysis.writingPrompts.mainScenario.title}</h4>
            <p><strong>Setup:</strong> ${analysis.writingPrompts.mainScenario.setup}</p>
            <p><strong>Initial Tension:</strong> ${analysis.writingPrompts.mainScenario.initialTension}</p>
            <div>
                <strong>Key Questions:</strong>
                <ul>
                    ${analysis.writingPrompts.mainScenario.openingQuestions.map(q => `<li>${q}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>Conflict Potential</h3>
        ${analysis.writingPrompts.conflictPrompts.map(conflict => `
            <div class="prompt-box conflict">
                <h4>${conflict.type} Conflict</h4>
                <p>${conflict.prompt}</p>
                <p><strong>Escalation:</strong> ${conflict.escalation}</p>
                <p><strong>Resolution:</strong> ${conflict.resolution}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h3>Collaboration Opportunities</h3>
        ${analysis.writingPrompts.collaborationPrompts.map(collab => `
            <div class="prompt-box collaboration">
                <h4>${collab.type}</h4>
                <p>${collab.prompt}</p>
                <p><strong>Development:</strong> ${collab.development}</p>
                <p><strong>Obstacles:</strong> ${collab.obstacles}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h3>Dialogue Prompts</h3>
        ${analysis.writingPrompts.dialoguePrompts.map(dialogue => `
            <div class="prompt-box neutral">
                <h4>${dialogue.situation}</h4>
                <p>${dialogue.prompt}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h3>Plot Twists</h3>
        <ul>
            ${analysis.writingPrompts.plotTwists.map(twist => `<li>${twist}</li>`).join('')}
        </ul>
    </div>

    <div class="section">
        <h3>Character Development Arcs</h3>
        <div class="character-grid">
            <div>
                <h4>${char1.basicInfo.name}'s Arc</h4>
                <p><strong>Starting Point:</strong> ${analysis.writingPrompts.characterArcs.char1Arc.startingPoint}</p>
                <p><strong>Challenge:</strong> ${analysis.writingPrompts.characterArcs.char1Arc.challenge}</p>
                <p><strong>Growth:</strong> ${analysis.writingPrompts.characterArcs.char1Arc.growth}</p>
                <p><strong>Resolution:</strong> ${analysis.writingPrompts.characterArcs.char1Arc.resolution}</p>
            </div>
            <div>
                <h4>${char2.basicInfo.name}'s Arc</h4>
                <p><strong>Starting Point:</strong> ${analysis.writingPrompts.characterArcs.char2Arc.startingPoint}</p>
                <p><strong>Challenge:</strong> ${analysis.writingPrompts.characterArcs.char2Arc.challenge}</p>
                <p><strong>Growth:</strong> ${analysis.writingPrompts.characterArcs.char2Arc.growth}</p>
                <p><strong>Resolution:</strong> ${analysis.writingPrompts.characterArcs.char2Arc.resolution}</p>
            </div>
        </div>
    </div>
</body>
</html>`;
    }

    // Generate text comparison report
    generateComparisonText(analysis) {
        const { char1, char2 } = analysis.characters;
        
        return `CHARACTER COMPARISON & WRITING PROMPTS
${char1.basicInfo.name} & ${char2.basicInfo.name}
Generated on ${new Date(analysis.timestamp).toLocaleDateString()}

CHARACTERS
${char1.basicInfo.name}: ${char1.basicInfo.age}-year-old ${char1.basicInfo.gender} ${char1.basicInfo.occupation} from ${char1.basicInfo.locale}
${char2.basicInfo.name}: ${char2.basicInfo.age}-year-old ${char2.basicInfo.gender} ${char2.basicInfo.occupation} from ${char2.basicInfo.locale}

MAIN WRITING PROMPT
${analysis.writingPrompts.mainScenario.title}

Setup: ${analysis.writingPrompts.mainScenario.setup}

Initial Tension: ${analysis.writingPrompts.mainScenario.initialTension}

Key Questions:
${analysis.writingPrompts.mainScenario.openingQuestions.map(q => `- ${q}`).join('\n')}

CONFLICT PROMPTS
${analysis.writingPrompts.conflictPrompts.map(conflict => `
${conflict.type} Conflict:
${conflict.prompt}
Escalation: ${conflict.escalation}
Resolution: ${conflict.resolution}
`).join('\n')}

COLLABORATION OPPORTUNITIES
${analysis.writingPrompts.collaborationPrompts.map(collab => `
${collab.type}:
${collab.prompt}
Development: ${collab.development}
Obstacles: ${collab.obstacles}
`).join('\n')}

DIALOGUE PROMPTS
${analysis.writingPrompts.dialoguePrompts.map(dialogue => `
${dialogue.situation}:
${dialogue.prompt}
`).join('\n')}

PLOT TWISTS
${analysis.writingPrompts.plotTwists.map(twist => `- ${twist}`).join('\n')}

CHARACTER DEVELOPMENT ARCS

${char1.basicInfo.name}'s Arc:
Starting Point: ${analysis.writingPrompts.characterArcs.char1Arc.startingPoint}
Challenge: ${analysis.writingPrompts.characterArcs.char1Arc.challenge}
Growth: ${analysis.writingPrompts.characterArcs.char1Arc.growth}
Resolution: ${analysis.writingPrompts.characterArcs.char1Arc.resolution}

${char2.basicInfo.name}'s Arc:
Starting Point: ${analysis.writingPrompts.characterArcs.char2Arc.startingPoint}
Challenge: ${analysis.writingPrompts.characterArcs.char2Arc.challenge}
Growth: ${analysis.writingPrompts.characterArcs.char2Arc.growth}
Resolution: ${analysis.writingPrompts.characterArcs.char2Arc.resolution}

Relationship Arc:
Beginning: ${analysis.writingPrompts.characterArcs.relationshipArc.beginning}
Development: ${analysis.writingPrompts.characterArcs.relationshipArc.development}
Climax: ${analysis.writingPrompts.characterArcs.relationshipArc.climax}
Resolution: ${analysis.writingPrompts.characterArcs.relationshipArc.resolution}`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComparisonEngine;
} else {
    window.ComparisonEngine = ComparisonEngine;
}

