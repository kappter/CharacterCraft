let characters = JSON.parse(localStorage.getItem('characters')) || [];

function generateCharacterBio(character) {
    const { name, age, gender, locale, occupation, traits: userTraits } = character;

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

    return { shortBio, detailedBio: extendedBio };
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
            id: Date.now(),
            name,
            age,
            gender,
            locale,
            occupation,
            traits: traitsInput.trim() ? traitsInput.split(',').map(t => t.trim()) : []
        };
        const { shortBio, detailedBio } = generateCharacterBio(character);
        character.shortBio = shortBio;
        character.detailedBio = detailedBio;

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

    const character = { name, age, gender, locale, occupation, traits: userTraits };
    const { shortBio, detailedBio } = generateCharacterBio(character);

    document.getElementById('shortBioOutput').innerHTML = `<h3 class="text-lg font-semibold mb-2">Short Bio</h3><p>${shortBio}</p>`;
    document.getElementById('detailedBioOutput').innerHTML = `<h3 class="text-lg font-semibold mb-2">Detailed Bio</h3>${detailedBio}`;
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
    const contextElement = document.getElementById('context');
    const context = contextElement && contextElement.value.trim() ? contextElement.value : 'unspecified setting';

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
                .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
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
        div.className = 'p-4 bg-gray-50 dark:bg-gray-700 rounded-md flex justify-between items-center';
        div.innerHTML = `
            <div>
                <strong>${char.name}</strong>, Age: ${char.age}, Gender: ${char.gender}, Locale: ${char.locale}, Occupation: ${char.occupation}<br>
                Traits: ${char.traits.join(', ') || 'None'}
            </div>
            <button onclick="viewCharacterReport(${index})" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm">View Report</button>
        `;
        characterList.appendChild(div);
    });
    updateCharacterSelects();
    updateEditCharacterSelect();
    console.log('Characters displayed:', characters.length);
}

// View character report
function viewCharacterReport(index) {
    const char = characters[index];
    if (!char.detailedBio) {
        const { detailedBio } = generateCharacterBio(char);
        characters[index].detailedBio = detailedBio;
        localStorage.setItem('characters', JSON.stringify(characters));
    }
    document.getElementById('characterReportContent').innerHTML = `
        <h3 class="text-lg font-semibold mb-2">Detailed Bio for ${char.name}</h3>
        ${char.detailedBio}
    `;
    document.getElementById('characterReportModal').classList.remove('hidden');
    console.log('Viewing report for:', char.name);
}

// Export character report
function exportCharacterReport() {
    const modalContent = document.getElementById('characterReportContent').innerHTML;
    if (!modalContent) {
        alert('No report to export.');
        return;
    }
    const name = modalContent.match(/Detailed Bio for ([^<]+)/)?.[1] || 'Character';
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
                ${modalContent}
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

// Close modal
function closeModal() {
    document.getElementById('characterReportModal').classList.add('hidden');
    document.getElementById('characterReportContent').innerHTML = '';
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
    characters.forEach((char, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = char.name;
        select1.appendChild(option.cloneNode(true));
        select2.appendChild(option);
    });
    console.log('Character selects updated:', characters.length);
}

// Update edit character select
function updateEditCharacterSelect() {
    const editSelect = document.getElementById('editSelectIndex');
    if (!editSelect) {
        console.error('Edit character select not found.');
        return;
    }
    editSelect.innerHTML = '<option value="">Select Character to Edit</option>';
    characters.forEach((char, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = char.name;
        editSelect.appendChild(option);
    });
    console.log('Edit character select updated.');
}

// Load character data into edit form
function loadCharacterToEdit(select) {
    const index = select.value;
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
    const index = document.getElementById('editSelectIndex').value;
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

    if (name && occupation.trim()) {
        const character = {
            id: characters[index].id,
            name,
            age,
            gender,
            locale,
            occupation,
            traits: traitsInput.trim() ? traitsInput.split(',').map(t => t.trim()) : []
        };
        const { shortBio, detailedBio } = generateCharacterBio(character);
        character.shortBio = shortBio;
        character.detailedBio = detailedBio;

        characters[index] = character;
        localStorage.setItem('characters', JSON.stringify(characters));
        displayCharacters();
        clearEditForm();
        console.log('Character updated:', name);
    } else {
        alert('Please fill in a name and a valid occupation.');
    }
}