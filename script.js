const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.querySelector('#theme-toggle');
let isRandomizing = false;

function switchTab(tabId) {
    if (!isRandomizing) {
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.add('hidden'));
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.querySelector(`#${tabId}-tab`);
        if (activeTab && activeContent) {
            activeTab.classList.add('active');
            activeContent.classList.remove('hidden');
            if (tabId === 'saved' && typeof characters.updateCharacterSelects === 'function') {
                characters.updateCharacterSelects();
                console.log('Character selects updated on Saved tab');
            }
        }
        console.log(`Switched to tab: ${tabId}`);
    }
}

function resetApp() {
    if (!isRandomizing) {
        localStorage.clear();
        switchTab('create');
        document.querySelectorAll('input').forEach(input => input.value = '');
        document.querySelector('#shortBioOutput').innerHTML = '';
        document.querySelector('#comparisonOutput').innerHTML = '';
        if (typeof characters.updateCharacterSelects === 'function') {
            characters.updateCharacterSelects();
            console.log('Character selects reset');
        }
        if (typeof characters.displayCharacters === 'function') {
            characters.displayCharacters();
            console.log('Characters display reset');
        }
        console.log('App reset');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.checked = newTheme === 'dark';
    console.log(`Theme toggled to: ${newTheme}`);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    console.log(`Initialized theme: ${savedTheme}`);
}

function parseCSV(csvString) {
    if (typeof Papa !== 'undefined' && Papa.parse) {
        return Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(),
            transform: (value) => value.trim()
        }).data;
    } else {
        console.error('Papa Parse is not loaded or defined');
        return [];
    }
}

function getRandomItem(array) {
    return array.length ? array[Math.floor(Math.random() * array.length)] : { characteristic: 'Unknown', description: '' };
}

function generateDetailedBio(char) {
    const traitsData = parseCSV(loadFileData('traits.csv') || '');
    const motivationsData = parseCSV(loadFileData('motivations_beliefs.csv') || '');
    const physicalTraitsData = parseCSV(loadFileData('physical_traits.csv') || '');
    const backgroundData = parseCSV(loadFileData('background_details.csv') || '');
    const psychologicalData = parseCSV(loadFileData('psychological_traits.csv') || '');

    const physicalTraits = physicalTraitsData.filter(t => t.category === 'Physical' && t.characteristic);
    const psychologicalTraits = psychologicalData.filter(t => t.category === 'Psychological' && t.characteristic);
    const backgrounds = backgroundData.filter(t => t.category === 'Background' && t.characteristic);
    const motivations = motivationsData.filter(t => t.category === 'Motivations' && t.characteristic);

    console.log('Parsed Data:', { physicalTraits, psychologicalTraits, backgrounds, motivations }); // Debug log

    const randomPhysical = getRandomItem(physicalTraits);
    const randomPsychological = getRandomItem(psychologicalTraits);
    const randomBackground = getRandomItem(backgrounds);
    const randomMotivation = getRandomItem(motivations);

    return `
        ${char.name || 'Unknown'}, a ${char.age || 'Unknown'}-year-old ${char.gender || 'Unknown'} ${char.occupation || 'Unknown'} from ${char.locale || 'Unknown'}, carries the weight of a ${randomBackground.characteristic || 'Unknown Background'} (${randomBackground.description || ''}) and is driven by a ${randomMotivation.characteristic || 'Unknown Motivation'} (${randomMotivation.description || ''}). 
        Their ${randomPhysical.characteristic || 'Unknown Trait'} (${randomPhysical.description || ''}) and ${randomPsychological.characteristic || 'Unknown Trait'} (${randomPsychological.description || ''}) shape their presence, complemented by traits like ${char.traits || 'Unknown'}.
    `;
}

