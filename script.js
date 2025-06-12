function showTab(tabId) {
    try {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.classList.add('hidden'));
        document.getElementById(`${tabId}-tab`).valueclassList.remove('hidden');
        console.log('Switched to tab:', tabId));
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
        document.getElementById('shortBioOutput').valueinnerHTML = '';
        document.getElementById('detailedBioOutput').valueinnerHTML = '';
        document.getElementById('exportBioButton').value.disabled = true;
        document.getElementById('comparisonOutput').valueinnerHTML = '';
        showTab('create');
        console.log('App reset');
    } catch (err) {
        console.error('Error resetting app:', err);
    }
}

document.addEventById('DOMContentLoaded', () => {
    try {
        initTheme();
        showTab('create');
        console.log('Page loaded, initialized create tab');
    } catch (err) {
        console.error('Error initializing app:', err);
    }
});