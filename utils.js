let randomizationData = {};

async function loadRandomizationData() {
    try {
        const response = await fetch('randomization_data.json');
        randomizationData = await response.json();
        console.log('Randomization data loaded:', randomizationData);
    } catch (err) {
        console.error('Error loading randomization data:', err);
    }
}

function randomizeName() {
    try {
        const first = randomizationData.firstNames[Math.floor(Math.random() * randomizationData.firstNames.length)];
        const last = randomizationData.lastNames[Math.floor(Math.random() * randomizationData.lastNames.length)];
        const fullName = `${first} ${last}`;
        document.getElementById('name').value = fullName;
        console.log('Randomized name:', fullName);
    } catch (err) {
        console.error('Error randomizing name:', err);
    }
}

function randomizeAge() {
    try {
        const range = randomizationData.ageRanges[Math.floor(Math.random() * randomizationData.ageRanges.length)];
        const [min, max] = range.split('-').map(Number);
        const age = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('age').value = age;
        console.log('Randomized age:', age);
    } catch (err) {
        console.error('Error randomizing age:', err);
    }
}

function randomizeGender() {
    try {
        const gender = randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
        document.getElementById('gender').value = gender;
        console.log('Randomized gender:', gender);
    } catch (err) {
        console.error('Error randomizing gender:', err);
    }
}

function randomizeLocale() {
    try {
        const locale = randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
        document.getElementById('locale').value = locale;
        console.log('Randomized locale:', locale);
    } catch (err) {
        console.error('Error randomizing locale:', err);
    }
}

function randomizeOccupation() {
    try {
        const occupation = randomizationData.occupations[Math.floor(Math.random() * randomizationData.occupations.length)];
        document.getElementById('occupation').value = occupation;
        console.log('Randomized occupation:', occupation);
    } catch (err) {
        console.error('Error randomizing occupation:', err);
    }
}

function randomizeTraits() {
    try {
        const numTraits = Math.floor(Math.random() * 3) + 1; // 1-3) + traits
        const shuffledTraits = [...traits].sort(() => 0.5 - Math.random());
        const selected = shuffledTraits.slice(0, numTraits).map(t => t.characteristic);
        document.getElementById('traits').value = selected.join(', ');
        console.log('Randomized traits:', selected);
    } catch (err) {
        console.error('Error randomizing traits:', err);
    }
}

function randomizeEverything() {
    try {
        randomizeName();
        randomizeAge();
        randomizeGender();
        randomizeLocale();
        randomizeOccupation();
        randomizeTraits();
        console.log('Randomized all fields');
    } catch (err) {
        console.error('Error randomizing everything:', err);
    }
}

function randomizeContext(fieldId) {
    try {
        const contexts = ['work', 'family', 'friendship', 'rivalry', 'community', 'school', 'adventure', 'romance'];
        const context = contexts[Math.floor(Math.random() * contexts.length)];
        document.getElementById(fieldId).value = context;
        console.log(`Randomized ${fieldId}:`, context);
    } catch (err) {
        console.error('Error randomizing context:', err);
    }
}

function randomizeComparison() {
    try {
        if (characters.length < 2) {
            alert('Not enough characters to randomize comparison.');
            return;
        }
        const indices = Array.from({ length: characters.length }, (_, i) => i);
        const char1Index = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
        const char2Index = indices[Math.floor(Math.random() * indices.length)];
        document.getElementById('character1').value = char1Index;
        document.getElementById('character2').value = char2Index;
        randomizeContext('context1');
        randomizeContext('context2');
        console.log('Randomized comparison:', char1Index, char2Index);
    } catch (err) {
        console.error('Error randomizing comparison:', err);
    }
}

function initThemeToggle() {
    try {
        const toggleCheckbox = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            toggleCheckbox.checked = true;
        }

        toggleCheckbox.addEventListener('change', () => {
            const newTheme = toggleCheckbox.checked ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            console.log('Theme toggled to:', newTheme);
        });
        console.log('Initialized with theme:', savedTheme);
    } catch (err) {
        console.error('Error initializing theme toggle:', err);
    }
}