function handleClick(event) {
    event.preventDefault(); // Prevent default form submission or reload
    const { tagName, className, dataset } = event.target;
    console.log(`Click detected: event=click, tag=${tagName}, class=${className}, id=${event.target.id || 'unknown'}, data-tab=${dataset.tab || 'none'}`);

    if (tagName === 'BUTTON' && dataset.tab) {
        switchTab(dataset.tab);
    } else if (className.includes('reset-app')) {
        resetApp();
    } else if (className.includes('randomize-everything')) {
        if (typeof utils.randomizeAllFields === 'function' && !isRandomizing) {
            console.log('Attempting to randomize all fields');
            isRandomizing = true;
            utils.randomizeAllFields();
            if (typeof traits.randomizeTraits === 'function') {
                traits.randomizeTraits();
                const traitsInput = document.querySelector('#traits');
                if (traitsInput) traitsInput.value = traits.randomizedTraits ? traits.randomizedTraits.join(', ') : '';
            }
            console.log('Randomize all fields completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeAllFields is not a function or already randomizing');
        }
    } else if (className.includes('generate-bio')) {
        const char = {
            name: document.querySelector('#name')?.value || 'Unknown',
            age: document.querySelector('#age')?.value || 'Unknown',
            gender: document.querySelector('#gender')?.value || 'Unknown',
            locale: document.querySelector('#locale')?.value || 'Unknown',
            occupation: document.querySelector('#occupation')?.value || 'Unknown',
            traits: document.querySelector('#traits')?.value || 'Unknown'
        };
        const bio = generateDetailedBio(char);
        document.querySelector('#shortBioOutput').innerHTML = bio;
        document.querySelector('#exportBioButton').disabled = false;
        console.log('Bio generated:', { char, bio });
    } else if (className.includes('save-character')) {
        if (typeof characters.saveCharacter === 'function') {
            console.log('Attempting to save character');
            characters.saveCharacter();
            console.log('Character save completed');
            switchTab('saved');
        }
    } else if (className.includes('export-bio')) {
        const bio = document.querySelector('#shortBioOutput')?.innerText || 'No bio available';
        const blob = new Blob([bio], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_bio.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('compare-characters')) {
        const char1Id = document.querySelector('#character1')?.value;
        const char2Id = document.querySelector('#character2')?.value;
        const chars = JSON.parse(localStorage.getItem('characters') || '[]');
        const char1 = chars.find(c => c.id == char1Id) || {};
        const char2 = chars.find(c => c.id == char2Id) || {};
        document.querySelector('#comparisonOutput').innerHTML = `
            <p><strong>${char1.name || 'None'}</strong>: ${char1.traits || ''}</p>
            <p><strong>${char2.name || 'None'}</strong>: ${char2.traits || ''}</p>
        `;
    } else if (className.includes('randomize-comparison')) {
        document.querySelector('#context1').value = 'Context A';
        document.querySelector('#context2').value = 'Context B';
    } else if (className.includes('export-comparison')) {
        const comparison = document.querySelector('#comparisonOutput')?.innerText || 'No comparison available';
        const blob = new Blob([comparison], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'comparison_report.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('update-character')) {
        if (typeof characters.updateCharacter === 'function') characters.updateCharacter();
    } else if (className.includes('export-report')) {
        const report = document.querySelector('#characterReportContent')?.innerText || 'No report available';
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_report.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('close-modal')) {
        document.querySelector('#characterReportModal').classList.add('hidden');
    } else if (className.includes('randomize-name')) {
        if (typeof utils.randomizeName === 'function' && !isRandomizing) {
            console.log('Attempting to randomize name');
            isRandomizing = true;
            utils.randomizeName();
            console.log('Randomize name completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeName is not a function or already randomizing');
        }
    } else if (className.includes('randomize-age')) {
        if (typeof utils.randomizeAge === 'function' && !isRandomizing) {
            console.log('Attempting to randomize age');
            isRandomizing = true;
            utils.randomizeAge();
            console.log('Randomize age completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeAge is not a function or already randomizing');
        }
    } else if (className.includes('randomize-gender')) {
        if (typeof utils.randomizeGender === 'function' && !isRandomizing) {
            console.log('Attempting to randomize gender');
            isRandomizing = true;
            utils.randomizeGender();
            console.log('Randomize gender completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeGender is not a function or already randomizing');
        }
    } else if (className.includes('randomize-locale')) {
        if (typeof utils.randomizeLocale === 'function' && !isRandomizing) {
            console.log('Attempting to randomize locale');
            isRandomizing = true;
            utils.randomizeLocale();
            console.log('Randomize locale completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeLocale is not a function or already randomizing');
        }
    } else if (className.includes('randomize-occupation')) {
        if (typeof utils.randomizeOccupation === 'function' && !isRandomizing) {
            console.log('Attempting to randomize occupation');
            isRandomizing = true;
            utils.randomizeOccupation();
            console.log('Randomize occupation completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeOccupation is not a function or already randomizing');
        }
    } else if (className.includes('randomize-traits')) {
        if (typeof traits.randomizeTraits === 'function' && !isRandomizing) {
            console.log('Attempting to randomize traits');
            isRandomizing = true;
            traits.randomizeTraits();
            const traitsInput = document.querySelector('#traits');
            if (traitsInput) traitsInput.value = traits.randomizedTraits ? traits.randomizedTraits.join(', ') : '';
            console.log('Randomize traits completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('traits.randomizeTraits is not a function or already randomizing');
        }
    } else if (className.includes('randomize-context1')) {
        document.querySelector('#context1').value = 'Context A';
    } else if (className.includes('randomize-context2')) {
        document.querySelector('#context2').value = 'Context B';
    } else if (className.includes('trait-bubble')) {
        document.querySelector('#selectedTraits').innerHTML = `Trait: ${event.target.textContent}`;
    } else if (className.includes('generate-report')) {
        const charId = document.querySelector('#characterSelect')?.value;
        const chars = JSON.parse(localStorage.getItem('characters') || '[]');
        const char = chars.find(c => c.id == charId) || {};
        const reportContent = document.querySelector('#characterReportContent');
        if (reportContent && char.id) {
            reportContent.innerHTML = `
                <p><strong>Name:</strong> ${char.name || 'Unknown'}</p>
                <p><strong>Age:</strong> ${char.age || 'Unknown'}</p>
                <p><strong>Gender:</strong> ${char.gender || 'Unknown'}</p>
                <p><strong>Locale:</strong> ${char.locale || 'Unknown'}</p>
                <p><strong>Occupation:</strong> ${char.occupation || 'Unknown'}</p>
                <p><strong>Traits:</strong> ${char.traits || 'Unknown'}</p>
            `;
            document.querySelector('#characterReportModal').classList.remove('hidden');
            console.log('Report generated:', char);
        } else {
            console.error('No character selected or invalid data');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    switchTab('create');
    initializeTheme();
    document.addEventListener('click', handleClick);
    themeToggle.addEventListener('change', toggleTheme);
    if (typeof characters.updateCharacterSelects === 'function') characters.updateCharacterSelects();
    if (typeof characters.displayCharacters === 'function') characters.displayCharacters();
    if (typeof traits.displayTraits === 'function') traits.displayTraits();
    if (typeof traits.displayTraitBubbles === 'function') traits.displayTraitBubbles();
    console.log('Event listeners bound for: click');
    console.log('Page loaded, initialized create tab and event listeners');
});