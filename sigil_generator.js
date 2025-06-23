// Sigil Generation System for CharacterCraft
// Creates unique PNG graphics with massive letters filling entire circle diameter

class SigilGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.size = 200; // Canvas size
        this.centerX = this.size / 2;
        this.centerY = this.size / 2;
        this.circleRadius = 85; // Circle radius
        this.letterSize = this.circleRadius * 1.8; // Massive letters filling circle diameter
        
        // Bold sans serif fonts for maximum impact
        this.fonts = [
            'Arial Black',
            'Helvetica Bold', 
            'Impact',
            'Trebuchet MS Bold',
            'Verdana Bold',
            'Tahoma Bold',
            'Geneva Bold',
            'Futura Bold'
        ];
        
        // High contrast color schemes for dramatic effect
        this.colorSchemes = [
            { bg: '#ffffff', letters: '#000000', accent: '#333333' }, // Classic black on white
            { bg: '#000000', letters: '#ffffff', accent: '#cccccc' }, // White on black
            { bg: '#1a1a2e', letters: '#ffffff', accent: '#0f3460' }, // Deep blue
            { bg: '#2d1b69', letters: '#38ef7d', accent: '#11998e' }, // Purple-green
            { bg: '#8e2de2', letters: '#ffffff', accent: '#4a00e0' }, // Purple gradient
            { bg: '#ff6b6b', letters: '#ffffff', accent: '#ee5a24' }, // Red-orange
            { bg: '#4834d4', letters: '#ffffff', accent: '#686de0' }, // Blue-purple
            { bg: '#00d2d3', letters: '#333333', accent: '#ff9ff3' }, // Cyan-pink
            { bg: '#667eea', letters: '#ffffff', accent: '#764ba2' }  // Blue-purple
        ];
    }
    
    // Initialize canvas element
    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx = this.canvas.getContext('2d');
        
        // Enable high DPI rendering
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.size * dpr;
        this.canvas.height = this.size * dpr;
        this.canvas.style.width = this.size + 'px';
        this.canvas.style.height = this.size + 'px';
        this.ctx.scale(dpr, dpr);
    }
    
    // Extract three letters from character name
    extractLetters(characterName) {
        if (!characterName || characterName.length === 0) {
            return ['A', 'B', 'C']; // Default letters
        }
        
        const cleanName = characterName.replace(/[^a-zA-Z]/g, '').toUpperCase();
        
        if (cleanName.length === 0) {
            return ['A', 'B', 'C'];
        }
        
        let letters = [];
        
        if (cleanName.length >= 3) {
            // Use first, middle, and last letters
            letters.push(cleanName[0]);
            letters.push(cleanName[Math.floor(cleanName.length / 2)]);
            letters.push(cleanName[cleanName.length - 1]);
        } else if (cleanName.length === 2) {
            // Use both letters plus first letter again
            letters.push(cleanName[0]);
            letters.push(cleanName[1]);
            letters.push(cleanName[0]);
        } else {
            // Single letter - use it three times with variations
            letters.push(cleanName[0]);
            letters.push(cleanName[0]);
            letters.push(cleanName[0]);
        }
        
        return letters;
    }
    
    // Generate random rotation angles for letters
    generateRotations() {
        const baseAngles = [0, 120, 240]; // Evenly spaced around circle
        return baseAngles.map(angle => {
            // Add random variation of ±30 degrees
            const variation = (Math.random() - 0.5) * 60;
            return (angle + variation) * (Math.PI / 180); // Convert to radians
        });
    }
    
    // Draw background circle with gradient
    drawBackground(colorScheme) {
        // Clear canvas
        this.ctx.fillStyle = colorScheme.bg;
        this.ctx.fillRect(0, 0, this.size, this.size);
        
        // Draw outer circle border
        this.ctx.strokeStyle = colorScheme.accent;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.circleRadius, 0, 2 * Math.PI);
        this.ctx.stroke();
        
        // Draw inner circle for contrast
        this.ctx.strokeStyle = colorScheme.letters;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.circleRadius - 5, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    
    // Draw a massive letter filling the entire circle diameter
    drawMassiveLetter(letter, rotation, colorScheme, font) {
        this.ctx.save();
        
        // Move to center point
        this.ctx.translate(this.centerX, this.centerY);
        
        // Apply rotation around center
        this.ctx.rotate(rotation);
        
        // Set massive font size to fill circle diameter
        this.ctx.font = `bold ${this.letterSize}px ${font}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Draw letter shadow for depth
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillText(letter, 3, 3);
        
        // Draw main letter with high contrast
        this.ctx.fillStyle = colorScheme.letters;
        this.ctx.fillText(letter, 0, 0);
        
        // Add letter outline for definition
        this.ctx.strokeStyle = colorScheme.accent;
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(letter, 0, 0);
        
        this.ctx.restore();
    }
    
    // Draw center overlap effect
    drawCenterOverlap(colorScheme) {
        // Create a subtle center circle to unify the design
        const centerGradient = this.ctx.createRadialGradient(
            this.centerX, this.centerY, 0,
            this.centerX, this.centerY, 25
        );
        centerGradient.addColorStop(0, colorScheme.accent + '80'); // Semi-transparent
        centerGradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = centerGradient;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 25, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    // Generate complete sigil
    generateSigil(characterName, options = {}) {
        this.initCanvas();
        
        // Extract letters and generate dramatic rotations
        const letters = this.extractLetters(characterName);
        const rotations = this.generateDramaticRotations(letters.length);
        
        // Select random color scheme and font
        const colorScheme = this.colorSchemes[Math.floor(Math.random() * this.colorSchemes.length)];
        const font = this.fonts[Math.floor(Math.random() * this.fonts.length)];
        
        // Clear canvas and draw background
        this.drawBackground(colorScheme);
        
        // Draw massive letters with dramatic overlapping
        letters.forEach((letter, index) => {
            this.drawMassiveLetter(letter, rotations[index], colorScheme, font);
        });
        
        // Draw center point to emphasize intersection
        this.drawCenterPoint(colorScheme);
        
        return this.canvas;
    }
    
    // Generate dramatic rotations for maximum visual impact
    generateDramaticRotations(letterCount) {
        const rotations = [];
        
        if (letterCount === 1) {
            rotations.push(0); // Single letter, no rotation needed
        } else if (letterCount === 2) {
            // Two letters: create dramatic intersection like the user's K+K example
            rotations.push(0); // First letter vertical
            rotations.push(Math.PI / 2.5 + (Math.random() - 0.5) * (Math.PI / 8)); // Second at ~72 degrees ± variation
        } else if (letterCount === 3) {
            // Three letters: create triangular intersection pattern
            rotations.push(0); // First letter vertical
            rotations.push(Math.PI / 3 + (Math.random() - 0.5) * (Math.PI / 12)); // Second at ~60 degrees
            rotations.push(2 * Math.PI / 3 + (Math.random() - 0.5) * (Math.PI / 12)); // Third at ~120 degrees
        } else {
            // Four or more letters: distribute evenly with slight variation
            const baseAngle = (2 * Math.PI) / letterCount;
            for (let i = 0; i < letterCount; i++) {
                const rotation = i * baseAngle + (Math.random() - 0.5) * (Math.PI / 8); // ±22.5 degrees variation
                rotations.push(rotation);
            }
        }
        
        return rotations;
    }
    
    // Enhanced center point with intersection emphasis
    drawCenterPoint(colorScheme) {
        this.ctx.save();
        
        // Draw center intersection point
        this.ctx.fillStyle = colorScheme.accent;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 4, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add subtle cross lines to emphasize intersection
        this.ctx.strokeStyle = colorScheme.accent;
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.5;
        
        // Horizontal line
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - 8, this.centerY);
        this.ctx.lineTo(this.centerX + 8, this.centerY);
        this.ctx.stroke();
        
        // Vertical line
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY - 8);
        this.ctx.lineTo(this.centerX, this.centerY + 8);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    // Generate sigil as data URL for embedding
    generateSigilDataURL(characterName) {
        const canvas = this.generateSigil(characterName);
        return canvas.toDataURL('image/png');
    }
    
    // Generate sigil as blob for downloading
    generateSigilBlob(characterName, callback) {
        const canvas = this.generateSigil(characterName);
        canvas.toBlob(callback, 'image/png');
    }
    
    // Create downloadable sigil file
    downloadSigil(characterName, filename) {
        this.generateSigilBlob(characterName, (blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || `${characterName.replace(/[^a-zA-Z0-9]/g, '_')}_sigil.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
}

// Global sigil generator instance
window.sigilGenerator = new SigilGenerator();

// Helper function to create sigil for character
function createCharacterSigil(characterName) {
    return window.sigilGenerator.generateSigilDataURL(characterName);
}

// Helper function to download character sigil
function downloadCharacterSigil(characterName) {
    window.sigilGenerator.downloadSigil(characterName);
}

