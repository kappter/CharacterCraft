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
            console.warn(`Tab element not found: ${tabId}-tab`);
        }
        const buttonElement = document.querySelector(`button[data-tab="${tabId}"]`);
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

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize theme toggle
        initThemeToggle();
        loadRandomizationData().then(() => loadTraits());
        showTab('create');

        // Tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            const tabId = button.getAttribute('data-tab');
            if (tabId) {
                button.addEventListener('click', () => {
                    showTab(tabId);
                    console.log(`Tab button clicked: ${tabId}`);
                });
            }
        });
        console.log(`Bound ${tabButtons.length} tab buttons`);

        // Reset app link
        const resetLink = document.querySelector('.reset-app');
        if (resetLink) {
            resetLink.addEventListener('click', (e) => {
                e.preventDefault();
                resetApp();
                console.log('Reset app link clicked');
            });
        }

        // Randomize buttons
        const randomizeButtons = [
            { selector: '.randomize-name', handler: randomizeName },
            { selector: '.randomize-age', handler: randomizeAge },
            { selector: '.randomize-gender', handler: randomizeGender },
            { selector: '.randomize-locale', handler: randomizeLocale },
            { selector: '.randomize-occupation', handler: randomizeOccupation },
            { selector: '.randomize-traits', handler: randomizeTraits },
            { selector: '.randomize-everything', handler: randomizeEverything },
            { selector: '.randomize-context1', handler: () => randomizeContext('context1') },
            { selector: '.randomize-context2', handler: () => randomizeContext('context2') },
            { selector: '.randomize-comparison', handler: randomizeComparison }
        ];
        randomizeButtons.forEach(({ selector, handler }) => {
            const button = document.querySelector(selector);
            if (button) {
                button.addEventListener('click', handler);
                console.log(`Bound ${selector} button`);
            } else {
                console.warn(`Button not found: ${selector}`);
            }
        });

        // Action buttons
        const actionButtons = [
            { selector: '.generate-bio', handler: generateBio },
            { selector: '.save-character', handler: saveCharacter },
            { selector: '.export-bio', handler: exportDetailedBio },
            { selector: '.compare-characters', handler: compareCharacters },
            { selector: '.export-comparison', handler: exportComparisonReport },
            { selector: '.update-character', handler: updateCharacter },
            { selector: '.export-report', handler: exportCharacterReport },
            { selector: '.close-modal', handler: closeModal }
        ];
        actionButtons.forEach(({ selector, handler }) => {
            const button = document.querySelector(selector);
            if (button) {
                button.addEventListener('click', handler);
                console.log(`Bound ${selector} button`);
            } else {
                console.warn(`Button not found: ${selector}`);
            }
        });

        // Edit select
        const editSelect = document.querySelector('.edit-select');
        if (editSelect) {
            editSelect.addEventListener('change', (e) => loadCharacterToEdit(e.target));
            console.log('Bound edit-select');
        } else {
            console.warn('Edit select not found');
        }

        console.log('Page loaded, initialized create tab and event listeners');
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});