// Show tab
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`button[onclick="showTab('${tabId}')"]`)?.classList.add('active');
}

// Reset app
function resetApp() {
    clearForm();
    showTab('create');
    console.log('App reset to home page.');
}

// Clear forms
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('locale').value = '';
    document.getElementById('occupation').value = '';
    document.getElementById('traits').value = '';
    document.getElementById('shortBioOutput').innerHTML = '';
    document.getElementById('detailedBioOutput').innerHTML = '';
    document.getElementById('exportBioButton').disabled = true;
}

function clearTraitForm() {
    document.getElementById('newTraitCategory').value = 'Physical';
    document.getElementById('newTrait').value = '';
    document.getElementById('newSynonyms').value = '';
    document.getElementById('newDescription').value = '';
}

function clearEditForm() {
    document.getElementById('editIndex').value = '';
    document.getElementById('editName').value = '';
    document.getElementById('editAge').value = '';
    document.getElementById('editGender').value = '';
    document.getElementById('editLocale').value = '';
    document.getElementById('editOccupation').value = '';
    document.getElementById('editTraits').value = '';
}