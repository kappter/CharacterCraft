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