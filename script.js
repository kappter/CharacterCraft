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

function handleButtonClick(e) {
    const target = e.target;
    e.stopPropagation();
    e.preventDefault();

    // Debug log for all clicks
    console.log(`Click detected: event=${e.type}, tag=${target.tagName}, class=${target.className}, id=${target.id || 'unknown'}, data-tab=${target.getAttribute('data-tab') || 'none'}`);

    let matched = false;

    // Tab buttons
    if (target.matches('.tab-button[data-tab]')) {
        const tabId = target.getAttribute('data-tab');
        showTab(tabId);
        console.log(`Tab button clicked: ${tabId}`);
        matched = true;
    }

    // Trait Bubbles link
    if (target.matches('.trait-bubbles-link')) {
        console.log('Trait Bubbles link clicked');
        matched = true; // Allow default navigation
    }

    // Reset app link
    if (target.matches('.reset-app')) {
        resetApp();
        console.log('Reset app link clicked');
        matched = true;
    }

    // Randomize buttons
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

    // Action buttons
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

    // Log unmatched clicks only if no match was found
    if (!matched && (target.tagName === 'BUTTON' || target.tagName === 'A')) {
        console.warn(`Unmatched click: tag=${target.tagName}, class=${target.className}, id=${target.id || 'unknown'}, data-tab=${target.getAttribute('data-tab') || 'none'}`);
    }
}

function bindEventListeners() {
    try {
        // Use only 'click' to trigger on release
        document.addEventListener('click', handleButtonClick, { capture: true });

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

        console.log('Event listeners bound for: click');
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