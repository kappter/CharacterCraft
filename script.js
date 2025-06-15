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
    characters.updateCharacterSelects();
    characters.displayCharacters();
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
        utils.randomizeAllFields();
    } else if (className.includes('generate-bio')) {
        const char = {
            name: document.querySelector('#name').value || 'Unknown',
            age: document.querySelector('#age').value || 'Unknown',
            gender: document.querySelector('#gender').value || 'Unknown',
            locale: document.querySelector('#locale').value || 'Unknown',
            occupation: document.querySelector('#occupation').value || 'Unknown',
            traits: document.querySelector('#traits').value || 'Unknown'
        };
        document.querySelector('#shortBioOutput').innerHTML = `${char.name}, a ${char.age}-year-old ${char.gender} ${char.occupation} from ${char.locale}, is characterized by ${char.traits}.`;
        document.querySelector('#exportBioButton').disabled = false;
    } else if (className.includes('save-character')) {
        characters.saveCharacter();
        switchTab('saved');
    } else if (className.includes('export-bio')) {
        const bio = document.querySelector('#shortBioOutput').innerText || 'No bio available';
        const blob = new Blob([bio], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_bio.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('compare-characters')) {
        const char1Id = document.querySelector('#character1').value;
        const char2Id = document.querySelector('#character2').value;
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
        const comparison = document.querySelector('#comparisonOutput').innerText || 'No comparison available';
        const blob = new Blob([comparison], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'comparison_report.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('update-character')) {
        characters.updateCharacter();
    } else if (className.includes('export-report')) {
        const report = document.querySelector('#characterReportContent').innerText || 'No report available';
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
        utils.randomizeName();
    } else if (className.includes('randomize-age')) {
        utils.randomizeAge();
    } else if (className.includes('randomize-gender')) {
        utils.randomizeGender();
    } else if (className.includes('randomize-locale')) {
        utils.randomizeLocale();
    } else if (className.includes('randomize-occupation')) {
        utils.randomizeOccupation();
    } else if (className.includes('randomize-traits')) {
        traits.randomizeTraits();
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
    characters.updateCharacterSelects();
    characters.displayCharacters();
    traits.displayTraits();
    traits.displayTraitBubbles();
    console.log('Event listeners bound for: click');
    console.log('Page loaded, initialized create tab and event listeners');
});