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
async function loadRandomizationData() {
    try {
        const response = await fetch('./randomization_data.json');
        if (!response.ok) throw new Error(`Failed to load randomization_data.json: ${response.statusText}`);
        randomizationData = await response.json();
        console.log('Randomization data loaded:', randomizationData);
    } catch (err) {
        console.error('Error loading randomization_data.json:', err);
        randomizationData = {
            firstNames: ['Alex', 'Sam', 'Taylor', 'Jordan'],
            lastNames: ['Smith', 'Johnson', 'Brown', 'Lee'],
            ageRanges: [{min: 18, max: 80, label: 'Adult'}],
            genders: ['male', 'female', 'non-binary', 'unspecified'],
            locales: ['New York', 'Tokyo', 'London'],
            occupations: ['Writer', 'Engineer', 'Teacher'],
            contexts: ['work', 'family', 'vacation']
        };
    }
}

// Load all CSV files
async function loadCSVFiles() {
    try {
        const responses = await Promise.all(csvFiles.map(file => 
            fetch(file).then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
        ));
        responses.forEach((csvData, index) => {
            if (csvData) {
                const parsedTraits = parseCSV(csvData);
                traits = traits.concat(parsedTraits);
            }
        });
        console.log(`Loaded ${traits.length} traits from CSV files.`);
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
    } catch (err) {
        console.error('Error loading CSV files:', err);
    }
}

// Parse CSV data
function parseCSV(data) {
    const rows = data.trim().split('\n').slice(1);
    return rows.map(row => {
        const [category, characteristic, synonyms, description] = row.split(',').map(item => item.trim());
        return { 
            category, 
            characteristic, 
            synonyms: synonyms ? synonyms.split(';').map(s => s.trim()) : [], 
            description 
        };
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
    document.querySelector(`button[onclick="showTab('${tabId}')"]`)?.classList.add('active');
}

// Reset app
function resetApp() {
    clearForm();
    showTab('create');
    console.log('App reset to home page.');
}

// Save character
function saveCharacter() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const gender = document.getElementById('gender').value || randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
    const locale = document.getElementById('locale').value || randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
    const occupation = document.getElementById('occupation').value;
    const traitsInput = document.getElementById('traits').value;

    if (name && occupation.trim()) {
        const character = {
            id: Date.now(), // Unique ID for export validation
            name,
            age,
            gender,
            locale,
            occupation,
            traits: traitsInput.trim() ? traitsInput.split(',').map(t => t.trim()) : []
        };
        characters.push(character);
        localStorage.setItem('characters', JSON.stringify(characters));
        displayCharacters();
        updateCharacterSelects();
        document.getElementById('exportBioButton').disabled = false;
        clearForm();
        showTab('saved');
        console.log('Character saved:', character.name);
    } else {
        alert('Please fill in a name and a valid occupation.');
    }
}

// Generate bio
function generateBio() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const gender = document.getElementById('gender').value || randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
    const locale = document.getElementById('locale').value || randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
    const occupation = document.getElementById('occupation').value;
    const userTraits = document.getElementById('traits').value.trim().split(',').map(t => t.trim()).filter(t => t);

    if (!name || !occupation.trim()) {
        alert('Please fill in name and occupation to generate bios.');
        return;
    }

    const physicalTrait = getRandomTrait('Physical') || { characteristic: 'average build', description: 'An unremarkable physique.' };
    const psychologicalTrait = userTraits.length ? { characteristic: userTraits[0], description: 'User-defined trait.' } : getRandomTrait('Psychological') || { characteristic: 'calm', description: 'A composed demeanor.' };
    const backgroundTrait = getRandomTrait('Background') || { characteristic: 'urban upbringing', description: 'Raised in a bustling city.' };
    const motivationTrait = getRandomTrait('Motivations') || { characteristic: 'pursuit of truth', description: 'A drive to uncover hidden realities.' };

    const shortBio = `${name}, a ${age}-year-old ${gender} ${occupation} from ${locale}, is marked by ${physicalTrait.characteristic}, ${psychologicalTrait.characteristic}, and a ${backgroundTrait.characteristic}. Their ${motivationTrait.characteristic} shapes their life in ${locale}.`;

    const extendedBioSections = [
        {
            title: 'Early Life',
            content: `${name} was born in ${locale}, where their ${backgroundTrait.characteristic} set the stage. ${backgroundTrait.description}. Their ${physicalTrait.characteristic} influenced early interactions, laying the foundation for their ${motivationTrait.characteristic}.`
        },
        {
            title: 'Career',
            content: `As a ${occupation}, ${name} channels their ${psychologicalTrait.characteristic} into work. ${psychologicalTrait.description}. In ${locale}, challenges have tested their ${motivationTrait.characteristic}, driving growth.`
        },
        {
            title: 'Personal Life',
            content: `${name}'s life in ${locale} reflects their ${physicalTrait.characteristic} and ${psychologicalTrait.characteristic}. ${backgroundTrait.description}. Their ${motivationTrait.characteristic} shapes relationships.`
        },
        {
            title: 'Beliefs and Motivations',
            content: `Rooted in their ${backgroundTrait.characteristic}, ${name}'s ${motivationTrait.characteristic} defines their worldview. ${motivationTrait.description}. This drives their actions in ${locale}.`
        },
        {
            title: 'Defining Moment',
            content: `A key moment came when ${name}'s ${psychologicalTrait.characteristic} faced a challenge in ${locale}. Tied to their ${backgroundTrait.characteristic}, it redefined their ${motivationTrait.characteristic}.`
        }
    ];
    const extendedBio = extendedBioSections.map(s => `<h3 class="text-lg font-semibold mb-2">${s.title}</h3><p>${s.content}</p>`).join('');

    document.getElementById('shortBioOutput').innerHTML = `<h3 class="text-lg font-semibold mb-2">Short Bio</h3><p>${shortBio}</p>`;
    document.getElementById('detailedBioOutput').innerHTML = `<h3 class="text-lg font-semibold mb-2">Detailed Bio</h3>${extendedBio}`;
}

