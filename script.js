const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
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
    } else if (className.includes('reset-app')) {
        resetApp();
    } else if (className.includes('randomize-everything')) {
        if (typeof utils.randomizeAllFields === 'function') {
            console.log('Attempting to randomize all fields');
            utils.randomizeAllFields();
            console.log('Randomize all fields completed');
        } else {
            console.error('utils.randomizeAllFields is not a function');
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
        document.querySelector('#shortBioOutput').innerHTML = `${char.name}, a ${char.age}-year-old ${char.gender} ${char.occupation} from ${char.locale}, is characterized by ${char.traits}.`;
        document.querySelector('#exportBioButton').disabled = false;
        console.log('Bio generated:', char);
    } else if (className.includes('save-character')) {
        if (typeof characters.saveCharacter === 'function') characters.saveCharacter();
        switchTab('saved');
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
        if (typeof utils.randomizeName === 'function') {
            console.log('Attempting to randomize name');
            utils.randomizeName();
            console.log('Randomize name completed');
        } else {
            console.error('utils.randomizeName is not a function');
        }
    } else if (className.includes('randomize-age')) {
        if (typeof utils.randomizeAge === 'function') {
            console.log('Attempting to randomize age');
            utils.randomizeAge();
            console.log('Randomize age completed');
        } else {
            console.error('utils.randomizeAge is not a function');
        }
    } else if (className.includes('randomize-gender')) {
        if (typeof utils.randomizeGender === 'function') {
            console.log('Attempting to randomize gender');
            utils.randomizeGender();
            console.log('Randomize gender completed');
        } else {
            console.error('utils.randomizeGender is not a function');
        }
    } else if (className.includes('randomize-locale')) {
        if (typeof utils.randomizeLocale === 'function') {
            console.log('Attempting to randomize locale');
            utils.randomizeLocale();
            console.log('Randomize locale completed');
        } else {
            console.error('utils.randomizeLocale is not a function');
        }
    } else if (className.includes('randomize-occupation')) {
        if (typeof utils.randomizeOccupation === 'function') {
            console.log('Attempting to randomize occupation');
            utils.randomizeOccupation();
            console.log('Randomize occupation completed');
        } else {
            console.error('utils.randomizeOccupation is not a function');
        }
    } else if (className.includes('randomize-traits')) {
        if (typeof traits.randomizeTraits === 'function') {
            console.log('Attempting to randomize traits');
            traits.randomizeTraits();
            console.log('Randomize traits completed');
        } else {
            console.error('traits.randomizeTraits is not a function');
        }
    } else if (className.includes('randomize-context1')) {
        document.querySelector('#context1').value = 'Context A';
    } else if (className.includes('randomize-context2')) {
        document.querySelector('#context2').value = 'Context B';
    } else if (className.includes('trait-bubble')) {
        document.querySelector('#selectedTraits').innerHTML = `Trait: ${event.target.textContent}`;
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