let traits = [];

const csvFiles = [
    './physical_traits.csv',
    './psychological_traits.csv',
    './background_details.csv',
    './motivations_beliefs.csv'
];

// Load all CSV files
async function loadTraits() {
    try {
        const responses = await Promise.all(csvFiles.map(file => 
            fetch(file).then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            }).catch(err => {
                console.error(`Error fetching ${file}:`, err);
                return '';
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

// Get random trait by category
function getRandomTrait(category) {
    const categoryTraits = traits.filter(t => t.category === category);
    return categoryTraits.length ? categoryTraits[Math.floor(Math.random() * categoryTraits.length)] : null;
}