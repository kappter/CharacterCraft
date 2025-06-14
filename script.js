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

function bindEventListeners() {
    try {
        // Event delegation for buttons
        document.addEventListener('click', (e) => {
            const target = e.target;

            // Tab buttons
            if (target.matches('.tab-button[data-tab]')) {
                const tabId = target.getAttribute('data-tab');
                showTab(tabId);
                console.log(`Tab button clicked: ${tabId}`);
                e.preventDefault();
            }

            // Reset app link
            if (target.matches('.reset-app')) {
                resetApp();
                console.log('Reset app link clicked');
                e.preventDefault();
            }

            // Randomize buttons
            if (target.matches('.randomize-name')) {
                randomizeName();
                console.log('Randomize name clicked');
            } else if (target.matches('.randomize-age')) {
                randomizeAge();
                console.log('Randomize age clicked');
            } else if (target.matches('.randomize-gender')) {
                randomizeGender();
                console.log('Randomize gender clicked');
            } else if (target.matches('.randomize-locale')) {
                randomizeLocale();
                console.log('Randomize locale clicked');
            } else if (target.matches('.randomize-occupation')) {
                randomizeOccupation();
                console.log('Randomize occupation clicked');
            } else if (target.matches('.randomize-traits')) {
                randomizeTraits();
                console.log('Randomize traits clicked');
            } else if (target.matches('.randomize-everything')) {
                randomizeEverything();
                console.log('Randomize everything clicked');
            } else if (target.matches('.randomize-context1')) {
                randomizeContext('context1');
                console.log('Randomize context1 clicked');
            } else if (target.matches('.randomize-context2')) {
                randomizeContext('context2');
                console.log('Randomize context2 clicked');
            } else if (target.matches('.randomize-comparison')) {
                randomizeComparison();
                console.log('Randomize comparison clicked');
            }

            // Action buttons
            if (target.matches('.generate-bio')) {
                generateBio();
                console.log('Generate bio clicked');
            } else if (target.matches('.save-character')) {
                saveCharacter();
                console.log('Save character clicked');
            } else if (target.matches('.export-bio')) {
                exportDetailedBio();
                console.log('Export bio clicked');
            } else if (target.matches('.compare-characters')) {
                compareCharacters();
                console.log('Compare characters clicked');
            } else if (target.matches('.export-comparison')) {
                exportComparisonReport();
                console.log('Export comparison clicked');
            } else if (target.matches('.update-character')) {
                updateCharacter();
                console.log('Update character clicked');
            } else if (target.matches('.export-report')) {
                exportCharacterReport();
                console.log('Export report clicked');
            } else if (target.matches('.close-modal')) {
                closeModal();
                console.log('Close modal clicked');
            }
        });

        // Edit select change event
        const editSelect = document.querySelector('.edit-select');
        if (editSelect) {
            editSelect.addEventListener('change', (e) => {
                loadCharacterToEdit(e.target);
                console.log('Edit select changed');
            });
        } else {
            console.warn('Edit select not found');
        }

        console.log('Event listeners bound via delegation');
    } catch (err) {
        console.error('Error binding event listeners:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize theme toggle
        initThemeToggle();
        loadRandomizationData().then(() => loadTraits());
        showTab('create');

        // Bind event listeners with retry
        bindEventListeners();
        setTimeout(bindEventListeners, 1000); // Retry after 1s for dynamic DOM

        console.log('Page loaded, initialized create tab and event listeners');
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});