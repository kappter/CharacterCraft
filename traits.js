let traits = [];

async function loadTraits() {
    const files = ['physical_traits.csv', 'psychological_traits.csv', 'background_details.csv', 'motivations_beliefs.csv'];
    try {
        for (const file of files) {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to load ${file}: ${response.statusText}`);
            const text = await response.text();
            const parsedTraits = parseCSV(text);
            traits.push(...parsedTraits);
        }
        console.log(`Loaded ${traits.length} traits from CSV files`);
        displayTraits();
    } catch (err) {
        console.error('Error loading traits:', err);
        traits = [
            { category: 'Physical', characteristic: 'tall stature', synonyms: [], description: 'Above average height' },
            { category: 'Psychological', characteristic: 'calm', synonyms: ['composed', 'serene'], description: 'A composed demeanor' }
        ];
        displayTraits();
    }
}

function displayTraits() {
    const tbody = document.getElementById('traitTableBody');
    if (!tbody) {
        console.error('Error: #traitTableBody not found in DOM');
        return;
    }
    tbody.innerHTML = '';
    console.log(`Clearing trait table, preparing to display ${traits.length} traits`);

    if (traits.length === 0) {
        console.warn('No traits available to display');
        tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4">No traits loaded.</td></tr>';
        return;
    }

    traits.forEach((trait, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.category || 'N/A'}</td>
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.characteristic || 'N/A'}</td>
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.synonyms?.join(', ') || ''}</td>
            <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.description || ''}</td>
        `;
        tbody.appendChild(row);
        console.log(`Added trait row ${index + 1}: ${trait.characteristic}`);
    });

    const table = document.getElementById('traitTable');
    if (table.style.display === 'none') {
        console.log('Table was hidden, making visible');
        table.style.display = 'table';
    }
    console.log(`Displayed ${traits.length} traits in table`);
}

function addTrait() {
    const category = document.getElementById('newTraitCategory').value;
    const characteristic = document.getElementById('newTrait').value;
    const synonymsInput = document.getElementById('newSynonyms').value;
    const description = document.getElementById('newDescription').value;

    if (category && characteristic && description) {
        const newTrait = {
            category,
            characteristic,
            synonyms: synonymsInput ? synonymsInput.trim().split(',').map(s => s.trim()) : [],
            description
        };
        traits.push(newTrait);
        console.log('Added new trait:', newTrait);
        displayTraits();
        document.getElementById('newTraitCategory').value = 'Physical';
        document.getElementById('newTrait').value = '';
        document.getElementById('newSynonyms').value = '';
        document.getElementById('newDescription').value = '';
    } else {
        alert('Please fill in all required fields: Category, Characteristic, and Description.');
    }
}

function getRandomTrait(category) {
    const filteredTraits = traits.filter(t => t.category === category);
    return filteredTraits[Math.floor(Math.random() * filteredTraits.length)];
}