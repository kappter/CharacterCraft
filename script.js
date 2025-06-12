function showTab(tabId) {
    try {
        const tabs = document.querySelectorAll('.tab-content');
        const buttons = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => tab.classList.add('hidden'));
        buttons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tabId}-tab`).classList.remove('hidden');
        document.querySelector(`button[onclick="showTab('${tabId}')"]`)?.classList.add('active');
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
        document.getElementById('traits').value = '';
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
        initThemeToggle();
        loadRandomizationData().then(() => loadTraits());
        showTab('create');
        console.log('Page loaded, initialized create tab');
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});