// Export Detailed Bio as HTML
function exportDetailedBio() {
    const name = document.getElementById('name').value;
    const detailedBioOutput = document.getElementById('detailedBioOutput').innerHTML;

    if (!name || !detailedBioOutput) {
        alert('Please generate a detailed bio before exporting.');
        return;
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Detailed Bio - ${name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f4; color: #333; }
                .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                h1 { text-align: center; color: #2b6cb0; }
                h3 { color: #2b6cb0; margin-top: 20px; }
                p { line-height: 1.6; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Detailed Bio for ${name}</h1>
                ${detailedBioOutput}
            </div>
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detailed_bio_${name.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
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

    const contextIntro = `In the context of ${context}, ${char1.name} and ${char2.name} interact, shaped by their traits and setting.`;
    const commonalities = commonTraits.length 
        ? `Shared traits like ${commonTraits.join(', ')} foster connection in ${context}.`
        : `With few shared traits, their bond in ${context} relies on external factors.`;
    const contention = differences.length 
        ? `Conflicts may arise in ${context} from traits like ${differences.join(' and ')}, sparking tension.`
        : `Aligned traits in ${context} minimize conflict, fostering harmony.`;
    const transition = `${char1.name}'s ${char1.traits[0] || 'nature'} challenges ${char2.name}'s ${char2.traits[0] || 'outlook'} in ${context}, potentially deepening their relationship.`;

    const comparison = `
        <h3 class="text-lg font-semibold mb-2">Comparison: ${char1.name} vs ${char2.name}</h3>
        <p><strong>Context:</strong> ${contextIntro}</p>
        <p><strong>Commonalities:</strong> ${commonalities}</p>
        <p><strong>Contentions:</strong> ${contention}</p>
        <p><strong>Transitions:</strong> ${transition}</p>
    `;
    document.getElementById('comparisonOutput').innerHTML = comparison;
}

// Export Comparison Report as HTML
function exportComparisonReport() {
    const char1Index = document.getElementById('character1').value;
    const char2Index = document.getElementById('character2').value;
    const comparisonOutput = document.getElementById('comparisonOutput').innerHTML;

    if (char1Index === '' || char2Index === '' || !comparisonOutput) {
        alert('Please compare two characters before exporting.');
        return;
    }

    const char1 = characters[char1Index];
    const char2 = characters[char2Index];

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Character Comparison - ${char1.name} vs ${char2.name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f4; color: #333; }
                .container { max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                h1 { text-align: center; color: #2b6cb0; }
                h3 { color: #2b6cb0; margin-top: 20px; }
                p { line-height: 1.6; }
                .character-details { margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Character Comparison Report</h1>
                <div class="character-details">
                    <h3>${char1.name}</h3>
                    <p><strong>Age:</strong> ${char1.age}</p>
                    <p><strong>Gender:</strong> ${char1.gender}</p>
                    <p><strong>Locale:</strong> ${char1.locale}</p>
                    <p><strong>Occupation:</strong> ${char1.occupation}</p>
                    <p><strong>Traits:</strong> ${char1.traits.join(', ') || 'None'}</p>
                </div>
                <div class="character-details">
                    <h3>${char2.name}</h3>
                    <p><strong>Age:</strong> ${char2.age}</p>
                    <p><strong>Gender:</strong> ${char2.gender}</p>
                    <p><strong>Locale:</strong> ${char2.locale}</p>
                    <p><strong>Occupation:</strong> ${char2.occupation}</p>
                    <p><strong>Traits:</strong> ${char2.traits.join(', ') || 'None'}</p>
                </div>
                ${comparisonOutput}
            </div>
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparison_${char1.name.replace(/\s+/g, '_')}_vs_${char2.name.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
}

// Add new trait
function addTrait() {
    const category = document.getElementById('newTraitCategory').value;
    const characteristic = document.getElementById('newTrait').value;
    const synonyms = document.getElementById('newSynonyms').value.split(',').map(s => s.trim()).filter(s => s);
    const description = document.getElementById('newDescription').value;

    if (category && characteristic.trim() && synonyms.length && description.trim()) {
        traits.push({ category, characteristic, synonyms, description });
        displayTraits();
        clearTraitForm();
        console.log('New trait added:', characteristic);
    } else {
        alert('Please fill in all trait fields.');
    }
}

// Display traits
function displayTraits() {
    const tbody = document.getElementById('traitTableBody');
    if (!tbody) {
        console.error('Trait table body not found.');
        return;
    }
    tbody.innerHTML = '';
    const categories = [...new Set(traits.map(t => t.category))];
    categories.forEach(category => {
        const categoryTraits = traits.filter(t => t.category === category);
        categoryTraits.forEach(trait => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.category}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.characteristic}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.synonyms.join(', ')}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.description}</td>
            `;
            tbody.appendChild(tr);
        });
    });
    console.log(`Displayed ${traits.length} traits in table.`);
}

// Display saved characters
function displayCharacters() {
    const characterList = document.getElementById('characterList');
    if (!characterList) {
        console.error('Character list container not found.');
        return;
    }
    characterList.innerHTML = '';
    characters.forEach((char, index) => {
        const div = document.createElement('div');
        div.className = 'p-4 bg-gray-50 dark:bg-gray-700 rounded-md';
        div.innerHTML = `<strong>${char.name}</strong>, Age: ${char.age}, Gender: ${char.gender}, Locale: ${char.locale}, Occupation: ${char.occupation}<br>Traits: ${char.traits.join(', ') || 'None'}`;
        characterList.appendChild(div);
    });
    updateCharacterSelects();
    updateEditCharacterSelect();
    console.log('Characters displayed:', characters.length);
}

// Update character select dropdowns
function updateCharacterSelects() {
    const select1 = document.getElementById('character1');
    const select2 = document.getElementById('character2');
    if (!select1 || !select2) {
        console.error('Character select dropdowns not found.');
        return;
    }
    select1.innerHTML = '<option value="">Select Character</option>';
    select2.innerHTML = '<option value="">Select Character</option>';
    characters.forEach((char => {
        forEach((char, index) => {
            const option = `<option value="${index}">${char.name}</option>`;
            select1.appendChild(option);
            select2.appendChild(option);
        });
    });
    console.log('Character selects updated.');
}

// Update edit character select
function updateEditCharacterSelect() {
    const editSelect = document.getElementById('editIndex');
    if (!editSelect) {
        console.error('Edit character select not found.');
        return;
    }
    edit