let characters = JSON.parse(localStorage.getItem('characters')) || [];
let selectedEditCharacter = '';

function generateCharacterBio(character) {
    try {
        const { name, age, gender, locale, traits: userTraits, occupation } = character;

        const physicalTrait = getRandomTrait('Physical') || { characteristic: 'average build', description: 'An unremarkable physique.' };
        const psychologicalTrait = userTraits?.length ? { characteristic: userTraits[0], description: 'User-defined trait.' } : getRandomTrait('Psychological') || { characteristic: 'calm', description: 'A composed demeanor.' };
        const backgroundTrait = getRandomTrait('Background') || { characteristic: 'urban upbringing', description: 'Raised in a bustling city.' };
        const motivationTrait = getRandomTrait('Motivations') || { characteristic: 'pursuit of truth', description: 'A drive to uncover hidden realities.' };

        const shortBio = `${name}, a ${age}-year-old ${gender} from ${locale}, works as ${occupation || 'unemployed'}. They are marked by ${physicalTrait.characteristic}, ${psychologicalTrait.characteristic}, and a ${backgroundTrait.characteristic}. Their ${motivationTrait.characteristic} shapes their life in ${locale}.`;

        const extendedBioSections = [
            {
                title: 'Early Life',
                content: `${name} was born in ${locale}, where their ${backgroundTrait.characteristic} set the stage. ${backgroundTrait.description} Their ${physicalTrait.characteristic} influenced early interactions, laying the foundation for their ${motivationTrait.characteristic}.`
            },
            {
                title: 'Career',
                content: `In ${locale}, ${name} channels their ${psychologicalTrait.characteristic} into their work as ${occupation || 'unemployed'}. ${psychologicalTrait.description} Challenges have tested their ${motivationTrait.characteristic}, driving growth.`
            },
            {
                title: 'Personal Life',
                content: `${name}'s life in ${locale} reflects their ${physicalTrait.characteristic} and ${psychologicalTrait.characteristic}. ${backgroundTrait.description} Their ${motivationTrait.characteristic} shapes relationships.`
            },
            {
                title: 'Beliefs and Motivations',
                content: `Rooted in their ${backgroundTrait.characteristic}, ${name}'s ${motivationTrait.characteristic} defines their worldview. ${motivationTrait.description} This drives their actions in ${locale}.`
            },
            {
                title: 'Defining Moment',
                content: `A key moment came when ${name}'s ${psychologicalTrait.characteristic} faced a challenge in ${locale}. Tied to their ${backgroundTrait.characteristic}, it redefined their ${motivationTrait.characteristic}.`
            }
        ];
        const extendedBio = extendedBioSections.map(s => `<h3 class="text-lg font-semibold mb-2">${s.title}</h3><p>${s.content}</p>`).join('');

        return { shortBio, detailedBio: extendedBio };
    } catch (err) {
        console.error('Error generating bio:', err);
        return { shortBio: '', detailedBio: 'Error generating bio.' };
    }
}

function saveCharacter() {
    try {
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value) || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
        const gender = document.getElementById('gender').value || randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
        const locale = document.getElementById('locale').value || randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
        const occupation = document.getElementById('occupation').value || '';
        const traitsInput = document.getElementById('traits').value;

        if (!name || !occupation.trim()) {
            alert('Please enter a name and a valid occupation.');
            return;
        }

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
        updateEditCharacterSelect();
        document.getElementById('exportBioButton').disabled = false;
        clearForm();
        showTab('saved');
        console.log('Character saved:', character.name);
    } catch (err) {
        console.error('Error saving character:', err);
        alert('Failed to save character. Please try again.');
    }
}

function generateBio() {
    try {
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value) || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
        const gender = document.getElementById('gender').value || randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
        const locale = document.getElementById('locale').value || randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
        const occupation = document.getElementById('occupation').value || '';
        const userTraits = document.getElementById('traits').value.trim().split(',').map(t => t.trim()).filter(t => t);

        if (!name || !occupation.trim()) {
            alert('Please enter a name and occupation.');
            return;
        }

        const character = { name, age, gender, locale, occupation, traits: userTraits };
        const { shortBio, detailedBio } = generateCharacterBio(character);

        document.getElementById('shortBioOutput').innerHTML = `<h3 class="text-lg font-semibold mb-2">Short Bio</h3><p>${shortBio}</p>`;
        document.getElementById('detailedBioOutput').innerHTML = `<h3 class="text-lg font-semibold mb-2">Detailed Bio</h3>${detailedBio}`;
        document.getElementById('exportBioButton').disabled = false;
        console.log('Bio generated for:', name);
    } catch (err) {
        console.error('Error generating bio:', err);
        alert('Failed to generate bio. Please try again.');
    }
}

