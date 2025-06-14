function showTab(tabId) {
    try {
        const tabs = document.querySelectorAll('.tab-content');
        const buttons = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => tab.classList.add('hidden'));
        buttons.forEach(btn => btn.classList.remove('active'));
        const tabElement = document.getElementById(`${tabId}-tab`);
        if (tabElement) {
            tabElement.classList.remove('hidden');
        } else {
            console.warn('Tab element not found:', tabId);
        }
        const buttonElement = document.querySelector(`[data-tab="${tabId}"]`);
        if (buttonElement) {
            buttonElement.classList.add('active');
        }
        console.log('Switched to tab:', tabId);
    } catch (err) {
        console.error('Error switching tabs:', err);
    }
}

function resetApp() {
    try {
        const fields = ['name', 'age', 'gender', 'locale', 'occupation', 'traits'];
        fields.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        const outputs = ['shortBioOutput', 'detailedBioOutput', 'comparisonOutput'];
        outputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.innerHTML = '';
        });
        const exportButton = document.getElementById('exportBioButton');
        if (exportButton) exportButton.disabled = true;
        showTab('create');
        console.log('App reset');
    } catch (err) {
        console.error('Error resetting app:', err);
    }
}

function generateBio() {
    try {
        const name = document.getElementById('name').value || 'Unnamed';
        const age = document.getElementById('age').value || 'Unknown';
        const gender = document.getElementById('gender').value || 'Unknown';
        const locale = document.getElementById('locale').value || 'Unknown';
        const occupation = document.getElementById('occupation').value || 'Unknown';
        const traits = document.getElementById('traits').value || 'None';
        const bio = `${name} is a ${age}-year-old ${gender} ${occupation} from ${locale}. They are characterized by ${traits}.`;
        document.getElementById('shortBioOutput').innerHTML = `<p>${bio}</p>`;
        document.getElementById('exportBioButton').disabled = false;
        console.log('Generated bio:', bio);
    } catch (err) {
        console.error('Error generating bio:', err);
        document.getElementById('shortBioOutput').innerHTML = '<p>Error generating bio.</p>';
    }
}

