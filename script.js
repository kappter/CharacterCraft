window.onload = async () => {
    await loadRandomizationData();
    await loadTraits();
    initThemeToggle();
    displayCharacters();
    showTab('create');
    console.log('App initialized.');
};