function exportDetailedBio() {
    try {
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
                    body { font-family: 'Inter', sans-serif; margin: 40px; background-color: #f4f4f4; color: #333; }
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
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `detailed_bio_${name.replace(/\s+/g, '_')}.html`;
        link.click();
        window.URL.revokeObjectURL(url);
        console.log('Detailed bio exported:', name);
    } catch (err) {
        console.error('Error exporting detailed bio:', err);
        alert('Failed to export bio. Please try again.');
    }
}

function compareCharacters() {
    try {
        const char1Index = parseInt(document.getElementById('character1').value);
        const char2Index = parseInt(document.getElementById('character2').value);
        const context1 = document.getElementById('context1').value.trim() || 'unspecified setting';
        const context2 = document.getElementById('context2').value.trim() || '';

        if (isNaN(char1Index) || isNaN(char2Index)) {
            alert('Please select two characters.');
            return;
        }
        if (char1Index === char2Index) {
            alert('Please select two different characters.');
            return;
        }

        const char1 = characters[char1Index];
        const char2 = characters[char2Index];
        const commonTraits = char1.traits.filter(t => char2.traits.includes(t));
        const differences = char1.traits.filter(t => !char2.traits.includes(t)).concat(char2.traits.filter(t => !char1.traits.includes(t)));
        const contexts = [context1];
        if (context2) contexts.push(context2);

        const contextIntro = contexts.map((ctx, i) => `In ${ctx}, ${char1.name} and ${char2.name} interact based on their traits.`).join(' ');
        const commonalities = commonTraits.length
            ? `Shared Traits: ${commonTraits.join(', ')} foster connection across ${contexts.length} context(s): ${contexts.join(', ')}.`
            : `With few shared traits, their connection in ${contexts.join(' and ')} relies on external factors.`;
        const contention = differences.length
            ? `Conflicts may arise from: ${differences.join(', ')}, causing tension in ${contexts.join(' and ')}.`
            : `Aligned traits in ${contexts.join(' and ')} reduce conflicts, promoting harmony.`;
        const transition = `${char1.name}'s ${char1.traits[0] || 'nature'} challenges ${char2.name}'s ${char2.traits[0] || 'outlook'} in ${contexts[0]}, potentially deepening their relationship.`;

        const comparison = `
            <h3 class="text-lg font-semibold mb-2">Comparison: ${char1.name} vs ${char2.name}</h3>
            <p><strong>Context(s):</strong> ${contextIntro}</p>
            <p><strong>Commonalities:</strong> ${commonalities}</p>
            <p><strong>Contentions:</strong> ${contention}</p>
            <p><strong>Transition:</strong> ${transition}</p>
        `;
        document.getElementById('comparisonOutput').innerHTML = comparison;
        console.log('Characters compared:', char1.name, char2.name);
    } catch (err) {
        console.error('Error comparing characters:', err);
        alert('Failed to compare characters.');
    }
}

function exportComparisonReport() {
    try {
        const char1Index = parseInt(document.getElementById('character1').value);
        const char2Index = parseInt(document.getElementById('character2').value);
        const comparisonOutput = document.getElementById('comparisonOutput').innerHTML;

        if (isNaN(char1Index) || isNaN(char2Index) || !comparisonOutput) {
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
                <title>Comparison - ${char1.name} vs ${char2.name}</title>
                <style>
                    body { font-family: 'Inter', sans-serif; margin: 40px; background-color: #f4f4f4; color: #333; }
                    .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    h1 { text-align: center; color: #2b6cb0; }
                    h3 { color: #2b6cb0; margin-top: 20px; }
                    p { line-height: 1.6; }
                    .character-detail { margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Character Comparison Report</h1>
                    <div class="character-detail">
                        <h3>${char1.name}</h3>
                        <p><strong>Age:</strong> ${char1.age}</p>
                        <p><strong>Gender:</strong> ${char1.gender}</p>
                        <p><strong>Locale:</strong> ${char1.locale}</p>
                        <p><strong>Occupation:</strong> ${char1.occupation || 'None'}</p>
                        <p><strong>Traits:</strong> ${char1.traits.join(', ') || 'None'}</p>
                    </div>
                    <div class="character-detail">
                        <h3>${char2.name}</h3>
                        <p><strong>Age:</strong> ${char2.age}</p>
                        <p><strong>Gender:</strong> ${char2.gender}</p>
                        <p><strong>Locale:</strong> ${char2.locale}</p>
                        <p><strong>Occupation:</strong> ${char2.occupation || 'None'}</p>
                        <p><strong>Traits:</strong> ${char2.traits.join(', ') || 'None'}</p>
                    </div>
                    ${comparisonOutput}
                </div>
            </body>
            </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `comparison_${char1.name.replace(/\s+/g, '_')}_vs_${char2.name.replace(/\s+/g, '_')}.html`;
        link.click();
        window.URL.revokeObjectURL(url);
        console.log('Comparison report exported:', char1.name, 'vs', char2.name);
    } catch (err) {
        console.error('Error exporting comparison report:', err);
        alert('Failed to export comparison report. Please try again.');
    }
}

function displayCharacters() {
    try {
        const characterList = document.getElementById('characterList');
        if (!characterList) {
            console.error('Character list container not found.');
            alert('Error: Character list container not found.');
            return;
        }
        characterList.innerHTML = '';
        characters.forEach((char, index) => {
            const div = document.createElement('div');
            div.className = 'p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center';
            div.innerHTML = `
                <div>
                    <strong>${char.name}</strong>, Age: ${char.age}, Gender: ${char.gender}, Locale: ${char.locale}, Occupation: ${char.occupation || 'None'}<br>
                    Traits: ${char.traits.join(', ') || 'None'}
                </div>
                <button class="view-report" data-index="${index}" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">View Report</button>
            `;
            characterList.appendChild(div);
        });
        // Bind view report buttons
        document.querySelectorAll('.view-report').forEach(button => {
            button.addEventListener('click', () => viewCharacterReport(button.getAttribute('data-index')));
        });
        updateCharacterSelects();
        updateEditCharacterSelect();
        console.log('Characters displayed:', characters.length);
    } catch (err) {
        console.error('Error displaying characters:', err);
        alert('Failed to display characters. Please refresh the page.');
    }
}

function viewCharacterReport(index) {
    try {
        const char = characters[index];
        if (!char) {
            console.error('Character not found at index:', index);
            alert('Error: Character not found.');
            return;
        }
        if (!char.detailedBio) {
            const { detailedBio } = generateCharacterBio(char);
            characters[index].detailedBio = detailedBio;
            localStorage.setItem('characters', JSON.stringify(characters));
        }
        const traitsSection = char.traits && char.traits.length > 0 
            ? `<h3 class="text-lg font-semibold mb-2">Personality Traits</h3><p>${char.traits.join(', ')}</p>`
            : `<h3 class="text-lg font-semibold mb-2">Personality Traits</h3><p>No traits assigned.</p>`;
        document.getElementById('characterReportContent').innerHTML = `
            <h3 class="text-lg font-semibold mb-2">Detailed Bio for ${char.name}</h3>
            ${char.detailedBio}
            ${traitsSection}
        `;
        document.getElementById('characterReportModal').classList.remove('hidden');
        console.log('Viewing report for:', char.name);
    } catch (err) {
        console.error('Error viewing character report:', err);
        alert('Failed to display character report. Please try again.');
    }
}

function exportCharacterReport() {
    try {
        const modalContent = document.getElementById('characterReportContent').innerHTML;
        if (!modalContent) {
            alert('No character report content to export.');
            return;
        }
        const name = modalContent.match(/Detailed Bio for ([^<]+)/)?.[1] || 'Character';
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Character Report - ${name}</title>
                <style>
                    body { font-family: 'Inter', sans-serif; margin: 40px; background-color: #f4f4f4; color: #333; }
                    .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    h1 { text-align: center; color: #2b6cb0; }
                    h3 { color: #2b6cb0; margin-top: 20px; }
                    p { line-height: 1.6; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Character Report for ${name}</h1>
                    ${modalContent}
                </div>
            </body>
            </html>
        `;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `character_report_${name.replace(/\s+/g, '_')}.html`;
        link.click();
        window.URL.revokeObjectURL(url);
        console.log('Character report exported:', name);
    } catch (err) {
        console.error('Error exporting character report:', err);
        alert('Failed to export character report. Please try again.');
    }
}

function closeModal() {
    try {
        document.getElementById('characterReportModal').classList.add('hidden');
        document.getElementById('characterReportContent').innerHTML = '';
        console.log('Modal closed');
    } catch (err) {
        console.error('Error closing modal:', err);
    }
}

function updateCharacterSelects() {
    try {
        const select1 = document.getElementById('character1');
        const select2 = document.getElementById('character2');
        if (!select1 || !select2) {
            console.log('Character select dropdowns not found, skipping update');
            return;
        }
        const currentValue1 = select1.value;
        const currentValue2 = select2.value;
        select1.innerHTML = '<option value="">Select Character</option>';
        select2.innerHTML = '<option value="">Select Character</option>';
        characters.forEach((char, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = char.name;
            select1.appendChild(option.cloneNode(true));
            select2.appendChild(option);
        });
        select1.value = currentValue1 && characters[currentValue1] ? currentValue1 : '';
        select2.value = currentValue2 && characters[currentValue2] ? currentValue2 : '';
        console.log('Character selects updated:', characters.length);
    } catch (err) {
        console.error('Error updating character selects:', err);
    }
}

function updateEditCharacterSelect() {
    try {
        const editSelect = document.getElementById('editSelectIndex');
        if (!editSelect) {
            console.error('Edit character select not found.');
            return;
        }
        const currentValue = editSelect.value;
        editSelect.innerHTML = '<option value="">Select Character to Edit</option>';
        characters.forEach((char, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = char.name;
            editSelect.appendChild(option);
        });
        editSelect.value = currentValue && characters[currentValue] ? currentValue : '';
        console.log('Edit character select updated:', characters.length);
    } catch (err) {
        console.error('Error updating edit character select:', err);
    }
}

function loadCharacterToEdit(select) {
    try {
        const index = parseInt(select.value);
        selectedEditCharacter = index;
        if (isNaN(index)) {
            clearEditForm();
            return;
        }
        const char = characters[index];
        if (!char) {
            console.error('Character not found at index:', index);
            alert('Error: Character not found to load for edit.');
            return;
        }
        document.getElementById('editName').value = char.name;
        document.getElementById('editAge').value = char.age;
        document.getElementById('editGender').value = char.gender;
        document.getElementById('editLocale').value = char.locale;
        document.getElementById('editOccupation').value = char.occupation || '';
        document.getElementById('editTraits').value = char.traits.join(', ') || '';
        document.getElementById('editSelectIndex').value = index;
        console.log('Loaded character for edit:', char.name);
    } catch (err) {
        console.error('Error loading character to edit:', err);
    }
}

function updateCharacter() {
    try {
        const index = parseInt(document.getElementById('editSelectIndex').value);
        if (isNaN(index) || !characters[index]) {
            alert('Please select a valid character to edit.');
            console.error('Invalid character index:', index);
            return;
        }

        const name = document.getElementById('editName').value.trim();
        const age = parseInt(document.getElementById('editAge').value) || Math.floor(Math.random() * (80 - 18 + 1)) + 18;
        const gender = document.getElementById('editGender').value || randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
        const locale = document.getElementById('editLocale').value || randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
        const occupation = document.getElementById('editOccupation').value || '';
        const traitsInput = document.getElementById('editTraits').value;

        if (!name || !occupation.trim()) {
            alert('Please enter a valid name and occupation.');
            console.log('Invalid name or occupation:', name, occupation);
            return;
        }

        const character = {
            id: characters[index].id,
            name,
            age,
            gender,
            locale,
            occupation,
            traits: traitsInput.trim() ? traitsInput.split(',').map(t => t.trim()) : []
        };

        try {
            const { shortBio, detailedBio } = generateCharacterBio(character);
            character.shortBio = shortBio;
            character.detailedBio = detailedBio;
        } catch (bioErr) {
            console.error('Error generating bio for updated character:', bioErr);
            alert('Failed to generate bio for updated character.');
            return;
        }

        characters[index] = character;
        localStorage.setItem('characters', JSON.stringify(characters));
        displayCharacters();
        updateCharacterSelects();
        clearEditForm();
        console.log('Character updated:', name);
    } catch (err) {
        console.error('Error updating character:', err);
        alert('Failed to update character. Please try again.');
    }
}

function clearEditForm() {
    try {
        selectedEditCharacter = '';
        document.getElementById('editSelectIndex').value = '';
        document.getElementById('editName').value = '';
        document.getElementById('editAge').value = '';
        document.getElementById('editGender').value = '';
        document.getElementById('editLocale').value = '';
        document.getElementById('editOccupation').value = '';
        document.getElementById('editTraits').value = '';
        console.log('Edit form cleared');
    } catch (err) {
        console.error('Error clearing edit form:', err);
    }
}

function clearForm() {
    try {
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('locale').value = '';
        document.getElementById('occupation').value = '';
        document.getElementById('traits').value = '';
        document.getElementById('shortBioOutput').innerHTML = '';
        document.getElementById('detailedBioOutput').innerHTML = '';
        document.getElementById('exportBioButton').disabled = true;
        console.log('Character creation form cleared');
    } catch (err) {
        console.error('Error clearing form:', err);
    }
}

// Initialize displayCharacters on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        displayCharacters();
        console.log('Characters initialized on page load');
    } catch (err) {
        console.error('Error initializing characters:', err);
    }
});