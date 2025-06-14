let traitsData = [];

async function loadTraits() {
    const traitFiles = [
        'physical_traits.csv',
        'psychological_traits.csv',
        'heredity_traits.csv',
        'background_traits.csv',
        'motivations_traits.csv'
    ];
    for (const file of traitFiles) {
        try {
            const response = await fetch(`https://kappter.github.io/CharacterCraft/${file}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const text = await response.text();
            const parsed = text.split('\n').slice(1).map(row => {
                const [category, characteristic, synonyms, description] = row.split(',');
                return { category, characteristic, synonyms, description };
            });
            traitsData.push(...parsed);
            console.log(`Loaded traits from ${file}:`, parsed.length);
        } catch (err) {
            console.error(`Failed to load ${file}:`, err);
            if (file === 'background_traits.csv') {
                console.warn('No traits found for Background, adding fallbacks');
                traitsData.push({ category: 'Background', characteristic: 'generic background', synonyms: '', description: 'No specific background' });
            }
            if (file === 'motivations_traits.csv') {
                console.warn('No traits found for Motivations, adding fallbacks');
                traitsData.push({ category: 'Motivations', characteristic: 'generic motivation', synonyms: '', description: 'No specific motivation' });
            }
        }
    }
    console.log('Total traits loaded:', traitsData.length);
    displayTraits();
}

function getTraits() {
    return traitsData;
}

async function randomizeTraits() {
    try {
        if (!traitsData || traitsData.length === 0) {
            await loadTraits();
            if (!traitsData.length) throw new Error('No traits available');
        }
        const numTraits = Math.floor(Math.random() * 3) + 1; // 1-3 traits
        const selectedTraits = [];
        const availableTraits = [...traitsData];
        for (let i = 0; i < numTraits && availableTraits.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableTraits.length);
            const trait = availableTraits.splice(randomIndex, 1)[0];
            if (trait && trait.characteristic && !selectedTraits.includes(trait.characteristic)) {
                selectedTraits.push(trait.characteristic);
            }
        }
        document.getElementById('traits').value = selectedTraits.join(', ');
        console.log('Randomized traits:', selectedTraits);
        return selectedTraits;
    } catch (err) {
        console.error('Error randomizing traits:', err);
        document.getElementById('traits').value = '';
        console.log('Randomized traits: []');
        return [];
    }
}

function displayTraits() {
    try {
        const traitTableBody = document.getElementById('traitTableBody');
        if (!traitTableBody) return;
        traitTableBody.innerHTML = '';
        traitsData.forEach(trait => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.category || ''}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.characteristic || ''}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.synonyms || ''}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${trait.description || ''}</td>
            `;
            traitTableBody.appendChild(row);
        });
        console.log('Traits displayed:', traitsData.length);
    } catch (err) {
        console.error('Error displaying traits:', err);
    }
}