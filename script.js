let characters = JSON.parse(localStorage.getItem('characters')) || [];
let traits = [];
let randomizationData = {};

// CSV files to load
const csvFiles = [
    './physical_traits.csv',
    './psychological_traits.csv',
    './background_details.csv',
    './motivations_beliefs.csv'
];

// Load randomization data
fetch('./randomization_data.json')
    .then(response => {
        if (!response.ok) {
            console.error(`Failed to load randomization_data.json: ${response.statusText}`);
            throw new Error('Failed to load randomization data');
        }
        return response.json();
    })
    .then(data => {
        randomizationData = data;
        console.log('Randomization data loaded:', randomizationData);
    })
    .catch(err => {
        console.error('Error loading randomization_data.json:', err);
        // Fallback data
        randomizationData = {
            firstNames: ['Alex', 'Sam', 'Taylor', 'Jordan'],
            lastNames: ['Smith', 'Johnson', 'Brown', 'Lee'],
            ageRanges: [{min: 18, max: 80, label: 'Adult'}],
            genders: ['male', 'female', 'non-binary', 'unspecified'],
            locales: ['New York', 'Tokyo', 'London'],
            occupations: ['Writer', 'Engineer', 'Teacher'],
            contexts: ['work', 'family', 'vacation']
        };
    });

// Load all CSV files
Promise.all(csvFiles.map(file => 
    fetch(file)
        .then(response => {
            if (!response.ok) {
                console.error(`Failed to load ${file}: ${response.statusText}`);
                throw new Error(`Failed to load ${file}`);
            }
            return response.text();
        })
        .catch(err => {
            console.error(`Error fetching ${file}:`, err);
            return '';
        })
))
.then(data => {
    data.forEach((csvData, index) => {
        if (csvData) {
            const parsedTraits = parseCSV(csvData);
            traits = traits.concat(parsedTraits);
        }
    });
    if (traits.length === 0) {
        console.warn('No traits loaded; using fallback traits.');
        traits = [
            { category: 'Physical', characteristic: 'average build', synonyms: ['normal physique'], description: 'An unremarkable physique.' },
            { category: 'Psychological', characteristic: 'calm', synonyms: ['composed'], description: 'A composed demeanor.' },
            { category: 'Background', characteristic: 'urban upbringing', synonyms: ['city life'], description: 'Raised in a bustling city.' },
            { category: 'Motivations', characteristic: 'pursuit of truth', synonyms: ['truth-seeking'], description: 'A drive to uncover hidden realities.' }
        ];
    }
    displayTraits();
})
.catch(err => {
    console.error('Error loading CSV files:', err);
});

// Parse CSV data
function parseCSV(data) {
    const rows = data.trim().split('\n').slice(1);
    return rows.map(row => {
        const [category, characteristic, synonyms, description] = row.split(',').map(item => item.trim());
        return { category, characteristic, synonyms: synonyms ? synonyms.split(';') : [], description };
    }).filter(trait => trait.category && trait.characteristic);
}

// Randomization functions
function randomizeName() {
    const first = randomizationData.firstNames[Math.floor(Math.random() * randomizationData.firstNames.length)];
    const last = randomizationData.lastNames[Math.floor(Math.random() * randomizationData.lastNames.length)];
    document.getElementById('name').value = `${first} ${last}`;
}

function randomizeAge() {
    const range = randomizationData.ageRanges[Math.floor(Math.random() * randomizationData.ageRanges.length)];
    const age = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    document.getElementById('age').value = age;
}

function randomizeGender() {
    const gender = randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
    document.getElementById('gender').value = gender;
}

function randomizeLocale() {
    const locale = randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
    document.getElementById('locale').value = locale;
}

function randomizeOccupation() {
    const occupation = randomizationData.occupations[Math.floor(Math.random() * randomizationData.occupations.length)];
    document.getElementById('occupation').value = occupation;
}

function randomizeTraits() {
    const psychTraits = traits.filter(t => t.category === 'Psychological');
    const numTraits = Math.floor(Math.random() * 3) + 1;
    const selectedTraits = [];
    for (let i = 0; i < numTraits && psychTraits.length > 0; i++) {
        const index = Math.floor(Math.random() * psychTraits.length);
        selectedTraits.push(psychTraits[index].characteristic);
        psychTraits.splice(index, 1);
    }
    document.getElementById('traits').value = selectedTraits.join(', ');
}

function randomizeContext() {
    const context = randomizationData.contexts[Math.floor(Math.random() * randomizationData.contexts.length)];
    document.getElementById('context').value = context;
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
    const gender = document.getElementById('gender').value || randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
    const locale = document.getElementById('locale').value || randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
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
        showTab('saved');
    } else {
        alert('Please fill in required fields (Name, Occupation).');
    }
}

