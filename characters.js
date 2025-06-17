const characters = {
    data: [],

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
            const char = this.data.find(c => c.id == id);
            if (char) {
                char.name = document.querySelector('#name')?.value || char.name;
                char.age = document.querySelector('#age')?.value || char.age;
                char.gender = document.querySelector('#gender')?.value || char.gender;
                char.locale = document.querySelector('#locale')?.value || char.locale;
                char.occupation = document.querySelector('#occupation')?.value || char.occupation;
                char.traits = document.querySelector('#traits')?.value || char.traits;
                localStorage.setItem('characters', JSON.stringify(this.data));
                this.displayCharacters();
                console.log('Character updated:', char);
            }
        }
    },

    updateCharacterSelects() {
        const chars = JSON.parse(localStorage.getItem('characters') || '[]');
        this.data = chars;
        const select1 = document.querySelector('#character1');
        const select2 = document.querySelector('#character2');
        const select3 = document.querySelector('#characterSelect');
        [select1, select2, select3].forEach(select => {
            if (select) {
                const initialLength = select.options.length;
                select.innerHTML = '<option value="">Select a character</option>';
                chars.forEach(char => {
                    const option = document.createElement('option');
                    option.value = char.id;
                    option.textContent = char.name;
                    select.appendChild(option);
                });
                console.log(`Character selects updated: ${select.options.length - initialLength}`);
            }
        });
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
    }
    characters.updateCharacterSelects();
    characters.displayCharacters();
    console.log('Characters initialized on page load');
});