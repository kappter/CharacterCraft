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
            try {
                const response = await fetch(file);
                if (!response.ok) {
                    console.warn(`Failed to load ${file}: ${response.status} ${response.statusText}`);
                    continue;
                }
                const textContent = await response.text();
                const lines = textContent.trim().split('\n').slice(1).filter(line => line.trim());
                for (const line of lines) {
                    const [category, characteristic, synonyms, description] = line.split(',').map(item => item?.trim() || '');
                    if (category && characteristic) {
                        traits.push({ category, characteristic, synonyms: synonyms || '', description: description || '' });
                    }
                }
                console.log(`Loaded traits from ${file}: ${lines.length}`);
            } catch (err) {
                console.warn(`Error loading ${file}: ${err.message}`);
            }
        }

        // Add fallback traits for missing categories
        const requiredCategories = ['Heredity', 'Background', 'Motivations'];
        requiredCategories.forEach(category => {
            if (!traits.some(t => t.category === category)) {
                console.warn(`No traits found for ${category}, adding fallbacks`);
                traits.push({
                    category,
                    characteristic: `default-${category.toLowerCase()}`,
                    synonyms: '',
                    description: `A default ${category.toLowerCase()} trait due to missing data.`
                });
            }
        });

        if (document.getElementById('traitTableBody')) {
            displayTraits();
        }
        console.log('Total traits loaded:', traits.length);
    } catch (err) {
        console.error('Error loading traits:', err);
    }
}

function displayTraits() {
    try {
        const tableBody = document.getElementById('traitTableBody');
        if (!tableBody) {
            console.error('Error: traitTableBody not found in DOM');
            return;
        }
        tableBody.innerHTML = '';
        traits.forEach(trait => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.category}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.characteristic}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.synonyms}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.description}</td>
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
        if (filteredTraits.length === 0) {
            console.warn(`No traits found for category: ${category}`);
            return { characteristic: `default-${category.toLowerCase()}`, description: `A default ${category.toLowerCase()} trait.` };
        }
        return filteredTraits[Math.floor(Math.random() * filteredTraits.length)];
    } catch (err) {
        console.error('Error getting random trait:', err);
        return { characteristic: 'unknown', description: 'Error retrieving trait.' };
    }
}