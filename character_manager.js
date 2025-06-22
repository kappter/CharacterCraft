// Enhanced Character Manager with improved data structure and functionality
class CharacterManager {
    constructor() {
        this.characters = this.loadCharacters();
        this.currentCharacter = null;
    }

    // Load characters from localStorage with migration support
    loadCharacters() {
        try {
            const stored = localStorage.getItem('characters');
            if (!stored) return [];
            
            const characters = JSON.parse(stored);
            // Migrate old format to new format if needed
            return characters.map(char => this.migrateCharacterFormat(char));
        } catch (error) {
            console.error('Error loading characters:', error);
            return [];
        }
    }

    // Migrate old character format to new enhanced format
    migrateCharacterFormat(char) {
        // If already in new format, return as-is
        if (char.basicInfo && char.traits && char.bios) {
            return char;
        }

        // Migrate old format to new format
        return {
            id: char.id || Date.now(),
            basicInfo: {
                name: char.name || 'Unknown',
                age: parseInt(char.age) || 25,
                gender: char.gender || 'Unknown',
                locale: char.locale || 'Unknown',
                occupation: char.occupation || 'Unknown'
            },
            traits: {
                physical: [],
                psychological: [],
                background: [],
                motivations: [],
                custom: char.traits ? char.traits.split(',').map(t => t.trim()) : []
            },
            bios: {
                external: char.detailedBio || '',
                autobiography: '',
                sections: {
                    childhood: '',
                    education: '',
                    career: '',
                    relationships: '',
                    struggles: '',
                    passions: ''
                }
            },
            metadata: {
                created: char.created || Date.now(),
                lastModified: Date.now(),
                version: 2
            }
        };
    }

    // Save characters to localStorage
    saveCharacters() {
        try {
            localStorage.setItem('characters', JSON.stringify(this.characters));
            return true;
        } catch (error) {
            console.error('Error saving characters:', error);
            return false;
        }
    }

    // Create new character
    createCharacter(basicInfo) {
        const character = {
            id: Date.now(),
            basicInfo: {
                name: basicInfo.name || 'Unknown',
                age: parseInt(basicInfo.age) || 25,
                gender: basicInfo.gender || 'Unknown',
                locale: basicInfo.locale || 'Unknown',
                occupation: basicInfo.occupation || 'Unknown'
            },
            traits: {
                physical: [],
                psychological: [],
                background: [],
                motivations: [],
                custom: []
            },
            bios: {
                external: '',
                autobiography: '',
                sections: {
                    childhood: '',
                    education: '',
                    career: '',
                    relationships: '',
                    struggles: '',
                    passions: ''
                }
            },
            metadata: {
                created: Date.now(),
                lastModified: Date.now(),
                version: 2
            }
        };

        this.characters.push(character);
        this.saveCharacters();
        return character;
    }

    // Update character
    updateCharacter(id, updates) {
        const index = this.characters.findIndex(char => char.id === id);
        if (index === -1) return null;

        const character = this.characters[index];
        
        // Update basic info if provided
        if (updates.basicInfo) {
            character.basicInfo = { ...character.basicInfo, ...updates.basicInfo };
        }

        // Update traits if provided
        if (updates.traits) {
            character.traits = { ...character.traits, ...updates.traits };
        }

        // Update bios if provided
        if (updates.bios) {
            character.bios = { ...character.bios, ...updates.bios };
        }

        // Update metadata
        character.metadata.lastModified = Date.now();

        this.characters[index] = character;
        this.saveCharacters();
        return character;
    }

    // Delete character
    deleteCharacter(id) {
        const index = this.characters.findIndex(char => char.id === id);
        if (index === -1) return false;

        this.characters.splice(index, 1);
        this.saveCharacters();
        return true;
    }

    // Get character by ID
    getCharacter(id) {
        return this.characters.find(char => char.id === id) || null;
    }

    // Get all characters
    getAllCharacters() {
        return [...this.characters];
    }

    // Assign traits to character
    assignTraits(characterId, category, traits) {
        const character = this.getCharacter(characterId);
        if (!character) return false;

        if (!character.traits[category]) {
            character.traits[category] = [];
        }

        // Add new traits, avoiding duplicates
        traits.forEach(trait => {
            if (!character.traits[category].includes(trait)) {
                character.traits[category].push(trait);
            }
        });

        this.updateCharacter(characterId, { traits: character.traits });
        return true;
    }

    // Remove traits from character
    removeTraits(characterId, category, traits) {
        const character = this.getCharacter(characterId);
        if (!character) return false;

        if (!character.traits[category]) return true;

        character.traits[category] = character.traits[category].filter(
            trait => !traits.includes(trait)
        );

        this.updateCharacter(characterId, { traits: character.traits });
        return true;
    }

    // Get character's traits by category
    getCharacterTraits(characterId, category = null) {
        const character = this.getCharacter(characterId);
        if (!character) return [];

        if (category) {
            return character.traits[category] || [];
        }

        // Return all traits
        const allTraits = [];
        Object.keys(character.traits).forEach(cat => {
            allTraits.push(...character.traits[cat]);
        });
        return allTraits;
    }

    // Update character bio section
    updateBioSection(characterId, section, content) {
        const character = this.getCharacter(characterId);
        if (!character) return false;

        if (section === 'external' || section === 'autobiography') {
            character.bios[section] = content;
        } else if (character.bios.sections[section] !== undefined) {
            character.bios.sections[section] = content;
        } else {
            return false;
        }

        this.updateCharacter(characterId, { bios: character.bios });
        return true;
    }

