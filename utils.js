let randomizationData = {};

// Parse CSV data
function parseCSV(data) {
    const rows = data.trim().split('\n').slice(1);
    return rows.map(row => {
        const [category, characteristic, synonyms, description] = row.split(',').map(item => item.trim());
        return { 
            category, 
            characteristic, 
            synonyms: synonyms ? synonyms.split(';').map(s => s.trim()) : [], 
            description 
        };
    }).filter(trait => trait.category && trait.characteristic);
}

// Load randomization data
async function loadRandomizationData() {
    try {
        const response = await fetch('./randomization_data.json');
        if (!response.ok) throw new Error(`Failed to load randomization_data.json: ${response.statusText}`);
        randomizationData = await response.json();
        console.log('Randomization data loaded:', randomizationData);
    } catch (err) {
        console.error('Error loading randomization_data.json:', err);
        randomizationData = {
            firstNames: ['Alex', 'Sam', 'Taylor', 'Jordan'],
            lastNames: ['Smith', 'Johnson', 'Brown', 'Lee'],
            ageRanges: [{min: 18, max: 80, label: 'Adult'}],
            genders: ['male', 'female', 'non-binary', 'unspecified'],
            locales: ['New York', 'Tokyo', 'London'],
            occupations: ['Writer', 'Engineer', 'Teacher'],
            contexts: ['work', 'family', 'vacation']
        };
    }
}

// Randomization functions
function randomizeName() {
    const first = randomizationData.firstNames[Math.floor(Math.random() * randomizationData.firstNames.length)];
    const last = randomizationData.lastNames[Math.floor(Math.random() * randomizationData.lastNames.length)];
    document.getElementById('name').value = `${first} ${last}`;
}

function randomizeAge() {
    const range = randomizationData.ageRanges[Math.floor(Math.random() * randomizationData.ageRanges.length)];
    const age = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    document.getElementById('age').value = age;
}

function randomizeGender() {
    const gender = randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
    document.getElementById('gender').value = gender;
}

function randomizeLocale() {
    const locale = randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
    document.getElementById('locale').value = locale;
}

function randomizeOccupation() {
    const occupation = randomizationData.occupations[Math.floor(Math.random() * randomizationData.occupations.length)];
    document.getElementById('occupation').value = occupation;
}

function randomizeTraits() {
    const psychTraits = traits.filter(t => t.category === 'Psychological' || t.category === 'Heredity');
    const numTraits = Math.floor(Math.random() * 3) + 1;
    const selectedTraits = [];
    for (let i = 0; i < numTraits && psychTraits.length > 0; i++) {
        const index = Math.floor(Math.random() * psychTraits.length);
        selectedTraits.push(psychTraits[index].characteristic);
        psychTraits.splice(index, 1);
    }
    document.getElementById('traits').value = selectedTraits.join(', ');
}

function randomizeContext() {
    const context = randomizationData.contexts[Math.floor(Math.random() * randomizationData.contexts.length)];
    document.getElementById('context').value = context;
}

// Dark mode toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            document.body.classList.add('theme-transition');
            localStorage.setItem('theme', newTheme);
            console.log(`Theme switched to: ${newTheme}`);
            setTimeout(() => document.body.classList.remove('theme-transition'), 300);
        });
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
        console.log(`Initialized with theme: ${savedTheme}`);
    }
}