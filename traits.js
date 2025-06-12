let traits = [];

async function loadTraits() {
    try {
        const traitFiles = [
            'physical_traits.csv',
            'psychological_traits.csv',
            'heredity_traits.csv',
            'background_traits.csv',
            'motivations_traits.csv'
        ];
        for (const file of traitFiles) {
            const response = await fetch(file);
            const text = await response.text();
            const lines = text.split('\n').slice(1).filter(line => line.trim());
            lines.forEach(line => {
                const [category, characteristic, synonyms, description] = line.split(',').map(item => item.trim());
                traits.push({ category, characteristic, synonyms, description });
            });
        }
        console.log('Loaded', traits.length, 'traits from CSV files');
        if (document.getElementById('traitTableBody')) {
            displayTraits();
        }
    } catch (err) {
        console.error('Error loading traits:', err);
    }
}

function displayTraits() {
    try {
        const tableBody = document.getElementById('traitTableBody');
        if (!tableBody) {
            console.error('#traitTableBody not found in DOM');
            return;
        }
        tableBody.innerHTML = '';
        traits.forEach(trait => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.category}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.characteristic}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.synonyms || ''}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.description || ''}</td>
            `;
            tableBody.appendChild(row);
        });
        console.log('Traits displayed:', traits.length);
    } catch (err) {
        console.error('Error displaying traits:', err);
    }
}

function getRandomTrait(category) {
    try {
        const filteredTraits = traits.filter(t => t.category === category);
        if (filteredTraits.length === 0) return null;
        return filteredTraits[Math.floor(Math.random() * filteredTraits.length)];
    } catch (err) {
        console.error('Error getting random trait:', err);
        return null;
    }
}