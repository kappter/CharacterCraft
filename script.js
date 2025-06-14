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
    const currentTheme = document.documentElement.getAttribute('data-theme');
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
        // Assume utils.randomizeAllFields exists
        utils.randomizeAllFields();
    } else if (className.includes('generate-bio')) {
        console.log('Generate bio clicked');
        // Placeholder for bio generation
    } else if (className.includes('save-character')) {
        console.log('Save character clicked');
        // Assume characters.saveCharacter exists
        characters.saveCharacter();
        switchTab('saved');
    } else if (className.includes('export-bio')) {
        console.log('Export bio clicked');
        // Placeholder for export
    } else if (className.includes('compare-characters')) {
        console.log('Compare characters clicked');
        // Placeholder for comparison
    } else if (className.includes('randomize-comparison')) {
        console.log('Randomize comparison clicked');
        // Placeholder for randomize comparison
    } else if (className.includes('export-comparison')) {
        console.log('Export comparison clicked');
        // Placeholder for export comparison
    } else if (className.includes('update-character')) {
        console.log('Update character clicked');
        // Placeholder for update character
    } else if (className.includes('export-report')) {
        console.log('Export report clicked');
        // Placeholder for export report
    } else if (className.includes('close-modal')) {
        console.log('Close modal clicked');
        document.querySelector('#characterReportModal').classList.add('hidden');
    } else if (className.includes('randomize-name')) {
        console.log('Randomize name clicked');
        // Assume utils.randomizeName exists
        utils.randomizeName();
    } else if (className.includes('randomize-age')) {
        console.log('Randomize age clicked');
        // Assume utils.randomizeAge exists
        utils.randomizeAge();
    } else if (className.includes('randomize-gender')) {
        console.log('Randomize gender clicked');
        // Assume utils.randomizeGender exists
        utils.randomizeGender();
    } else if (className.includes('randomize-locale')) {
        console.log('Randomize locale clicked');
        // Assume utils.randomizeLocale exists
        utils.randomizeLocale();
    } else if (className.includes('randomize-occupation')) {
        console.log('Randomize occupation clicked');
        // Assume utils.randomizeOccupation exists
        utils.randomizeOccupation();
    } else if (className.includes('randomize-traits')) {
        console.log('Randomize traits clicked');
        // Assume traits.randomizeTraits exists
        traits.randomizeTraits();
    } else if (className.includes('randomize-context1')) {
        console.log('Randomize context1 clicked');
        // Placeholder for randomize context1
    } else if (className.includes('randomize-context2')) {
        console.log('Randomize context2 clicked');
        // Placeholder for randomize context2
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