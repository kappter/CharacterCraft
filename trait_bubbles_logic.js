let selectedTraits = [];
let currentCategory = 'all';

function initializeBubbles(category = 'all') {
    const bubbleContainer = document.getElementById('bubbleContainer');
    if (!bubbleContainer) {
        console.error('Bubble container not found.');
        return;
    }
    bubbleContainer.innerHTML = '';
    const filteredTraits = category === 'all' ? traits : traits.filter(trait => trait.category === category);
    filteredTraits.forEach((trait, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'trait-bubble';
        bubble.textContent = trait.characteristic;
        bubble.dataset.index = traits.indexOf(trait);
        bubble.addEventListener('click', () => toggleTrait(bubble, trait.characteristic));
        if (selectedTraits.includes(trait.characteristic)) {
            bubble.classList.add('selected');
        }
        bubbleContainer.appendChild(bubble);
    });
    console.log(`Trait bubbles initialized for category '${category}': ${filteredTraits.length} traits`);
}

// Filter traits by category
function filterTraits(category) {
    currentCategory = category;
    initializeBubbles(category);
    updateCategoryButtons();
}

// Update active category button
function updateCategoryButtons() {
    document.querySelectorAll('.category-button').forEach(button => {
        button.classList.remove('active');
        if (button.dataset.category === currentCategory) {
            button.classList.add('active');
        }
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
    selectedTraits.length = 0;
    document.querySelectorAll('.trait-bubble').forEach(bubble => bubble.classList.remove('selected'));
    if (!isNaN(charIndex) && charIndex >= 0 && charIndex < characters.length) {
        const char = characters[charIndex];
        char.traits.forEach(trait => {
            const bubble = document.querySelector(`.trait-bubble[data-index="${traits.findIndex(t => t.characteristic === trait)}"]`);
            if (bubble) {
                selectedTraits.push(trait);
                bubble.classList.add('selected');
            }
        });
    }
    console.log('Selected traits updated for character index:', charIndex);
}

// Save selected traits to character
function saveBubbleTraits() {
    const charIndex = parseInt(document.getElementById('bubbleCharacterSelect').value);
    if (isNaN(charIndex) || charIndex < 0 || charIndex >= characters.length) {
        alert('Please select a valid character.');
        return;
    }
    characters[charIndex].traits = selectedTraits.slice();
    localStorage.setItem('characters', JSON.stringify(characters));
    updateCharacterSelects(); // Sync dropdowns
    alert('Traits saved successfully!');
    console.log('Traits saved for character:', characters[charIndex].name);
}

// Update character select dropdown
function updateBubbleCharacterSelect() {
    const select = document.getElementById('bubbleCharacterSelect');
    if (!select) {
        console.error('Bubble character select not found.');
        return;
    }
    select.innerHTML = '<option value="">Select a character</option>';
    characters.forEach((char, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = char.name;
        select.appendChild(option);
    });
    console.log('Bubble character select updated:', characters.length);
}

// Initialize page
async function initTraitBubbles() {
    await loadTraits(); // Ensure traits are loaded
    updateBubbleCharacterSelect(); // Populate dropdown
    initializeBubbles(currentCategory);
    updateSelectedTraits();
    initThemeToggle();
    console.log('Trait Bubbles page initialized.');
}

window.onload = initTraitBubbles;