function exportDetailedBio() {
    try {
        const bio = document.getElementById('shortBioOutput').innerText || 'No bio available';
        const blob = new Blob([bio], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_bio.txt';
        a.click();
        URL.revokeObjectURL(url);
        console.log('Exported bio');
    } catch (err) {
        console.error('Error exporting bio:', err);
    }
}

function compareCharacters() {
    try {
        const char1 = document.getElementById('character1').value;
        const char2 = document.getElementById('character2').value;
        const context1 = document.getElementById('context1').value || 'General';
        const context2 = document.getElementById('context2').value || 'General';
        const comparison = `Comparing ${char1} (${context1}) and ${char2} (${context2}): [Comparison logic placeholder].`;
        document.getElementById('comparisonOutput').innerHTML = `<p>${comparison}</p>`;
        console.log('Compared characters:', { char1, char2, context1, context2 });
    } catch (err) {
        console.error('Error comparing characters:', err);
        document.getElementById('comparisonOutput').innerHTML = '<p>Error comparing characters.</p>';
    }
}

function exportComparisonReport() {
    try {
        const comparison = document.getElementById('comparisonOutput').innerText || 'No comparison available';
        const blob = new Blob([comparison], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'comparison_report.txt';
        a.click();
        URL.revokeObjectURL(url);
        console.log('Exported comparison report');
    } catch (err) {
        console.error('Error exporting comparison:', err);
    }
}

function updateCharacter() {
    try {
        const id = document.getElementById('editSelectIndex').value;
        const character = {
            id: parseInt(id),
            name: document.getElementById('editName').value,
            age: parseInt(document.getElementById('editAge').value),
            gender: document.getElementById('editGender').value,
            locale: document.getElementById('editLocale').value,
            occupation: document.getElementById('editOccupation').value,
            traits: document.getElementById('editTraits').value.split(',').map(t => t.trim())
        };
        saveCharacter(character);
        console.log('Updated character:', character);
    } catch (err) {
        console.error('Error updating character:', err);
    }
}

function exportCharacterReport() {
    try {
        const report = document.getElementById('characterReportContent').innerText || 'No report available';
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_report.txt';
        a.click();
        URL.revokeObjectURL(url);
        console.log('Exported character report');
    } catch (err) {
        console.error('Error exporting report:', err);
    }
}

function closeModal() {
    try {
        const modal = document.getElementById('characterReportModal');
        if (modal) modal.classList.add('hidden');
        console.log('Closed modal');
    } catch (err) {
        console.error('Error closing modal:', err);
    }
}

function randomizeComparison() {
    try {
        randomizeContext('context1');
        randomizeContext('context2');
        console.log('Randomized comparison contexts');
    } catch (err) {
        console.error('Error randomizing comparison:', err);
    }
}

function loadCharacterToEdit(select) {
    try {
        const id = select.value;
        const character = getCharacterById(id);
        if (character) {
            document.getElementById('editName').value = character.name || '';
            document.getElementById('editAge').value = character.age || '';
            document.getElementById('editGender').value = character.gender || '';
            document.getElementById('editLocale').value = character.locale || '';
            document.getElementById('editOccupation').value = character.occupation || '';
            document.getElementById('editTraits').value = (character.traits || []).join(', ');
            console.log('Loaded character for editing:', character);
        }
    } catch (err) {
        console.error('Error loading character to edit:', err);
    }
}

function handleButtonClick(e) {
    const target = e.target;
    e.stopPropagation();
    e.preventDefault();

    console.log(`Click detected: event=${e.type}, tag=${target.tagName}, class=${target.className}, id=${target.id || 'unknown'}, data-tab=${target.getAttribute('data-tab') || 'none'}`);

    let matched = false;

    if (target.matches('.tab-button[data-tab]')) {
        const tabId = target.getAttribute('data-tab');
        showTab(tabId);
        console.log(`Tab button clicked: ${tabId}`);
        matched = true;
    }

    if (target.matches('.trait-bubbles-link')) {
        console.log('Trait Bubbles link clicked');
        matched = true;
    }

    if (target.matches('.reset-app')) {
        resetApp();
        console.log('Reset app link clicked');
        matched = true;
    }

    if (target.matches('.randomize-name, .randomize-btn.randomize-name')) {
        randomizeName();
        console.log('Randomize name clicked');
        matched = true;
    }
    if (target.matches('.randomize-age, .randomize-btn.randomize-age')) {
        randomizeAge();
        console.log('Randomize age clicked');
        matched = true;
    }
    if (target.matches('.randomize-gender, .randomize-btn.randomize-gender')) {
        randomizeGender();
        console.log('Randomize gender clicked');
        matched = true;
    }
    if (target.matches('.randomize-locale, .randomize-btn.randomize-locale')) {
        randomizeLocale();
        console.log('Randomize locale clicked');
        matched = true;
    }
    if (target.matches('.randomize-occupation, .randomize-btn.randomize-occupation')) {
        randomizeOccupation();
        console.log('Randomize occupation clicked');
        matched = true;
    }
    if (target.matches('.randomize-traits, .randomize-btn.randomize-traits')) {
        randomizeTraits();
        console.log('Randomize traits clicked');
        matched = true;
    }
    if (target.matches('.randomize-everything')) {
        randomizeEverything();
        console.log('Randomize everything clicked');
        matched = true;
    }
    if (target.matches('.randomize-context1, .randomize-btn.randomize-context1')) {
        randomizeContext('context1');
        console.log('Randomize context1 clicked');
        matched = true;
    }
    if (target.matches('.randomize-context2, .randomize-btn.randomize-context2')) {
        randomizeContext('context2');
        console.log('Randomize context2 clicked');
        matched = true;
    }
    if (target.matches('.randomize-comparison')) {
        randomizeComparison();
        console.log('Randomize comparison clicked');
        matched = true;
    }

    if (target.matches('.generate-bio')) {
        generateBio();
        console.log('Generate bio clicked');
        matched = true;
    }
    if (target.matches('.save-character')) {
        saveCharacter();
        console.log('Save character clicked');
        matched = true;
    }
    if (target.matches('.export-bio')) {
        exportDetailedBio();
        console.log('Export bio clicked');
        matched = true;
    }
    if (target.matches('.compare-characters')) {
        compareCharacters();
        console.log('Compare characters clicked');
        matched = true;
    }
    if (target.matches('.export-comparison')) {
        exportComparisonReport();
        console.log('Export comparison clicked');
        matched = true;
    }
    if (target.matches('.update-character')) {
        updateCharacter();
        console.log('Update character clicked');
        matched = true;
    }
    if (target.matches('.export-report')) {
        exportCharacterReport();
        console.log('Export report clicked');
        matched = true;
    }
    if (target.matches('.close-modal')) {
        closeModal();
        console.log('Close modal clicked');
        matched = true;
    }
    if (target.matches('.view-report')) {
        console.log('View report clicked');
        matched = true;
    }

    if (!matched && (target.tagName === 'BUTTON' || target.tagName === 'A')) {
        console.warn(`Unmatched click: tag=${target.tagName}, class=${target.className}, id=${target.id || 'unknown'}, data-tab=${target.getAttribute('data-tab') || 'none'}`);
    }
}

let listenersBound = false;

function bindEventListeners() {
    try {
        if (listenersBound) {
            console.log('Event listeners already bound, skipping');
            return;
        }

        document.addEventListener('click', handleButtonClick, { capture: true });

        const editSelect = document.querySelector('.edit-select');
        if (editSelect) {
            editSelect.addEventListener('change', (e) => {
                e.stopPropagation();
                loadCharacterToEdit(e.target);
                console.log('Edit select changed');
            });
        } else {
            console.warn('Edit select not found');
        }

        console.log('Event listeners bound for: click');
        listenersBound = true;
    } catch (err) {
        console.error('Error binding event listeners:', err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        initThemeToggle();
        await loadRandomizationData();
        await loadTraits();
        showTab('create');

        bindEventListeners();

        console.log('Page loaded, initialized create tab and event listeners');
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});