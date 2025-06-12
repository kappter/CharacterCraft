function showTab(tabId) {
    try {
        // Hide all tab content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.add('hidden'));

        // Remove active class from all tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));

        // Show selected tab content
        const selectedTab = document.getElementById(`${tabId}-tab`);
        if (selectedTab) {
            selectedTab.classList.remove('hidden');
        }

        // Add active class to selected tab button
        const selectedButton = document.querySelector(`button[onclick="showTab('${tabId}')"]`);
        if (selectedButton) {
            selectedButton.classList.add('active');
        }

        // Initialize tab-specific content
        if (tabId === 'traits') {
            displayTraits();
        } else if (tabId === 'saved') {
            displayCharacters();
        } else if (tabId === 'compare') {
            updateCharacterSelects();
        }

        console.log(`Switched to tab: ${tabId}`);
    } catch (err) {
        console.error('Error switching tab:', err);
    }
}

function resetApp() {
    try {
        showTab('create');
        console.log('App reset to Create Character tab');
    } catch (err) {
        console.error('Error resetting app:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        loadRandomizationData().then(() => {
            loadTraits().then(() => {
                initThemeToggle();
                showTab('create');
                displayCharacters();
                updateCharacterSelects();
                console.log('App initialized');
            });
        });
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});