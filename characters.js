let characters = [];

function saveCharacter(character) {
    try {
        console.log('Attempting to save character');
        const charData = character || {
            id: Date.now(),
            name: document.getElementById('name').value || 'Unnamed',
            age: parseInt(document.getElementById('age').value) || 0,
            gender: document.getElementById('gender').value || 'Unknown',
            locale: document.getElementById('locale').value || 'Unknown',
            occupation: document.getElementById('occupation').value || 'Unknown',
            traits: document.getElementById('traits').value ? document.getElementById('traits').value.split(',').map(t => t.trim()) : []
        };
        console.log('Character data:', charData);

        const existingIndex = characters.findIndex(c => c.id === charData.id);
        if (existingIndex !== -1) {
            characters[existingIndex] = charData;
            console.log('Updated existing character:', charData.name);
        } else {
            characters.push(charData);
            console.log('Character saved:', charData.name);
        }

        updateCharacterSelects();
        displayCharacters();
        clearCharacterForm();
        showTab('saved');
    } catch (err) {
        console.error('Error saving character:', err);
    }
}

function getCharacterById(id) {
    try {
        const character = characters.find(c => c.id === parseInt(id));
        if (!character) throw new Error('Character not found');
        return character;
    } catch (err) {
        console.error('Error getting character by ID:', err);
        return null;
    }
}

function updateCharacterSelects() {
    try {
        const select1 = document.getElementById('character1');
        const select2 = document.getElementById('character2');
        const editSelect = document.getElementById('editSelectIndex');
        if (select1) select1.innerHTML = '<option value="">Select Character</option>';
        if (select2) select2.innerHTML = '<option value="">Select Character</option>';
        if (editSelect) editSelect.innerHTML = '<option value="">Select Character</option>';

        characters.forEach(char => {
            const option = `<option value="${char.id}">${char.name}</option>`;
            if (select1) select1.innerHTML += option;
            if (select2) select2.innerHTML += option;
            if (editSelect) editSelect.innerHTML += option;
        });

        console.log('Character selects updated:', characters.length);
        if (editSelect) console.log('Edit character select updated:', characters.length);
    } catch (err) {
        console.error('Error updating character selects:', err);
    }
}

function displayCharacters() {
    try {
        const charList = document.getElementById('characterList');
        if (!charList) return;
        charList.innerHTML = '';
        characters.forEach(char => {
            const div = document.createElement('div');
            div.className = 'border border-gray-300 dark:border-gray-600 p-4 rounded-md';
            div.innerHTML = `
                <h3 class="text-lg font-semibold">${char.name}</h3>
                <p>Age: ${char.age}</p>
                <p>Gender: ${char.gender}</p>
                <p>Locale: ${char.locale}</p>
                <p>Occupation: ${char.occupation}</p>
                <p>Traits: ${char.traits.join(', ')}</p>
                <button class="view-report mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" data-id="${char.id}">View Report</button>
            `;
            charList.appendChild(div);
        });
        console.log('Characters displayed:', characters.length);
    } catch (err) {
        console.error('Error displaying characters:', err);
    }
}

function clearCharacterForm() {
    try {
        const fields = ['name', 'age', 'gender', 'locale', 'occupation', 'traits'];
        fields.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        console.log('Character creation form cleared');
    } catch (err) {
        console.error('Error clearing character form:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        characters = JSON.parse(localStorage.getItem('characters')) || [];
        displayCharacters();
        updateCharacterSelects();
        console.log('Characters initialized on page load');
    } catch (err) {
        console.error('Error initializing characters:', err);
    }
});