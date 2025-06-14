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

function bindEventListeners() {
    try {
        // Event delegation for buttons
        document.addEventListener('click', (e) => {
            const target = e.target;
            e.stopPropagation(); // Prevent interference from other scripts

            // Log all clicks for debugging
            if (target.tagName === 'BUTTON' || target.tagName === 'A') {
                console.log(`Click detected on: ${target.tagName}, class: ${target.className}, data-tab: ${target.getAttribute('data-tab')}`);
            }

            // Tab buttons
            if (target.matches('.tab-button[data-tab]')) {
                e.preventDefault();
                const tabId = target.getAttribute('data-tab');
                showTab(tabId);
                console.log(`Tab button clicked: ${tabId}`);
            }

            // Trait Bubbles link
            if (target.matches('.trait-bubbles-link')) {
                console.log('Trait Bubbles link clicked');
                // Allow default navigation to trait_bubbles.html
            }

            // Reset app link
            if (target.matches('.reset-app')) {
                e.preventDefault();
                resetApp();
                console.log('Reset app link clicked');
            }

            // Randomize buttons
            if (target.matches('.randomize-name')) {
                e.preventDefault();
                randomizeName();
                console.log('Randomize name clicked');
            } else if (target.matches('.randomize-age')) {
                e.preventDefault();
                randomizeAge();
                console.log('Randomize age clicked');
            } else if (target.matches('.randomize-gender')) {
                e.preventDefault();
                randomizeGender();
                console.log('Randomize gender clicked');
            } else if (target.matches('.randomize-locale')) {
                e.preventDefault();
                randomizeLocale();
                console.log('Randomize locale clicked');
            } else if (target.matches('.randomize-occupation')) {
                e.preventDefault();
                randomizeOccupation();
                console.log('Randomize occupation clicked');
            } else if (target.matches('.randomize-traits')) {
                e.preventDefault();
                randomizeTraits();
                console.log('Randomize traits clicked');
            } else if (target.matches('.randomize-everything')) {
                e.preventDefault();
                randomizeEverything();
                console.log('Randomize everything clicked');
            } else if (target.matches('.randomize-context1')) {
                e.preventDefault();
                randomizeContext('context1');
                console.log('Randomize context1 clicked');
            } else if (target.matches('.randomize-context2')) {
                e.preventDefault();
                randomizeContext('context2');
                console.log('Randomize context2 clicked');
            } else if (target.matches('.randomize-comparison')) {
                e.preventDefault();
                randomizeComparison();
                console.log('Randomize comparison clicked');
            }

            // Action buttons
            if (target.matches('.generate-bio')) {
                e.preventDefault();
                generateBio();
                console.log('Generate bio clicked');
            } else if (target.matches('.save-character')) {
                e.preventDefault();
                saveCharacter();
                console.log('Save character clicked');
            } else if (target.matches('.export-bio')) {
                e.preventDefault();
                exportDetailedBio();
                console.log('Export bio clicked');
            } else if (target.matches('.compare-characters')) {
                e.preventDefault();
                compareCharacters();
                console.log('Compare characters clicked');
            } else if (target.matches('.export-comparison')) {
                e.preventDefault();
                exportComparisonReport();
                console.log('Export comparison clicked');
            } else if (target.matches('.update-character')) {
                e.preventDefault();
                updateCharacter();
                console.log('Update character clicked');
            } else if (target.matches('.export-report')) {
                e.preventDefault();
                exportCharacterReport();
                console.log('Export report clicked');
            } else if (target.matches('.close-modal')) {
                e.preventDefault();
                closeModal();
                console.log('Close modal clicked');
            }
        });

        // Edit select change event
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

        // Bind event listeners with retries
        bindEventListeners();
        setTimeout(bindEventListeners, 2000); // Retry after 2s
        setTimeout(bindEventListeners, 5000); // Retry after 5s

        console.log('Page loaded, initialized create tab and event listeners');
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});