// Generate bios
function generateBio() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const gender = document.getElementById('gender').value || randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
    const locale = document.getElementById('locale').value || randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
    const occupation = document.getElementById('occupation').value;
    const userTraits = document.getElementById('traits').value.split(',').map(t => t.trim()).filter(t => t);

    if (!name || !occupation) {
        alert('Please fill in required fields (Name, Occupation) to generate bios.');
        return;
    }

    const physicalTrait = getRandomTrait('Physical') || { characteristic: 'average build', description: 'An unremarkable physique.' };
    const psychologicalTrait = userTraits.length ? { characteristic: userTraits[0], description: 'User-defined trait.' } : getRandomTrait('Psychological') || { characteristic: 'calm', description: 'A composed demeanor.' };
    const backgroundTrait = getRandomTrait('Background') || { characteristic: 'urban upbringing', description: 'Raised in a bustling city.' };
    const motivationTrait = getRandomTrait('Motivations') || { characteristic: 'pursuit of truth', description: 'A drive to uncover hidden realities.' };

    const shortBio = `${name}, a ${age}-year-old ${gender} ${occupation} from ${locale}, is marked by ${physicalTrait.characteristic}, ${psychologicalTrait.characteristic}, and a ${backgroundTrait.characteristic}. Their ${motivationTrait.characteristic} shapes their life in ${locale}, hinting at a story rich with potential and depth.`;

    const extendedBioSections = [
        {
            title: 'Early Life',
            content: `${name} was born in ${locale}, where their ${backgroundTrait.characteristic} set the stage for their early years. ${backgroundTrait.description} Their ${physicalTrait.characteristic} often drew attention, influencing their interactions with family and friends in ${locale}. These formative experiences laid the foundation for their ${motivationTrait.characteristic}.`
        },
        {
            title: 'Career',
            content: `As a ${occupation}, ${name} channels their ${psychologicalTrait.characteristic} into their work. ${psychologicalTrait.description} In ${locale}, their career has been shaped by challenges that tested their ${motivationTrait.characteristic}, leading to professional growth and unexpected alliances.`
        },
        {
            title: 'Personal Life',
            content: `${name}'s personal life in ${locale} reflects their ${physicalTrait.characteristic} and ${psychologicalTrait.characteristic}. ${backgroundTrait.description} Their ${motivationTrait.characteristic} drives their hobbies and relationships, creating a rich tapestry of experiences.`
        },
        {
            title: 'Beliefs and Motivations',
            content: `Rooted in their ${backgroundTrait.characteristic}, ${name}'s ${motivationTrait.characteristic} defines their worldview. ${motivationTrait.description} In ${locale}, this belief shapes their actions, pushing them to overcome obstacles and pursue their goals with unwavering resolve.`
        },
        {
            title: 'Defining Moment',
            content: `A pivotal moment for ${name} came when their ${psychologicalTrait.characteristic} collided with a challenge in ${locale}. This event, tied to their ${backgroundTrait.characteristic}, redefined their ${motivationTrait.characteristic}, setting them on a new path that continues to unfold.`
        }
    ];
    const extendedBio = extendedBioSections.map(s => `<h3 class="text-lg font-semibold mb-2">${s.title}</h3><p>${s.content}</p>`).join('');

    document.getElementById('shortBioOutput').innerHTML = `<h3 class="text-lg font-semibold mb-2">Short Bio</h3><p>${shortBio}</p>`;
    document.getElementById('detailedBioOutput').innerHTML = `<h3 class="text-lg font-semibold mb-2">Detailed Bio</h3>${extendedBio}`;
}

// Compare characters
function compareCharacters() {
    const char1Index = document.getElementById('character1').value;
    const char2Index = document.getElementById('character2').value;
    const context = document.getElementById('context').value || 'unspecified setting';
    if (char1Index === '' || char2Index === '' || char1Index === char2Index) {
        alert('Please select two different characters.');
        return;
    }

    const char1 = characters[char1Index];
    const char2 = characters[char2Index];
    const commonTraits = char1.traits.filter(t => char2.traits.includes(t));
    const differences = char1.traits.filter(t => !char2.traits.includes(t)).concat(char2.traits.filter(t => !char1.traits.includes(t)));

    const contextIntro = `In the context of ${context}, ${char1.name} and ${char2.name} come together, their interactions shaped by their unique traits and the setting.`;
    const commonalities = commonTraits.length 
        ? `Their shared traits, such as ${commonTraits.join(', ')}, foster a connection in ${context}, enabling collaboration or mutual understanding.`
        : `With few shared traits, their bond in ${context} relies on external factors or shared goals.`;
    const contention = differences.length 
        ? `Potential conflicts arise in ${context} from differing traits like ${differences.join(' and ')}, which may spark tension or growth.`
        : `In ${context}, their aligned traits minimize conflict, paving the way for harmony.`;
    const transition = `Within ${context}, ${char1.name}'s ${char1.traits[0] || 'nature'} challenges ${char2.name}'s ${char2.traits[0] || 'outlook'}, potentially reshaping their perspectives or deepening their relationship.`;

    const comparison = `
        <h3 class="text-lg font-semibold mb-2">Comparison: ${char1.name} vs ${char2.name}</h3>
        <p><strong>Context:</strong> ${contextIntro}</p>
        <p><strong>Commonalities:</strong> ${commonalities}</p>
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
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.category}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.characteristic}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.synonyms.join(', ')}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.description}</td>
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
        div.className = 'p-4 bg-gray-50 dark:bg-gray-700 rounded-md';
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
    const gender = document.getElementById('editGender').value || randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
    const locale = document.getElementById('editLocale').value || randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
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

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    console.log(`Theme switched to: ${newTheme}`);
});

// Initialize
window.onload = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    console.log(`Initialized with theme: ${savedTheme}`);
    displayCharacters();
    showTab('create');
};