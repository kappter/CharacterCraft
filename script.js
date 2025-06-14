const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const randomizeEverythingButton = document.querySelector('.randomize-everything');
const generateBioButton = document.querySelector('.generate-bio');
const saveCharacterButton = document.querySelector('.save-character');
const exportBioButton = document.querySelector('.export-bio');
const compareCharactersButton = document.querySelector('.compare-characters');
const randomizeComparisonButton = document.querySelector('.randomize-comparison');
const exportComparisonButton = document.querySelector('.export-comparison');
const updateCharacterButton = document.querySelector('.update-character');
const exportReportButton = document.querySelector('.export-report');
const closeModalButton = document.querySelector('.close-modal');
const resetAppButton = document.querySelector('.reset-app');
const traitBubblesLink = document.querySelector('.trait-bubbles-link');
const randomizeNameButton = document.querySelector('.randomize-name');
const randomizeAgeButton = document.querySelector('.randomize-age');
const randomizeGenderButton = document.querySelector('.randomize-gender');
const randomizeLocaleButton = document.querySelector('.randomize-locale');
const randomizeOccupationButton = document.querySelector('.randomize-occupation');
const randomizeTraitsButton = document.querySelector('.randomize-traits');
const randomizeContext1Button = document.querySelector('.randomize-context1');
const randomizeContext2Button = document.querySelector('.randomize-context2');
const themeToggle = document.querySelector('#theme-toggle');

function switchTab(tabId) {
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.add('hidden'));
    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    const activeContent = document.querySelector(`#${tabId}-tab`);
    if (activeTab && activeContent) {
        activeTab.classList.add('active');
        activeContent.classList.remove('hidden');
    }
    console.log(`Switched to tab: ${tabId}`);
}

function resetApp() {
    localStorage.clear();
    switchTab('create');
    document.querySelectorAll('input').forEach(input => input.value = '');
    console.log('App reset');
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

function handleClick(event) {
    const { tagName, className, dataset } = event.target;
    console.log(`Click detected: event=click, tag=${tagName}, class=${className}, id=${event.target.id || 'unknown'}, data-tab=${dataset.tab || 'none'}`);

    if (tagName === 'BUTTON' && dataset.tab) {
        switchTab(dataset.tab);
        console.log(`Tab button clicked: ${dataset.tab}`);
    } else if (className.includes('trait-bubbles-link')) {
        console.log('Trait Bubbles link clicked');
    } else if (className.includes('reset-app')) {
        resetApp();
        console.log('Reset app link clicked');
    } else if (className.includes('randomize-everything')) {
        console.log('Randomize everything clicked');
        if (typeof utils !== 'undefined' && utils.randomizeAllFields) {
            utils.randomizeAllFields();
        } else {
            console.error('utils.randomizeAllFields not available, using fallback');
            document.querySelector('#name').value = 'John Doe';
            document.querySelector('#age').value = 30;
            document.querySelector('#gender').value = 'Male';
            document.querySelector('#locale').value = 'New York';
            document.querySelector('#occupation').value = 'Teacher';
            document.querySelector('#traits').value = 'Friendly';
        }
    } else if (className.includes('generate-bio')) {
        console.log('Generate bio clicked');
        const name = document.querySelector('#name').value || 'Unknown';
        document.querySelector('#shortBioOutput').innerHTML = `${name} is a character. (Placeholder bio)`;
    } else if (className.includes('save-character')) {
        console.log('Save character clicked');
        if (typeof characters !== 'undefined' && characters.saveCharacter) {
            characters.saveCharacter();
            switchTab('saved');
        } else {
            console.error('characters.saveCharacter not available, using fallback');
            const character = {
                id: Date.now(),
                name: document.querySelector('#name').value || 'Unknown',
                age: parseInt(document.querySelector('#age').value) || 0,
                gender: document.querySelector('#gender').value || '',
                locale: document.querySelector('#locale').value || '',
                occupation: document.querySelector('#occupation').value || '',
                traits: document.querySelector('#traits').value || ''
            };
            let saved = JSON.parse(localStorage.getItem('characters') || '[]');
            saved.push(character);
            localStorage.setItem('characters', JSON.stringify(saved));
            document.querySelectorAll('input').forEach(input => input.value = '');
            switchTab('saved');
        }
    } else if (className.includes('export-bio')) {
        console.log('Export bio clicked');
        const bio = document.querySelector('#shortBioOutput').innerText || 'No bio available';
        const blob = new Blob([bio], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_bio.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('compare-characters')) {
        console.log('Compare characters clicked');
        document.querySelector('#comparisonOutput').innerHTML = 'Comparison placeholder';
    } else if (className.includes('randomize-comparison')) {
        console.log('Randomize comparison clicked');
    } else if (className.includes('export-comparison')) {
        console.log('Export comparison clicked');
    } else if (className.includes('update-character')) {
        console.log('Update character clicked');
    } else if (className.includes('export-report')) {
        console.log('Export report clicked');
    } else if (className.includes('close-modal')) {
        console.log('Close modal clicked');
        document.querySelector('#characterReportModal').classList.add('hidden');
    } else if (className.includes('randomize-name')) {
        console.log('Randomize name clicked');
        document.querySelector('#name').value = 'Jane Smith';
    } else if (className.includes('randomize-age')) {
        console.log('Randomize age clicked');
        document.querySelector('#age').value = 25;
    } else if (className.includes('randomize-gender')) {
        console.log('Randomize gender clicked');
        document.querySelector('#gender').value = 'Female';
    } else if (className.includes('randomize-locale')) {
        console.log('Randomize locale clicked');
        document.querySelector('#locale').value = 'London';
    } else if (className.includes('randomize-occupation')) {
        console.log('Randomize occupation clicked');
        document.querySelector('#occupation').value = 'Engineer';
    } else if (className.includes('randomize-traits')) {
        console.log('Randomize traits clicked');
        document.querySelector('#traits').value = 'Creative';
    } else if (className.includes('randomize-context1')) {
        console.log('Randomize context1 clicked');
    } else if (className.includes('randomize-context2')) {
        console.log('Randomize context2 clicked');
    } else {
        console.log(`Unmatched click: class=${className}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    switchTab('create');
    initializeTheme();
    document.addEventListener('click', handleClick);
    themeToggle.addEventListener('change', toggleTheme);
    console.log('Event listeners bound for: click');
    console.log('Page loaded, initialized create tab and event listeners');
});