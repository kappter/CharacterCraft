// Sigil Generation System for CharacterCraft
// Creates unique PNG graphics with three letters arranged in a circle

class SigilGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.size = 200; // Canvas size
        this.centerX = this.size / 2;
        this.centerY = this.size / 2;
        this.radius = 60; // Circle radius for letter placement
        
        // Bold sans serif fonts for logo-style appearance
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
        
        // Color schemes for sigils
        this.colorSchemes = [
            { bg: '#1a1a2e', letters: '#16213e', accent: '#0f3460' }, // Deep blue
            { bg: '#2d1b69', letters: '#11998e', accent: '#38ef7d' }, // Purple-teal
            { bg: '#8e2de2', letters: '#4a00e0', accent: '#ffffff' }, // Purple gradient
            { bg: '#ff6b6b', letters: '#ee5a24', accent: '#ffffff' }, // Red-orange
            { bg: '#4834d4', letters: '#686de0', accent: '#ffffff' }, // Blue-purple
            { bg: '#00d2d3', letters: '#ff9ff3', accent: '#ffffff' }, // Cyan-pink
            { bg: '#ff9a9e', letters: '#fecfef', accent: '#ffffff' }, // Pink gradient
            { bg: '#a8edea', letters: '#fed6e3', accent: '#333333' }, // Soft pastels
            { bg: '#ffecd2', letters: '#fcb69f', accent: '#333333' }, // Warm pastels
            { bg: '#667eea', letters: '#764ba2', accent: '#ffffff' }  // Blue-purple
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
        const gradient = this.ctx.createRadialGradient(
            this.centerX, this.centerY, 0,
            this.centerX, this.centerY, this.radius + 40
        );
        gradient.addColorStop(0, colorScheme.bg);
        gradient.addColorStop(1, colorScheme.accent);
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius + 30, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add subtle border
        this.ctx.strokeStyle = colorScheme.letters;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    // Draw a single letter at specified position and rotation
    drawLetter(letter, angle, colorScheme, font, fontSize = 48) {
        this.ctx.save();
        
        // Calculate position on circle
        const x = this.centerX + Math.cos(angle) * this.radius;
        const y = this.centerY + Math.sin(angle) * this.radius;
        
        // Move to letter position
        this.ctx.translate(x, y);
        
        // Rotate the letter
        this.ctx.rotate(angle + Math.PI / 2); // Add 90 degrees for better orientation
        
        // Set font and style
        this.ctx.font = `bold ${fontSize}px ${font}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Draw letter shadow for depth
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillText(letter, 2, 2);
        
        // Draw main letter
        this.ctx.fillStyle = colorScheme.letters;
        this.ctx.fillText(letter, 0, 0);
        
        // Add letter outline for definition
        this.ctx.strokeStyle = colorScheme.accent;
        this.ctx.lineWidth = 1;
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
        
        // Extract letters and generate rotations
        const letters = this.extractLetters(characterName);
        const rotations = this.generateRotations();
        
        // Select random color scheme and font
        const colorScheme = this.colorSchemes[Math.floor(Math.random() * this.colorSchemes.length)];
        const font = this.fonts[Math.floor(Math.random() * this.fonts.length)];
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.size, this.size);
        
        // Draw background
        this.drawBackground(colorScheme);
        
        // Draw letters at calculated positions and rotations
        letters.forEach((letter, index) => {
            this.drawLetter(letter, rotations[index], colorScheme, font);
        });
        
        // Draw center overlap effect
        this.drawCenterOverlap(colorScheme);
        
        return this.canvas;
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

