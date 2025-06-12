function showTab(tabId) {
    try {
        const tabs = document.querySelectorAll('.tab-content');
        const buttons = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => tab.classList.add('hidden'));
        buttons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tabId}-tab`).classList.remove('hidden');
        document.querySelector(`button[data-tab="${tabId}"]`)?.classList.add('active');
        console.log('Switched to tab:', tabId);
    } catch (err) {
        console.error('Error switching tabs:', err);
    }
}

function resetApp() {
    try {
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('locale').value = '';
        document.getElementById('occupation').value = '';
        document.getElementById('traits-input').value = '';
        document.getElementById('shortBioOutput').innerHTML = '';
        document.getElementById('detailedBioOutput').innerHTML = '';
        document.getElementById('exportBioButton').disabled = true;
        document.getElementById('comparisonOutput').innerHTML = '';
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
        document.querySelector('.reset-app').addEventListener('click', (e) => {
            e.preventDefault();
            resetApp();
        });

        // Randomize buttons
        document.querySelector('.randomize-name').addEventListener('click', randomizeName);
        document.querySelector('.randomize-age').addEventListener('click', randomizeAge);
        document.querySelector('.randomize-gender').addEventListener('click', randomizeGender);
        document.querySelector('.randomize-locale').addEventListener('click', randomizeLocale);
        document.querySelector('.randomize-occupation').addEventListener('click', randomizeOccupation);
        document.querySelector('.randomize-traits').addEventListener('click', randomizeTraits);
        document.querySelector('.randomize-everything').addEventListener('click', randomizeEverything);
        document.querySelector('.randomize-context1').addEventListener('click', () => randomizeContext('context1'));
        document.querySelector('.randomize-context2').addEventListener('click', () => randomizeContext('context2'));
        document.querySelector('.randomize-comparison').addEventListener('click', randomizeComparison);

        // Action buttons
        document.querySelector('.generate-bio').addEventListener('click', generateBio);
        document.querySelector('.save-character').addEventListener('click', saveCharacter);
        document.querySelector('.export-bio').addEventListener('click', exportDetailedBio);
        document.querySelector('.compare-characters').addEventListener('click', compareCharacters);
        document.querySelector('.export-comparison').addEventListener('click', exportComparisonReport);
        document.querySelector('.update-character').addEventListener('click', updateCharacter);
        document.querySelector('.export-report').addEventListener('click', exportCharacterReport);
        document.querySelector('.close-modal').addEventListener('click', closeModal);

        // Edit select
        document.querySelector('.edit-select').addEventListener('change', (e) => loadCharacterToEdit(e.target));

        console.log('Page loaded, initialized create tab and event listeners');
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});