const characters = {
    saveCharacter() {
        console.log('Attempting to save character');
        const character = {
            id: Date.now(),
            name: document.querySelector('#name').value || 'Unknown',
            age: parseInt(document.querySelector('#age').value) || 0,
            gender: document.querySelector('#gender').value || '',
            locale: document.querySelector('#locale').value || '',
            occupation: document.querySelector('#occupation').value || '',
            traits: document.querySelector('#traits').value || ''
        };
        console.log('Character data:', character);
        let saved = JSON.parse(localStorage.getItem('characters') || '[]');
        saved.push(character);
        localStorage.setItem('characters', JSON.stringify(saved));
        console.log(`Character saved: ${character.name}`);
        document.querySelectorAll('input').forEach(input => input.value = '');
        this.updateCharacterSelects();
        this.displayCharacters();
    },
    updateCharacterSelects() {
        const chars = JSON.parse(localStorage.getItem('characters') || '[]');
        const selects = [document.querySelector('#character1'), document.querySelector('#character2'), document.querySelector('#editSelectIndex')];
        selects.forEach(select => {
            if (select) {
                select.innerHTML = '<option value="">Select Character</option>';
                chars.forEach(char => {
                    const option = document.createElement('option');
                    option.value = char.id;
                    option.textContent = char.name;
                    select.appendChild(option);
                });
            }
        });
        console.log(`Character selects updated: ${chars.length}`);
        console.log(`Edit character select updated: ${chars.length}`);
    },
    displayCharacters() {
        const chars = JSON.parse(localStorage.getItem('characters') || '[]');
        const list = document.querySelector('#characterList');
        if (list) {
            list.innerHTML = chars.map(char => `<div>${char.name}, ${char.age}, ${char.gender}, ${char.locale}</div>`).join('');
        }
        console.log(`Characters displayed: ${chars.length}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    characters.updateCharacterSelects();
    characters.displayCharacters();
    console.log('Characters initialized on page load');
});