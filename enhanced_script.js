// Enhanced CharacterCraft Main Script - Integrates all enhanced features
class EnhancedCharacterCraft {
    constructor() {
        this.characterManager = new CharacterManager();
        this.autobiographyGenerator = new AutobiographyGenerator();
        this.comparisonEngine = new ComparisonEngine(this.characterManager);
        this.currentCharacter = null;
        this.selectedTraits = new Set();
        
        this.init();
    }

    async init() {
        // Wait for data to load
        await this.autobiographyGenerator.loadData();
        await this.comparisonEngine.loadComparisonData();
        
        // Initialize UI
        this.initializeEventListeners();
        this.initializeTheme();
        this.updateCharacterSelects();
        this.loadTraitLibrary();
        this.displaySavedCharacters();
        
        console.log('Enhanced CharacterCraft initialized');
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
        document.querySelector('.export-comparison')?.addEventListener('click', () => this.exportComparison());

        // Trait assignment
        document.getElementById('characterSelect')?.addEventListener('change', (e) => this.selectCharacterForTraits(e.target.value));
        document.querySelector('.save-traits')?.addEventListener('click', () => this.saveTraitAssignments());
        document.querySelector('.clear-traits')?.addEventListener('click', () => this.clearTraitAssignments());

        // Trait filters
        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter || e.target.dataset.category;
                this.filterTraits(filter, e.target);
            });
        });

        // Modal handling
        document.querySelector('.modal-close')?.addEventListener('click', () => this.closeModal());
        document.getElementById('characterModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'characterModal') this.closeModal();
        });

        // Reset app
        document.querySelector('.reset-app')?.addEventListener('click', () => this.resetApp());

        // Search functionality
        document.getElementById('character-search')?.addEventListener('input', (e) => this.searchCharacters(e.target.value));
        document.getElementById('trait-search')?.addEventListener('input', (e) => this.searchTraits(e.target.value));
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
        } else if (tabId === 'trait-bubbles') {
            this.updateCharacterSelects();
            this.loadTraitBubbles();
        } else if (tabId === 'compare') {
            this.updateCharacterSelects();
        }
    }

    // Character Creation Methods
    async randomizeAll() {
        this.randomizeName();
        this.randomizeAge();
        this.randomizeGender();
        this.randomizeLocale();
        this.randomizeOccupation();
        this.randomizeTraits();
    }

    randomizeName() {
        const names = ['Alex', 'Jordan', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Sage', 'River', 'Phoenix'];
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
        const locales = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Toronto', 'Berlin', 'Mumbai', 'São Paulo', 'Cairo'];
        const randomLocale = locales[Math.floor(Math.random() * locales.length)];
        document.getElementById('locale').value = randomLocale;
    }

    randomizeOccupation() {
        const occupations = ['Teacher', 'Engineer', 'Artist', 'Doctor', 'Writer', 'Chef', 'Musician', 'Lawyer', 'Designer', 'Scientist'];
        const randomOccupation = occupations[Math.floor(Math.random() * occupations.length)];
        document.getElementById('occupation').value = randomOccupation;
    }

    randomizeTraits() {
        const traits = ['Creative', 'Analytical', 'Empathetic', 'Ambitious', 'Calm', 'Adventurous', 'Organized', 'Spontaneous'];
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
        if (!character.basicInfo.name) {
            alert('Please enter a character name first.');
            return;
        }

        // Use existing bio generation logic (simplified)
        const bio = this.generateDetailedBio(character);
        document.getElementById('shortBioOutput').innerHTML = bio;
        
        // Enable export buttons
        document.querySelector('.export-bio').disabled = false;
        document.querySelector('.export-full-report').disabled = false;
    }

    async generateAutobiography() {
        const character = this.getCharacterFromForm();
        if (!character.basicInfo.name) {
            alert('Please enter a character name first.');
            return;
        }

        try {
            const autobiography = await this.autobiographyGenerator.generateAutobiography(character);
            document.getElementById('autobiographyOutput').innerHTML = autobiography;
            
            // Enable export buttons
            document.querySelector('.export-autobiography').disabled = false;
            document.querySelector('.export-full-report').disabled = false;
        } catch (error) {
            console.error('Error generating autobiography:', error);
            document.getElementById('autobiographyOutput').innerHTML = '<div class="empty">Error generating autobiography. Please try again.</div>';
        }
    }

    generateDetailedBio(character) {
        // Simplified bio generation for now
        return `
            <h3>Character Biography</h3>
            <p><strong>${character.basicInfo.name}</strong>, a ${character.basicInfo.age}-year-old ${character.basicInfo.gender} ${character.basicInfo.occupation} from ${character.basicInfo.locale}, is known for their distinctive personality traits including ${character.traits.custom.join(', ')}.</p>
            <p>Their professional life as a ${character.basicInfo.occupation} has shaped their worldview, while their background in ${character.basicInfo.locale} has given them a unique perspective on life. These experiences have contributed to their complex personality and approach to relationships and challenges.</p>
            <p>Those who know ${character.basicInfo.name} would describe them as someone who embodies the qualities of ${character.traits.custom.slice(0, 2).join(' and ')}, making them both memorable and influential in their personal and professional circles.</p>
        `;
    }

    saveCharacter() {
        const character = this.getCharacterFromForm();
        if (!character.basicInfo.name) {
            alert('Please enter a character name first.');
            return;
        }

        // Get generated content
        const bioElement = document.getElementById('shortBioOutput');
        const autobiographyElement = document.getElementById('autobiographyOutput');
        
        if (bioElement && !bioElement.querySelector('.empty')) {
            character.bios.external = bioElement.innerHTML;
        }
        
        if (autobiographyElement && !autobiographyElement.querySelector('.empty')) {
            character.bios.autobiography = autobiographyElement.innerHTML;
        }

        const savedCharacter = this.characterManager.createCharacter(character.basicInfo);
        if (character.bios.external || character.bios.autobiography) {
            this.characterManager.updateCharacter(savedCharacter.id, { bios: character.bios });
        }

        this.updateCharacterSelects();
        this.displaySavedCharacters();
        
        alert(`Character "${character.basicInfo.name}" saved successfully!`);
    }

    getCharacterFromForm() {
        return {
            basicInfo: {
                name: document.getElementById('name')?.value || '',
                age: parseInt(document.getElementById('age')?.value) || 25,
                gender: document.getElementById('gender')?.value || '',
                locale: document.getElementById('locale')?.value || '',
                occupation: document.getElementById('occupation')?.value || ''
            },
            traits: {
                physical: [],
                psychological: [],
                background: [],
                motivations: [],
                custom: (document.getElementById('traits')?.value || '').split(',').map(t => t.trim()).filter(t => t)
            },
            bios: {
                external: '',
                autobiography: '',
                sections: {}
            }
        };
    }

    // Character Comparison Methods
    async compareCharacters() {
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

        try {
            const comparison = this.comparisonEngine.compareCharacters(char1Id, char2Id, context);
            this.displayComparison(comparison);
            document.querySelector('.export-comparison').disabled = false;
        } catch (error) {
            console.error('Error comparing characters:', error);
            document.getElementById('comparisonOutput').innerHTML = '<div class="empty">Error generating comparison. Please try again.</div>';
        }
    }

    displayComparison(comparison) {
        const output = document.getElementById('comparisonOutput');
        const { char1, char2 } = comparison.characters;
        
        const html = `
            <div class="comparison-section">
                <h4>Character Overview</h4>
                <div class="character-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <strong>${char1.basicInfo.name}</strong><br>
                        ${char1.basicInfo.age} years old, ${char1.basicInfo.gender}<br>
                        ${char1.basicInfo.occupation} from ${char1.basicInfo.locale}
                    </div>
                    <div>
                        <strong>${char2.basicInfo.name}</strong><br>
                        ${char2.basicInfo.age} years old, ${char2.basicInfo.gender}<br>
                        ${char2.basicInfo.occupation} from ${char2.basicInfo.locale}
                    </div>
                </div>
            </div>

            <div class="comparison-section">
                <h4>Main Writing Prompt</h4>
                <div class="prompt-box">
                    <h5>${comparison.writingPrompts.mainScenario.title}</h5>
                    <p><strong>Setup:</strong> ${comparison.writingPrompts.mainScenario.setup}</p>
                    <p><strong>Initial Tension:</strong> ${comparison.writingPrompts.mainScenario.initialTension}</p>
                </div>
            </div>

            <div class="comparison-section">
                <h4>Conflict Potential</h4>
                ${comparison.writingPrompts.conflictPrompts.map(conflict => `
                    <div class="prompt-box conflict">
                        <h5>${conflict.type} Conflict</h5>
                        <p>${conflict.prompt}</p>
                    </div>
                `).join('')}
            </div>

            <div class="comparison-section">
                <h4>Collaboration Opportunities</h4>
                ${comparison.writingPrompts.collaborationPrompts.map(collab => `
                    <div class="prompt-box collaboration">
                        <h5>${collab.type}</h5>
                        <p>${collab.prompt}</p>
                    </div>
                `).join('')}
            </div>

            <div class="comparison-section">
                <h4>Plot Development Ideas</h4>
                <ul>
                    ${comparison.writingPrompts.plotTwists.map(twist => `<li>${twist}</li>`).join('')}
                </ul>
            </div>
        `;
        
        output.innerHTML = html;
        this.currentComparison = comparison;
    }

    // Trait Assignment Methods
    selectCharacterForTraits(characterId) {
        if (!characterId) {
            this.currentCharacter = null;
            this.selectedTraits.clear();
            this.loadTraitBubbles();
            return;
        }

        this.currentCharacter = this.characterManager.getCharacter(characterId);
        if (this.currentCharacter) {
            // Load existing traits
            this.selectedTraits.clear();
            Object.values(this.currentCharacter.traits).forEach(traitArray => {
                traitArray.forEach(trait => this.selectedTraits.add(trait));
            });
            this.loadTraitBubbles();
            document.querySelector('.save-traits').disabled = false;
            document.querySelector('.clear-traits').disabled = false;
        }
    }

    loadTraitBubbles() {
        const container = document.getElementById('traitBubbles');
        if (!container) return;

        // Sample traits for now
        const allTraits = [
            'Creative', 'Analytical', 'Empathetic', 'Ambitious', 'Calm', 'Adventurous',
            'Organized', 'Spontaneous', 'Introverted', 'Extroverted', 'Patient', 'Energetic',
            'Optimistic', 'Realistic', 'Confident', 'Humble', 'Independent', 'Collaborative'
        ];

        container.innerHTML = allTraits.map(trait => `
            <div class="trait-bubble ${this.selectedTraits.has(trait) ? 'selected' : ''}" 
                 data-trait="${trait}" 
                 onclick="enhancedApp.toggleTrait('${trait}')">
                ${trait}
            </div>
        `).join('');
    }

    toggleTrait(trait) {
        if (this.selectedTraits.has(trait)) {
            this.selectedTraits.delete(trait);
        } else {
            this.selectedTraits.add(trait);
        }
        this.loadTraitBubbles();
    }

    saveTraitAssignments() {
        if (!this.currentCharacter) return;

        const traits = {
            physical: [],
            psychological: Array.from(this.selectedTraits),
            background: [],
            motivations: [],
            custom: []
        };

        this.characterManager.updateCharacter(this.currentCharacter.id, { traits });
        this.displaySavedCharacters();
        alert('Traits saved successfully!');
    }

    clearTraitAssignments() {
        this.selectedTraits.clear();
        this.loadTraitBubbles();
    }

    // Display Methods
    updateCharacterSelects() {
        const selects = ['character1', 'character2', 'characterSelect'];
        const characters = this.characterManager.getAllCharacters();

        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Select a character</option>';
                
                characters.forEach(char => {
                    const option = document.createElement('option');
                    option.value = char.id;
                    option.textContent = char.basicInfo.name;
                    select.appendChild(option);
                });
                
                select.value = currentValue;
            }
        });
    }

    displaySavedCharacters() {
        const container = document.getElementById('characterList');
        if (!container) return;

        const characters = this.characterManager.getAllCharacters();
        
        if (characters.length === 0) {
            container.innerHTML = '<div class="empty">No saved characters yet. Create and save a character to see it here.</div>';
            return;
        }

        container.innerHTML = characters.map(char => `
            <div class="character-item">
                <div class="character-info">
                    <div class="character-name">${char.basicInfo.name}</div>
                    <div class="character-details">
                        ${char.basicInfo.age} years old, ${char.basicInfo.gender} ${char.basicInfo.occupation} from ${char.basicInfo.locale}
                    </div>
                </div>
                <div class="character-actions">
                    <button class="btn-primary" onclick="enhancedApp.viewCharacterReport('${char.id}')">View Report</button>
                    <button class="btn-secondary" onclick="enhancedApp.editCharacter('${char.id}')">Edit</button>
                    <button class="btn-danger" onclick="enhancedApp.deleteCharacter('${char.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    viewCharacterReport(characterId) {
        const character = this.characterManager.getCharacter(characterId);
        if (!character) return;

        const reportContent = this.characterManager.generateCharacterHTML(character);
        document.getElementById('characterReportContent').innerHTML = reportContent;
        document.getElementById('characterModal').classList.add('active');
    }

    editCharacter(characterId) {
        const character = this.characterManager.getCharacter(characterId);
        if (!character) return;

        // Switch to create tab and populate form
        this.switchTab('create');
        document.getElementById('name').value = character.basicInfo.name;
        document.getElementById('age').value = character.basicInfo.age;
        document.getElementById('gender').value = character.basicInfo.gender;
        document.getElementById('locale').value = character.basicInfo.locale;
        document.getElementById('occupation').value = character.basicInfo.occupation;
        
        const allTraits = Object.values(character.traits).flat();
        document.getElementById('traits').value = allTraits.join(', ');
    }

    deleteCharacter(characterId) {
        const character = this.characterManager.getCharacter(characterId);
        if (!character) return;

        if (confirm(`Are you sure you want to delete "${character.basicInfo.name}"?`)) {
            this.characterManager.deleteCharacter(characterId);
            this.displaySavedCharacters();
            this.updateCharacterSelects();
        }
    }

    closeModal() {
        document.getElementById('characterModal').classList.remove('active');
    }

    // Export Methods
    exportBio() {
        const bioContent = document.getElementById('shortBioOutput').innerHTML;
        if (bioContent.includes('empty')) {
            alert('Please generate a bio first.');
            return;
        }
        this.downloadFile('character_bio.html', bioContent, 'text/html');
    }

    exportAutobiography() {
        const autobiographyContent = document.getElementById('autobiographyOutput').innerHTML;
        if (autobiographyContent.includes('empty')) {
            alert('Please generate an autobiography first.');
            return;
        }
        this.downloadFile('character_autobiography.html', autobiographyContent, 'text/html');
    }

    exportFullReport() {
        const character = this.getCharacterFromForm();
        const bioContent = document.getElementById('shortBioOutput').innerHTML;
        const autobiographyContent = document.getElementById('autobiographyOutput').innerHTML;
        
        const fullReport = `
<!DOCTYPE html>
<html>
<head>
    <title>Character Report: ${character.basicInfo.name}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .section { margin-bottom: 30px; }
        h1, h2 { color: #2c3e50; }
    </style>
</head>
<body>
    <h1>Character Report: ${character.basicInfo.name}</h1>
    <div class="section">
        <h2>Basic Information</h2>
        <p><strong>Name:</strong> ${character.basicInfo.name}</p>
        <p><strong>Age:</strong> ${character.basicInfo.age}</p>
        <p><strong>Gender:</strong> ${character.basicInfo.gender}</p>
        <p><strong>Location:</strong> ${character.basicInfo.locale}</p>
        <p><strong>Occupation:</strong> ${character.basicInfo.occupation}</p>
    </div>
    <div class="section">
        <h2>External Biography</h2>
        ${bioContent}
    </div>
    <div class="section">
        <h2>Autobiography</h2>
        ${autobiographyContent}
    </div>
</body>
</html>`;
        
        this.downloadFile('character_full_report.html', fullReport, 'text/html');
    }

    exportComparison() {
        if (!this.currentComparison) {
            alert('Please generate a comparison first.');
            return;
        }
        
        const comparisonHTML = this.comparisonEngine.exportComparison(this.currentComparison, 'html');
        this.downloadFile('character_comparison.html', comparisonHTML, 'text/html');
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

    // Utility Methods
    filterTraits(filter, button) {
        // Update active filter button
        button.parentElement.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter logic would go here
        console.log('Filtering traits by:', filter);
    }

    searchCharacters(query) {
        const characters = this.characterManager.searchCharacters(query);
        // Update display with filtered characters
        console.log('Searching characters:', query, characters);
    }

    searchTraits(query) {
        // Trait search logic would go here
        console.log('Searching traits:', query);
    }

    loadTraitLibrary() {
        // Load trait library display
        console.log('Loading trait library');
    }

    resetApp() {
        if (confirm('Are you sure you want to reset the app? This will clear all data.')) {
            localStorage.clear();
            location.reload();
        }
    }
}

// Initialize the enhanced app when DOM is loaded
let enhancedApp;
document.addEventListener('DOMContentLoaded', () => {
    enhancedApp = new EnhancedCharacterCraft();
});

// Export for global access
window.enhancedApp = enhancedApp;

