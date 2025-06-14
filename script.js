function showTab(tabId) {
    try {
        const tabs = document.querySelectorAll('.tab-content');
        const buttons = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => tab.classList.add('hidden'));
        buttons.forEach(btn => btn.classList.remove('active'));
        const tabElement = document.getElementById(`${tabId}-tab`);
        if (tabElement) tabElement.classList.remove('hidden');
        const buttonElement = document.querySelector(`button[data-tab="${tabId}"]`);
        if (buttonElement) buttonElement.classList.add('active');
        console.log('Switched to tab:', tabId);
    } catch (err) {
        console.error('Error switching tabs:', err);
    }
}

function resetApp() {
    try {
        const fields = ['name', 'age', 'gender', 'locale', 'occupation', 'traits', 'shortBioOutput', 'detailedBioOutput', 'comparisonOutput'];
        fields.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.tagName === 'INPUT') element.value = '';
                else element.innerHTML = '';
            }
        });
        const exportBioButton = document.getElementById('exportBioButton');
        if (exportBioButton) exportBioButton.disabled = true;
        showTab('create');
        console.log('App reset');
    } catch (err) {
        console.error('Error resetting app:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize theme toggle
        initThemeToggle();
        loadRandomizationData().then(() => loadTraits());
        showTab('create');

        // Tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                if (tabId) showTab(tabId);
            });
        });

        // Reset app link
        const resetLink = document.querySelector('.reset-app');
        if (resetLink) {
            resetLink.addEventListener('click', (e) => {
                e.preventDefault();
                resetApp();
            });
        }

        // Randomize buttons
        const randomizeButtons = {
            '.randomize-name': randomizeName,
            '.randomize-age': randomizeAge,
            '.randomize-gender': randomizeGender,
            '.randomize-locale': randomizeLocale,
            '.randomize-occupation': randomizeOccupation,
            '.randomize-traits': randomizeTraits,
            '.randomize-everything': randomizeEverything,
            '.randomize-context1': () => randomizeContext('context1'),
            '.randomize-context2': () => randomizeContext('context2'),
            '.randomize-comparison': randomizeComparison
        };
        Object.entries(randomizeButtons).forEach(([selector, fn]) => {
            const button = document.querySelector(selector);
            if (button) button.addEventListener('click', fn);
            else console.warn(`Button not found: ${selector}`);
        });

        // Action buttons
        const actionButtons = {
            '.generate-bio': generateBio,
            '.save-character': saveCharacter,
            '.export-bio': exportDetailedBio,
            '.compare-characters': compareCharacters,
            '.export-comparison': exportComparisonReport,
            '.update-character': updateCharacter,
            '.export-report': exportCharacterReport,
            '.close-modal': closeModal
        };
        Object.entries(actionButtons).forEach(([selector, fn]) => {
            const button = document.querySelector(selector);
            if (button) button.addEventListener('click', fn);
            else console.warn(`Button not found: ${selector}`);
        });

        // Edit select
        const editSelect = document.querySelector('.edit-select');
        if (editSelect) {
            editSelect.addEventListener('change', (e) => loadCharacterToEdit(e.target));
        }

        console.log('Page loaded, initialized create tab and event listeners');
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});