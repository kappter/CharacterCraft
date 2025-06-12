let characters = JSON.parse(localStorage.getItem('characters')) || [];
let traits = [];
let selectedTraits = [];

// CSV files to load
const csvFiles = [
    './physical_traits.csv',
    './psychological_traits.csv',
    './background_details.csv',
    './motivations_beliefs.csv'
];

// Load all CSV files
Promise.all(csvFiles.map(file => 
    fetch(file)
        .then(response => {
            if (!response.ok) {
                console.error(`Failed to load ${file}: ${response.statusText}`);
                throw new Error(`Failed to load ${file}`);
            }
            return response.text();
        })
        .catch(err => {
            console.error(`Error fetching ${file}:`, err);
            return '';
        })
))
.then(data => {
    data.forEach((csvData, index) => {
        if (csvData) {
            const parsedTraits = parseCSV(csvData);
            traits = traits.concat(parsedTraits);
        }
    });
    if (traits.length === 0) {
        console.warn('No traits loaded; using fallback traits.');
        traits = [
            { category: 'Physical', characteristic: 'average build', synonyms: ['normal physique'], description: 'An unremarkable physique.' },
            { category: 'Psychological', characteristic: 'calm', synonyms: ['composed'], description: 'A composed demeanor.' },
            { category: 'Background', characteristic: 'urban upbringing', synonyms: ['city life'], description: 'Raised in a bustling city.' },
            { category: 'Motivations', characteristic: 'pursuit of truth', synonyms: ['truth-seeking'], description: 'A drive to uncover hidden realities.' }
        ];
    }
    initializeBubbles();
    updateCharacterSelect();
})
.catch(err => console.error('Error loading CSV files:', err));

// Parse CSV data
function parseCSV(data) {
    const rows = data.trim().split('\n').slice(1);
    return rows.map(row => {
        const [category, characteristic, synonyms, description] = row.split(',').map(item => item.trim());
        return { category, characteristic, description, synonyms: [] };
    }).filter(trait => trait.category && trait.characteristic);
}

// Initialize character select
function updateCharacterSelect() {
    const select = document.getElementById('bubbleCharacterSelect');
    select.innerHTML = '<option value="">Select a character</option>';
    characters.forEach((char, index) => {
        select.innerHTML += `<option value="${index}">${char.name}</option>`;
    });
}

// Initialize trait bubbles
function initializeBubbles() {
    const bubbleContainer = document.getElementById('bubbleContainer');
    bubbleContainer.innerHTML = '';
    traits.forEach((trait, index) => {
        const bubbleContainer = document.createElement('div');
        bubble.className = 'trait-bubble';
        bubble.textContent = trait.characteristic;
        bubble.dataset.traitId = index;
        bubble.addEventListener('click', () => toggleTrait(bubble, trait.characteristic));
        bubbleContainer.appendChild(bubble);
    });
}

// Toggle trait selection
function toggleTrait(bubble, trait) {
    const index = selectedTraits.indexOf(trait);
    if (index === -1) {
        selectedTraits.push(trait);
        bubble.classList.add('selected');
    } else {
        selectedTraits.splice(index, 1);
        bubble.classList.remove('selected');
    }
}

// Update selected traits based on character selection
function updateSelectedTraits() {
    const charIndex = parseInt(document.getElementById('bubbleCharacterSelect').value);
    selectedTraits = [];
    document.querySelectorAll('.trait-bubble').forEach(bubble => bubble.classList.remove('selected'));
    if (charIndex >= 0 && charIndex < characters.length) {
        const char = characters[charIndex];
        char.traits.forEach(trait => {
            const bubble = document.querySelector(`.trait-bubble[data-trait-id="${traits.findIndex(t => t.characteristic === trait)}"]`);
            if (bubble) {
                selectedTraits.push(trait);
                bubble.classList.add('selected');
            }
        });
    }
}

// Save selected traits to character
function saveBubbleTraits() {
    const charIndex = parseInt(document.getElementById('bubbleCharacterSelect').value);
    if (isNaN(charIndex) || charIndex < 0 || charIndex >= characters.length) {
        alert('Please select a character.');
        return;
    }
    characters[charIndex].traits = [...selectedTraits];
    localStorage.setItem('characters', JSON.stringify(characters));
    alert('Traits saved successfully!');
}

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.classList.add('theme-transition');
    localStorage.setItem('theme', newTheme);
    console.log(`Theme switched to: ${newTheme}`);
    setTimeout(() => document.body.classList.remove('theme-transition'), 300);
});

// Initialize
window.onload = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    console.log(`Initialized with theme: ${savedTheme}`);
};
</script>