let characters = JSON.parse(localStorage.getItem('characters')) || [];
let traits = [];

// Predefined locales for randomization
const locales = ['New York', 'Tokyo', 'Rural Midwest', 'London', 'Cape Town'];

// CSV files to load
const csvFiles = [
    'physical_traits.csv',
    'psychological_traits.csv',
    'background_details.csv',
    'motivations_beliefs.csv'
];

// Load all CSV files
Promise.all(csvFiles.map(file => fetch(file).then(response => response.text())))
    .then(data => {
        data.forEach((csvData, index) => {
            const parsedTraits = parseCSV(csvData);
            traits = traits.concat(parsedTraits);
        });
        displayTraits();
    });

// Parse CSV data
function parseCSV(data) {
    const rows = data.trim().split('\n').slice(1); // Skip header
    return rows.map(row => {
        const [category, characteristic, synonyms, description] = row.split(',').map(item => item.trim());
        return { category, characteristic, synonyms: synonyms.split(';'), description };
    });
}

// Randomly select a trait from a category
function getRandomTrait(category) {
    const categoryTraits = traits.filter(t => t.category === category);
    return categoryTraits.length ? categoryTraits[Math.floor(Math.random() * categoryTraits.length)] : null;
}

// Show tab
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Save character
function saveCharacter() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const gender = document.getElementById('gender').value || ['male', 'female', 'non-binary', 'unspecified'][Math.floor(Math.random() * 4)];
    const locale = document.getElementById('locale').value || locales[Math.floor(Math.random() * locales.length)];
    const occupation = document.getElementById('occupation').value;
    const traitsInput = document.getElementById('traits').value;

    if (name && occupation) {
        const character = {
            name,
            age,
            gender,
            locale,
            occupation,
            traits: traitsInput ? traitsInput.split(',').map(t => t.trim()) : []
        };
        characters.push(character);
        localStorage.setItem('characters', JSON.stringify(characters));
        displayCharacters();
        updateCharacterSelects();
        clearForm();
        showTab('saved'); // Navigate to Saved Characters tab
    } else {
        alert('Please fill in required fields (Name, Occupation).');
    }
}

