let characters = JSON.parse(localStorage.getItem('characters')) || [];
let traits = [];

// Predefined locales for randomization
const locales = ['New York', 'Tokyo', 'Rural Midwest', 'London', 'Cape Town'];

// Load traits from CSV
fetch('traits.csv')
    .then(response => response.text())
    .then(data => {
        traits = parseCSV(data);
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

    // Short bio template
    const shortBio = `${name}, a ${age}-year-old ${gender} ${occupation} from ${locale}, embodies ${physicalTrait.characteristic}, ${psychologicalTrait.characteristic}, and a ${backgroundTrait.characteristic}. Their life, shaped by ${locale}'s unique culture, revolves around their work and a personal drive that hints at untold stories waiting to unfold.`;

    // Extended bio template
    const extendedBioSections = [
        {
            title: 'Early Life',
            content: `${name} was born in ${locale}, where their ${backgroundTrait.characteristic} defined their formative years. ${backgroundTrait.description} Growing up, their ${physicalTrait.characteristic} made them stand out, often shaping how others perceived them. Early experiences in ${locale} instilled a sense of purpose that would guide their later choices.`.repeat(2)
        },
        {
            title: 'Career',
            content: `As a ${occupation}, ${name} brings ${psychologicalTrait.characteristic} to their work. ${psychologicalTrait.description} Their professional journey in ${locale} has been marked by challenges that tested their resolve, leading to moments of growth and unexpected opportunities that shaped their career path.`.repeat(3)
        },
        {
            title: 'Personal Life',
            content: `${name}'s personal life is a reflection of their ${physicalTrait.characteristic} and ${psychologicalTrait.characteristic}. In ${locale}, they pursue passions that align with their ${backgroundTrait.characteristic}, forging connections that enrich their story. A pivotal moment came when their ${psychologicalTrait.characteristic} led to a bold decision.`.repeat(2)
        },
        {
            title: 'Beliefs and Motivations',
            content: `Deeply influenced by their ${backgroundTrait.characteristic}, ${name} believes in making a difference in ${locale}. Their ${psychologicalTrait.characteristic} drives them to overcome obstacles, motivated by a desire to leave a lasting impact. This belief shapes their interactions and aspirations.`.repeat(2)
        },
        {
            title: 'Defining Moment',
            content: `A turning point for ${name} came when their ${psychologicalTrait.characteristic} clashed with a challenge in ${locale}. This moment, rooted in their ${backgroundTrait.characteristic}, redefined their path, blending their ${physicalTrait.characteristic} with a renewed sense of purpose that continues to guide them.`.repeat(2)
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

// Clear forms
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('locale').value = '';
    document.getElementById('occupation').value = '';
    document.getElementById('traits').value = '';
}
function clearTraitForm() {
    document.getElementById('newTraitCategory').value = 'Physical';
    document.getElementById('newTrait').value = '';
    document.getElementById('newSynonyms').value = '';
    document.getElementById('newDescription').value = '';
}

// Initialize
window.onload = () => {
    displayCharacters();
    updateCharacterSelects();
};