    // Get character bio section
    getBioSection(characterId, section) {
        const character = this.getCharacter(characterId);
        if (!character) return '';

        if (section === 'external' || section === 'autobiography') {
            return character.bios[section];
        } else if (character.bios.sections[section] !== undefined) {
            return character.bios.sections[section];
        }

        return '';
    }

    // Export character data
    exportCharacter(characterId, format = 'json') {
        const character = this.getCharacter(characterId);
        if (!character) return null;

        switch (format.toLowerCase()) {
            case 'json':
                return JSON.stringify(character, null, 2);
            
            case 'html':
                return this.generateCharacterHTML(character);
            
            case 'text':
                return this.generateCharacterText(character);
            
            default:
                return null;
        }
    }

    // Generate HTML report for character
    generateCharacterHTML(character) {
        const allTraits = Object.keys(character.traits)
            .map(category => character.traits[category].join(', '))
            .filter(traits => traits.length > 0)
            .join('; ');

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Character Report: ${character.basicInfo.name}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .basic-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
        .trait-category { margin-bottom: 10px; }
        .trait-category strong { color: #555; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Character Report: ${character.basicInfo.name}</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>

    <div class="section">
        <h3>Basic Information</h3>
        <div class="basic-info">
            <div><strong>Name:</strong> ${character.basicInfo.name}</div>
            <div><strong>Age:</strong> ${character.basicInfo.age}</div>
            <div><strong>Gender:</strong> ${character.basicInfo.gender}</div>
            <div><strong>Locale:</strong> ${character.basicInfo.locale}</div>
            <div><strong>Occupation:</strong> ${character.basicInfo.occupation}</div>
        </div>
    </div>

    <div class="section">
        <h3>Character Traits</h3>
        ${Object.keys(character.traits).map(category => {
            const traits = character.traits[category];
            if (traits.length === 0) return '';
            return `<div class="trait-category"><strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong> ${traits.join(', ')}</div>`;
        }).filter(html => html).join('')}
    </div>

    ${character.bios.external ? `
    <div class="section">
        <h3>External Biography</h3>
        <div>${character.bios.external}</div>
    </div>
    ` : ''}

    ${character.bios.autobiography ? `
    <div class="section">
        <h3>Autobiography</h3>
        <div>${character.bios.autobiography}</div>
    </div>
    ` : ''}

    <div class="section">
        <h3>Metadata</h3>
        <div><strong>Created:</strong> ${new Date(character.metadata.created).toLocaleString()}</div>
        <div><strong>Last Modified:</strong> ${new Date(character.metadata.lastModified).toLocaleString()}</div>
        <div><strong>Version:</strong> ${character.metadata.version}</div>
    </div>
</body>
</html>`;
    }

    // Generate text report for character
    generateCharacterText(character) {
        const allTraits = Object.keys(character.traits)
            .map(category => `${category.charAt(0).toUpperCase() + category.slice(1)}: ${character.traits[category].join(', ')}`)
            .filter(line => !line.endsWith(': '))
            .join('\n');

        return `CHARACTER REPORT: ${character.basicInfo.name}
Generated on ${new Date().toLocaleDateString()}

BASIC INFORMATION
Name: ${character.basicInfo.name}
Age: ${character.basicInfo.age}
Gender: ${character.basicInfo.gender}
Locale: ${character.basicInfo.locale}
Occupation: ${character.basicInfo.occupation}

CHARACTER TRAITS
${allTraits}

${character.bios.external ? `EXTERNAL BIOGRAPHY\n${character.bios.external.replace(/<[^>]*>/g, '')}\n\n` : ''}

${character.bios.autobiography ? `AUTOBIOGRAPHY\n${character.bios.autobiography.replace(/<[^>]*>/g, '')}\n\n` : ''}

METADATA
Created: ${new Date(character.metadata.created).toLocaleString()}
Last Modified: ${new Date(character.metadata.lastModified).toLocaleString()}
Version: ${character.metadata.version}`;
    }

    // Search characters
    searchCharacters(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.characters.filter(character => {
            const searchableText = [
                character.basicInfo.name,
                character.basicInfo.occupation,
                character.basicInfo.locale,
                ...Object.values(character.traits).flat(),
                character.bios.external,
                character.bios.autobiography
            ].join(' ').toLowerCase();

            return searchableText.includes(lowercaseQuery);
        });
    }

    // Get character statistics
    getStatistics() {
        const stats = {
            totalCharacters: this.characters.length,
            averageAge: 0,
            genderDistribution: {},
            occupationDistribution: {},
            localeDistribution: {},
            traitCounts: {
                physical: 0,
                psychological: 0,
                background: 0,
                motivations: 0,
                custom: 0
            }
        };

        if (this.characters.length === 0) return stats;

        // Calculate average age
        const totalAge = this.characters.reduce((sum, char) => sum + char.basicInfo.age, 0);
        stats.averageAge = Math.round(totalAge / this.characters.length);

        // Calculate distributions
        this.characters.forEach(character => {
            // Gender distribution
            const gender = character.basicInfo.gender;
            stats.genderDistribution[gender] = (stats.genderDistribution[gender] || 0) + 1;

            // Occupation distribution
            const occupation = character.basicInfo.occupation;
            stats.occupationDistribution[occupation] = (stats.occupationDistribution[occupation] || 0) + 1;

            // Locale distribution
            const locale = character.basicInfo.locale;
            stats.localeDistribution[locale] = (stats.localeDistribution[locale] || 0) + 1;

            // Trait counts
            Object.keys(character.traits).forEach(category => {
                if (stats.traitCounts[category] !== undefined) {
                    stats.traitCounts[category] += character.traits[category].length;
                }
            });
        });

        return stats;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterManager;
} else {
    window.CharacterManager = CharacterManager;
}

