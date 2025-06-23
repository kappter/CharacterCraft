// Enhanced Letter Selection and Rotation System for Sigils
// Provides more sophisticated algorithms for creating unique character sigils

class EnhancedSigilLogic {
    constructor() {
        // Letter frequency and visual weight for better selection
        this.letterWeights = {
            'A': 0.9, 'B': 0.8, 'C': 0.7, 'D': 0.8, 'E': 0.9, 'F': 0.6, 'G': 0.7, 'H': 0.8,
            'I': 0.5, 'J': 0.6, 'K': 0.8, 'L': 0.6, 'M': 0.9, 'N': 0.8, 'O': 0.9, 'P': 0.7,
            'Q': 0.8, 'R': 0.8, 'S': 0.7, 'T': 0.6, 'U': 0.8, 'V': 0.7, 'W': 0.9, 'X': 0.8,
            'Y': 0.7, 'Z': 0.8
        };
        
        // Rotation patterns for different aesthetic effects
        this.rotationPatterns = {
            'balanced': [0, 120, 240],           // Perfect triangle
            'dynamic': [30, 150, 270],          // Offset triangle
            'flowing': [45, 135, 315],          // Diagonal flow
            'spiral': [0, 108, 216],            // Golden ratio spiral
            'organic': [15, 140, 285],          // Natural asymmetry
            'mystical': [36, 144, 252],         // Pentagram-based
            'harmonic': [60, 180, 300],         // Musical harmony
            'chaotic': [23, 167, 291]           // Intentional irregularity
        };
        
        // Character trait to pattern mapping
        this.traitPatterns = {
            'creative': 'flowing',
            'logical': 'balanced',
            'adventurous': 'dynamic',
            'mysterious': 'mystical',
            'calm': 'harmonic',
            'energetic': 'spiral',
            'natural': 'organic',
            'unpredictable': 'chaotic'
        };
    }
    
    // Advanced letter extraction based on character name and traits
    extractSignificantLetters(characterName, traits = []) {
        if (!characterName || characterName.length === 0) {
            return this.getDefaultLetters();
        }
        
        const cleanName = characterName.replace(/[^a-zA-Z]/g, '').toUpperCase();
        const nameParts = characterName.split(' ').filter(part => part.length > 0);
        
        if (cleanName.length === 0) {
            return this.getDefaultLetters();
        }
        
        let letters = [];
        
        // Strategy 1: Use initials if multiple name parts
        if (nameParts.length >= 2) {
            letters = nameParts.slice(0, 3).map(part => 
                part.replace(/[^a-zA-Z]/g, '').toUpperCase()[0]
            ).filter(letter => letter);
            
            // Fill with additional letters if needed
            while (letters.length < 3 && cleanName.length > letters.length) {
                const nextLetter = cleanName[letters.length];
                if (!letters.includes(nextLetter)) {
                    letters.push(nextLetter);
                }
            }
        }
        
        // Strategy 2: Use first, middle, last for single names
        if (letters.length < 3) {
            letters = [];
            if (cleanName.length >= 3) {
                letters.push(cleanName[0]);
                letters.push(cleanName[Math.floor(cleanName.length / 2)]);
                letters.push(cleanName[cleanName.length - 1]);
            } else if (cleanName.length === 2) {
                letters.push(cleanName[0]);
                letters.push(cleanName[1]);
                letters.push(this.getComplementaryLetter(cleanName[0], cleanName[1]));
            } else {
                letters.push(cleanName[0]);
                letters.push(this.getComplementaryLetter(cleanName[0]));
                letters.push(this.getComplementaryLetter(cleanName[0], letters[1]));
            }
        }
        
        // Ensure we have exactly 3 unique letters
        letters = this.ensureThreeUniqueLetters(letters, cleanName);
        
        return letters;
    }
    
    // Get complementary letter based on visual or phonetic harmony
    getComplementaryLetter(baseLetter, excludeLetter = null) {
        const complementaryMap = {
            'A': ['E', 'I', 'O'], 'B': ['R', 'L', 'Y'], 'C': ['H', 'K', 'R'], 'D': ['R', 'N', 'G'],
            'E': ['R', 'S', 'T'], 'F': ['R', 'L', 'Y'], 'G': ['R', 'H', 'N'], 'H': ['R', 'T', 'Y'],
            'I': ['N', 'T', 'S'], 'J': ['R', 'Y', 'N'], 'K': ['R', 'N', 'Y'], 'L': ['R', 'Y', 'N'],
            'M': ['R', 'N', 'Y'], 'N': ['R', 'T', 'Y'], 'O': ['R', 'N', 'T'], 'P': ['R', 'H', 'Y'],
            'Q': ['R', 'U', 'Y'], 'R': ['Y', 'N', 'T'], 'S': ['T', 'H', 'R'], 'T': ['R', 'H', 'Y'],
            'U': ['R', 'N', 'T'], 'V': ['R', 'Y', 'N'], 'W': ['R', 'Y', 'N'], 'X': ['R', 'Y', 'N'],
            'Y': ['R', 'N', 'T'], 'Z': ['R', 'Y', 'N']
        };
        
        const options = complementaryMap[baseLetter] || ['R', 'N', 'Y'];
        const filtered = options.filter(letter => letter !== excludeLetter);
        return filtered[Math.floor(Math.random() * filtered.length)];
    }
    
