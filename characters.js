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
    updateCharacter() {
        console.log('Updating character');
        const id = document.querySelector('#editSelectIndex').value;
        if (!id) return;
        const character = {
            id: parseInt(id),
            name: document.querySelector('#editName').value || 'Unknown',
            age: parseInt(document.querySelector('#editAge').value) || 0,
            gender: document.querySelector('#editGender').value || '',
            locale: document.querySelector('#editLocale').value || '',
            occupation: document.querySelector('#editOccupation').value || '',
            traits: document.querySelector('#editTraits').value || ''
        };
        let saved = JSON.parse(localStorage.getItem('characters') || '[]');
        saved = saved.map(c => c.id == id ? character : c);
        localStorage.setItem('characters', JSON.stringify(saved));
        console.log(`Character updated: ${character.name}`);
        this.updateCharacterSelects();
        this.displayCharacters();
    },
    updateCharacterSelects() {
        const chars = JSON.parse(localStorage.getItem('characters') || '[]');
        const selects = [document.querySelector('#character1'), document.querySelector('#character2'), document.querySelector('#editSelectIndex')];
        selects.forEach(select => {
            if (select) {
                const current = select.value;
                select.innerHTML = '<option value="">Select Character</option>';
                chars.forEach(char => {
                    const option = document.createElement('option');
                    option.value = char.id;
                    option.textContent = char.name;
                    select.appendChild(option);
                });
                select.value = current;
            }
        });
        console.log(`Character selects updated: ${chars.length}`);
        console.log(`Edit character select updated: ${chars.length}`);
        const editSelect = document.querySelector('#editSelectIndex');
        if (editSelect) {
            editSelect.addEventListener('change', () => {
                const char = chars.find(c => c.id == editSelect.value) || {};
                document.querySelector('#editName').value = char.name || '';
                document.querySelector('#editAge').value = char.age || '';
                document.querySelector('#editGender').value = char.gender || '';
                document.querySelector('#editLocale').value = char.locale || '';
                document.querySelector('#editOccupation').value = char.occupation || '';
                document.querySelector('#editTraits').value = char.traits || '';
            });
        }
    },
    displayCharacters() {
        const chars = JSON.parse(localStorage.getItem('characters') || '[]');
        const list = document.querySelector('#characterList');
        if (list) {
            list.innerHTML = chars.map(char => `
                <div class="mb-2 p-2 border rounded cursor-pointer" onclick="document.querySelector('#characterReportContent').innerHTML='${char.name}: ${char.traits}';document.querySelector('#characterReportModal').classList.remove('hidden');">
                    ${char.name}, ${char.age}, ${char.gender}, ${char.locale}
                </div>
            `).join('');
        }
        console.log(`Characters displayed: ${chars.length}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Characters initialized on page load');
});