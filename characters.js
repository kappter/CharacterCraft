const characters = {
    data: JSON.parse(localStorage.getItem('characters') || '[]'),
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
        console.log('Saving character:', char);
        this.data.push(char);
        localStorage.setItem('characters', JSON.stringify(this.data));
        this.updateCharacterSelects();
        this.displayCharacters();
        console.log('Character saved:', char);
    },
    updateCharacterSelects() {
        const select1 = document.querySelector('#characterSelect1');
        const select2 = document.querySelector('#characterSelect2');
        if (select1 && select2) {
            [select1, select2].forEach(select => {
                select.innerHTML = '<option value="">Select a character</option>';
                this.data.forEach(char => {
                    const option = document.createElement('option');
                    option.value = char.id;
                    option.textContent = `${char.name} (${char.age})`;
                    select.appendChild(option);
                });
                console.log(`Character selects updated: ${this.data.length} characters added to ${select.id}`);
            });
        }
    },
    displayCharacters() {
        const savedDiv = document.querySelector('#savedCharacters');
        if (savedDiv) {
            savedDiv.innerHTML = this.data.map(char => `<p>${char.name}, ${char.age}, ${char.gender}</p>`).join('');
            console.log(`Characters displayed: ${this.data.length}`);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (characters.data.length > 0) {
        characters.updateCharacterSelects();
    }
    console.log('Characters initialized on page load');
});