    // Ensure exactly three unique letters
    ensureThreeUniqueLetters(letters, sourceName) {
        const unique = [...new Set(letters)];
        
        while (unique.length < 3) {
            // Add letters from source name that aren't already used
            for (let char of sourceName) {
                if (!unique.includes(char) && unique.length < 3) {
                    unique.push(char);
                }
            }
            
            // If still need more, add random letters
            if (unique.length < 3) {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                for (let char of alphabet) {
                    if (!unique.includes(char) && unique.length < 3) {
                        unique.push(char);
                    }
                }
            }
        }
        
        return unique.slice(0, 3);
    }
    
    // Get default letters for fallback
    getDefaultLetters() {
        const defaults = [
            ['A', 'R', 'T'], ['M', 'Y', 'S'], ['S', 'O', 'L'], ['L', 'U', 'X'],
            ['N', 'O', 'X'], ['V', 'I', 'A'], ['Z', 'E', 'N'], ['P', 'H', 'I']
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }
    
    // Generate rotation pattern based on character traits
    generateTraitBasedRotations(traits = []) {
        let patternName = 'balanced'; // Default
        
        // Analyze traits to determine best pattern
        const traitString = traits.join(' ').toLowerCase();
        
        for (const [trait, pattern] of Object.entries(this.traitPatterns)) {
            if (traitString.includes(trait)) {
                patternName = pattern;
                break;
            }
        }
        
        // Get base pattern and add variation
        const basePattern = this.rotationPatterns[patternName];
        return basePattern.map(angle => {
            // Add small random variation (±15 degrees)
            const variation = (Math.random() - 0.5) * 30;
            return (angle + variation) * (Math.PI / 180);
        });
    }
    
    // Generate rotations with mathematical harmony
    generateHarmonicRotations() {
        const goldenAngle = 137.5; // Golden angle in degrees
        const baseAngles = [0, goldenAngle, goldenAngle * 2];
        
        return baseAngles.map(angle => {
            const normalizedAngle = angle % 360;
            const variation = (Math.random() - 0.5) * 20; // Smaller variation for harmony
            return (normalizedAngle + variation) * (Math.PI / 180);
        });
    }
    
    // Generate completely random but balanced rotations
    generateRandomBalancedRotations() {
        const angles = [];
        const minSeparation = 80; // Minimum degrees between letters
        
        // Generate first angle
        angles.push(Math.random() * 360);
        
        // Generate second angle with minimum separation
        let attempts = 0;
        while (angles.length < 2 && attempts < 50) {
            const candidate = Math.random() * 360;
            const separation = Math.min(
                Math.abs(candidate - angles[0]),
                360 - Math.abs(candidate - angles[0])
            );
            
            if (separation >= minSeparation) {
                angles.push(candidate);
            }
            attempts++;
        }
        
        // Generate third angle
        attempts = 0;
        while (angles.length < 3 && attempts < 50) {
            const candidate = Math.random() * 360;
            const sep1 = Math.min(
                Math.abs(candidate - angles[0]),
                360 - Math.abs(candidate - angles[0])
            );
            const sep2 = Math.min(
                Math.abs(candidate - angles[1]),
                360 - Math.abs(candidate - angles[1])
            );
            
            if (sep1 >= minSeparation && sep2 >= minSeparation) {
                angles.push(candidate);
            }
            attempts++;
        }
        
        // Fallback to evenly spaced if random generation fails
        if (angles.length < 3) {
            return [0, 120, 240].map(angle => angle * (Math.PI / 180));
        }
        
        return angles.map(angle => angle * (Math.PI / 180));
    }
    
    // Main method to get optimized letters and rotations
    generateSigilElements(characterName, traits = [], style = 'auto') {
        const letters = this.extractSignificantLetters(characterName, traits);
        
        let rotations;
        switch (style) {
            case 'trait-based':
                rotations = this.generateTraitBasedRotations(traits);
                break;
            case 'harmonic':
                rotations = this.generateHarmonicRotations();
                break;
            case 'random':
                rotations = this.generateRandomBalancedRotations();
                break;
            default: // 'auto'
                // Choose based on character name length and traits
                if (traits.length > 0) {
                    rotations = this.generateTraitBasedRotations(traits);
                } else if (characterName.length > 10) {
                    rotations = this.generateHarmonicRotations();
                } else {
                    rotations = this.generateRandomBalancedRotations();
                }
        }
        
        return { letters, rotations };
    }
}

// Export for use in main sigil generator
window.enhancedSigilLogic = new EnhancedSigilLogic();

