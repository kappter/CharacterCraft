const characters = {
    data: [],

    updateCharacterSelects() {
        const selects = [
            document.querySelector('#characterSelect'),
            document.querySelector('#character1'),
            document.querySelector('#character2')
        ];
        let attempts = 0;
        const maxAttempts = 3;

        const updateSelects = () => {
            if (attempts >= maxAttempts) {
                console.error('Failed to update character selects after max attempts');
                return;
            }
            selects.forEach(select => {
                if (!select) {
                    console.error('Character select element not found');
                    return;
                }
                try {
                    const initialLength = select.options.length;
                    select.innerHTML = '<option value="">Select a character</option>';
                    this.data.forEach(char => {
                        if (char.id && char.name) {
                            const option = document.createElement('option');
                            option.value = char.id;
                            option.textContent = char.name || `Character ${char.id}`;
                            select.appendChild(option);
                        }
                    });
                    console.log(`Character selects updated: ${select.options.length - initialLength} characters`);
                } catch (error) {
                    console.error('Error updating character selects:', error);
                    attempts++;
                    setTimeout(updateSelects, 300 * attempts); // Retry with increasing delay
                }
            });
        };
        setTimeout(updateSelects, 300);
    },

    saveCharacter() {
        const char = {
            id: Date.now(),
            name: document.querySelector('#name')?.value || 'Unknown',
            age: document.querySelector('#age')?.value || 'Unknown',
            gender: document.querySelector('#gender')?.value || 'Unknown',
            locale: document.querySelector('#locale')?.value || 'Unknown',
            occupation: document.querySelector('#occupation')?.value || 'Unknown',
            traits: document.querySelector('#traits')?.value || 'Unknown'
        };
        this.data.push(char);
        localStorage.setItem('characters', JSON.stringify(this.data));
        this.updateCharacterSelects();
        this.displayCharacters();
        console.log('Character saved:', char);
    },

    updateCharacter() {
        const select = document.querySelector('#characterSelect');
        const id = select?.value;
        if (id) {
            const charIndex = this.data.findIndex(c => c.id == id);
            if (charIndex !== -1) {
                this.data[charIndex] = {
                    ...this.data[charIndex],
                    name: document.querySelector('#name')?.value || this.data[charIndex].name,
                    age: document.querySelector('#age')?.value || this.data[charIndex].age,
                    gender: document.querySelector('#gender')?.value || this.data[charIndex].gender,
                    locale: document.querySelector('#locale')?.value || this.data[charIndex].locale,
                    occupation: document.querySelector('#occupation')?.value || this.data[charIndex].occupation,
                    traits: document.querySelector('#traits')?.value || this.data[charIndex].traits
                };
                localStorage.setItem('characters', JSON.stringify(this.data));
                this.displayCharacters();
                this.updateCharacterSelects();
                console.log('Character updated:', this.data[charIndex]);
            }
        }
    },

    displayCharacters() {
        const list = document.querySelector('#characterList');
        if (list) {
            list.innerHTML = '';
            this.data.forEach(char => {
                const div = document.createElement('div');
                div.textContent = `${char.name} (${char.age}, ${char.gender}) - ${char.traits}`;
                list.appendChild(div);
            });
            console.log(`Characters displayed: ${this.data.length}`);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const savedChars = JSON.parse(localStorage.getItem('characters') || '[]');
    if (savedChars.length > 0) {
        characters.data = savedChars;
    } else {
        characters.data = [];
    }
    characters.updateCharacterSelects();
    characters.displayCharacters();
    console.log('Characters initialized on page load');
});