// Generate bios
function generateBio() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const gender = document.getElementById('gender').value || ['male', 'female', 'non-binary', 'unspecified'][Math.floor(Math.random() * 4)];
    const locale = document.getElementById('locale').value || locales[Math.floor(Math.random() * locales.length)];
    const occupation = document.getElementById('occupation').value;
    const userTraits = document.getElementById('traits').value.split(',').map(t => t.trim()).filter(t => t);

    if (!name || !occupation) {
        alert('Please fill in required fields (Name, Occupation) to generate bios.');
        return;
    }

    // Select traits (user-specified or random)
    const physicalTrait = getRandomTrait('Physical') || { characteristic: 'average build', description: 'An unremarkable physique.' };
    const psychologicalTrait = userTraits.length ? { characteristic: userTraits[0], description: 'User-defined trait.' } : getRandomTrait('Psychological') || { characteristic: 'calm', description: 'A composed demeanor.' };
    const backgroundTrait = getRandomTrait('Background') || { characteristic: 'urban upbringing', description: 'Raised in a bustling city.' };
    const motivationTrait = getRandomTrait('Motivations') || { characteristic: 'pursuit of truth', description: 'A drive to uncover hidden realities.' };

    // Short bio template
    const shortBio = `${name}, a ${age}-year-old ${gender} ${occupation} from ${locale}, is marked by ${physicalTrait.characteristic}, ${psychologicalTrait.characteristic}, and a ${backgroundTrait.characteristic}. Their ${motivationTrait.characteristic} shapes their life in ${locale}, hinting at a story rich with potential and depth.`;

    // Extended bio template
    const extendedBioSections = [
        {
            title: 'Early Life',
            content: `${name} was born in ${locale}, where their ${backgroundTrait.characteristic} set the stage for their early years. ${backgroundTrait.description} Their ${physicalTrait.characteristic} often drew attention, influencing their interactions with family and friends in ${locale}. These formative experiences laid the foundation for their ${motivationTrait.characteristic}.`.repeat(2)
        },
        {
            title: 'Career',
            content: `As a ${occupation}, ${name} channels their ${psychologicalTrait.characteristic} into their work. ${psychologicalTrait.description} In ${locale}, their career has been shaped by challenges that tested their ${motivationTrait.characteristic}, leading to professional growth and unexpected alliances.`.repeat(3)
        },
        {
            title: 'Personal Life',
            content: `${name}'s personal life in ${locale} reflects their ${physicalTrait.characteristic} and ${psychologicalTrait.characteristic}. ${backgroundTrait.description} Their ${motivationTrait.characteristic} drives their hobbies and relationships, creating a rich tapestry of experiences.`.repeat(2)
        },
        {
            title: 'Beliefs and Motivations',
            content: `Rooted in their ${backgroundTrait.characteristic}, ${name}'s ${motivationTrait.characteristic} defines their worldview. ${motivationTrait.description} In ${locale}, this belief shapes their actions, pushing them to overcome obstacles and pursue their goals with unwavering resolve.`.repeat(2)
        },
        {
            title: 'Defining Moment',
            content: `A pivotal moment for ${name} came when their ${psychologicalTrait.characteristic} collided with a challenge in ${locale}. This event, tied to their ${backgroundTrait.characteristic}, redefined their ${motivationTrait.characteristic}, setting them on a new path that continues to unfold.`.repeat(2)
        }
    ];
    const extendedBio = extendedBioSections.map(s => `<h3>${s.title}</h3><p>${s.content}</p>`).join('');
    // Approximate 1000 words by repeating sections (simplified for demo)

    document.getElementById('shortBioOutput').innerHTML = `<h3>Short Bio</h3><p>${shortBio}</p>`;
    document.getElementById('detailedBioOutput').innerHTML = `<h3>Detailed Bio</h3>${extendedBio}`;
}

// Compare characters
function compareCharacters() {
    const char1Index = document.getElementById('character1').value;
    const char2Index = document.getElementById('character2').value;
    if (char1Index === '' || char2Index === '' || char1Index === char2Index) {
        alert('Please select two different characters.');
        return;
    }

    const char1 = characters[char1Index];
    const char2 = characters[char2Index];
    const commonTraits = char1.traits.filter(t => char2.traits.includes(t));
    const differences = char1.traits.filter(t => !char2.traits.includes(t)).concat(char2.traits.filter(t => !char1.traits.includes(t)));
    const contention = differences.length ? `Potential conflicts arise from differing traits like ${differences.join(' and ')}.` : 'No major points of contention.';
    const transition = `Crossing paths, ${char1.name}'s ${char1.traits[0] || 'nature'} could challenge ${char2.name}'s ${char2.traits[0] || 'outlook'}, potentially shifting their perspectives in ${char1.locale}.`;

    const comparison = `
        <h3>Comparison: ${char1.name} vs ${char2.name}</h3>
        <p><strong>Commonalities:</strong> ${commonTraits.length ? commonTraits.join(', ') : 'None'}</p>
        <p><strong>Points of Contention:</strong> ${contention}</p>
        <p><strong>Transition Points:</strong> ${transition}</p>
    `;
    document.getElementById('comparisonOutput').innerHTML = comparison;
}

// Add new trait
function addTrait() {
    const category = document.getElementById('newTraitCategory').value;
    const characteristic = document.getElementById('newTrait').value;
    const synonyms = document.getElementById('newSynonyms').value.split(',').map(s => s.trim());
    const description = document.getElementById('newDescription').value;

    if (category && characteristic && synonyms.length && description) {
        traits.push({ category, characteristic, synonyms, description });
        displayTraits();
        clearTraitForm();
    } else {
        alert('Please fill in all trait fields.');
    }
}

// Display traits
function displayTraits() {
    const tableBody = document.getElementById('traitTableBody');
    tableBody.innerHTML = '';
    const categories = [...new Set(traits.map(t => t.category))];
    categories.forEach(category => {
        const categoryTraits = traits.filter(t => t.category === category);
        categoryTraits.forEach(trait => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${trait.category}</td>
                <td>${trait.characteristic}</td>
                <td>${trait.synonyms.join(', ')}</td>
                <td>${trait.description}</td>
            `;
            tableBody.appendChild(row);
        });
    });
}

// Display saved characters
function displayCharacters() {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = '';
    characters.forEach((char, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${char.name}</strong>, Age: ${char.age}, Gender: ${char.gender}, Locale: ${char.locale}, Occupation: ${char.occupation}<br>Traits: ${char.traits.join(', ') || 'None'}`;
        characterList.appendChild(div);
    });
    updateCharacterSelects();
    updateEditCharacterSelect();
}

// Update character select dropdowns
function updateCharacterSelects() {
    const select1 = document.getElementById('character1');
    const select2 = document.getElementById('character2');
    select1.innerHTML = '<option value="">Select Character</option>';
    select2.innerHTML = '<option value="">Select Character</option>';
    characters.forEach((char, index) => {
        const option = `<option value="${index}">${char.name}</option>`;
        select1.innerHTML += option;
        select2.innerHTML += option;
    });
}

// Update edit character dropdown
function updateEditCharacterSelect() {
    const editSelect = document.getElementById('editIndex');
    editSelect.innerHTML = '<option value="">Select Character to Edit</option>';
    characters.forEach((char, index) => {
        editSelect.innerHTML += `<option value="${index}">${char.name}</option>`;
    });
}

// Load character data into edit form
function loadCharacterToEdit() {
    const index = document.getElementById('editIndex').value;
    if (index === '') {
        clearEditForm();
        return;
    }
    const char = characters[index];
    document.getElementById('editName').value = char.name;
    document.getElementById('editAge').value = char.age;
    document.getElementById('editGender').value = char.gender;
    document.getElementById('editLocale').value = char.locale;
    document.getElementById('editOccupation').value = char.occupation;
    document.getElementById('editTraits').value = char.traits.join(', ');
}

// Update character
function updateCharacter() {
    const index = document.getElementById('editIndex').value;
    if (index === '') {
        alert('Please select a character to edit.');
        return;
    }
    const name = document.getElementById('editName').value;
    const age = document.getElementById('editAge').value || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const gender = document.getElementById('editGender').value || ['male', 'female', 'non-binary', 'unspecified'][Math.floor(Math.random() * 4)];
    const locale = document.getElementById('editLocale').value || locales[Math.floor(Math.random() * locales.length)];
    const occupation = document.getElementById('editOccupation').value;
    const traitsInput = document.getElementById('editTraits').value;

    if (name && occupation) {
        characters[index] = {
            name,
            age,
            gender,
            locale,
            occupation,
            traits: traitsInput ? traitsInput.split(',').map(t => t.trim()) : []
        };
        localStorage.setItem('characters', JSON.stringify(characters));
        displayCharacters();
        clearEditForm();
    } else {
        alert('Please fill in required fields (Name, Occupation).');
    }
}

// Clear forms
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('locale').value = '';
    document.getElementById('occupation').value = '';
    document.getElementById('traits').value = '';
    document.getElementById('shortBioOutput').innerHTML = '';
    document.getElementById('detailedBioOutput').innerHTML = '';
}
function clearTraitForm() {
    document.getElementById('newTraitCategory').value = 'Physical';
    document.getElementById('newTrait').value = '';
    document.getElementById('newSynonyms').value = '';
    document.getElementById('newDescription').value = '';
}
function clearEditForm() {
    document.getElementById('editIndex').value = '';
    document.getElementById('editName').value = '';
    document.getElementById('editAge').value = '';
    document.getElementById('editGender').value = '';
    document.getElementById('editLocale').value = '';
    document.getElementById('editOccupation').value = '';
    document.getElementById('editTraits').value = '';
}

// Initialize
window.onload = () => {
    displayCharacters();
    showTab('create');
};