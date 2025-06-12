let selectedTraits = [];
let currentPage = 0;
const traitsPerPage = 20;
let currentCategory = '';
let selectedBubbleCharacter = '';

function initializeBubbles() {
    try {
        console.log('Initializing trait bubbles, traits available:', traits.length);
        const categoryContainer = document.getElementById('categoryContainer');
        if (!categoryContainer) {
            console.error('Category container not found.');
            return;
        }
        if (!traits.length) {
            console.error('No traits loaded.');
            categoryContainer.innerHTML = '<p class="text-red-500">No traits available. Please check trait files.</p>';
            return;
        }
        categoryContainer.innerHTML = '';
        const categories = [...new Set(traits.map(t => t.category))];
        console.log('Categories found:', categories);

        categories.forEach(category => {
            if (!currentCategory || currentCategory === category) {
                const categorySection = document.createElement('div');
                categorySection.className = 'category-section mb-4';
                categorySection.innerHTML = `
                    <h3 class="text-lg font-semibold mb-2 cursor-pointer category-toggle bg-blue-100 dark:bg-blue-900 p-2 rounded" data-category="${category}">${category}</h3>
                    <div id="category-${category}" class="category-bubbles flex flex-wrap gap-2 p-2"></div>
                `;
                categoryContainer.appendChild(categorySection);
                initializeCategoryBubbles(category, `category-${category}`);
            }
        });

        setupCategoryToggles();
        updatePagination();
        updateCharacterSelect();
        console.log('Trait bubbles initialized, categories:', categories.length);
    } catch (err) {
        console.error('Error initializing bubbles:', err);
        document.getElementById('categoryContainer').innerHTML = '<p class="text-red-500">Failed to load traits. Please try again.</p>';
    }
}

function initializeCategoryBubbles(category, containerId) {
    try {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found.`);
            return;
        }
        container.innerHTML = '';

        const filteredTraits = traits.filter(t => t.category === category);
        console.log(`Rendering ${filteredTraits.length} traits for category ${category}`);
        const startIndex = currentPage * traitsPerPage;
        const endIndex = Math.min(startIndex + traitsPerPage, filteredTraits.length);
        const paginatedTraits = filteredTraits.slice(startIndex, endIndex);

        paginatedTraits.forEach(trait => {
            const bubble = document.createElement('span');
            bubble.className = `trait-bubble px-3 py-1 rounded-full text-sm cursor-pointer transition ${
                selectedTraits.includes(trait.characteristic) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`;
            bubble.textContent = trait.characteristic;
            bubble.dataset.trait = trait.characteristic;
            bubble.dataset.description = trait.description || 'No description available';
            bubble.addEventListener('click', () => toggleTrait(trait.characteristic, bubble));
            container.appendChild(bubble);
        });

        const bubbles = container.querySelectorAll('.trait-bubble');
        bubbles.forEach(bubble => {
            bubble.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip absolute bg-gray-800 text-white text-sm rounded p-2 max-w-xs';
                tooltip.textContent = bubble.dataset.description;
                document.body.appendChild(tooltip);
                const rect = bubble.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                bubble.tooltip = tooltip;
            });
            bubble.addEventListener('mouseleave', () => {
                if (bubble.tooltip) {
                    bubble.tooltip.remove();
                    bubble.tooltip = null;
                }
            });
        });

        console.log(`Initialized ${paginatedTraits.length} bubbles for category ${category}`);
    } catch (err) {
        console.error(`Error initializing bubbles for ${category}:`, err);
    }
}

function toggleTrait(trait, bubble) {
    try {
        const index = selectedTraits.indexOf(trait);
        if (index === -1) {
            selectedTraits.push(trait);
            bubble.classList.remove('bg-gray-200', 'dark:bg-gray-600', 'text-gray-700', 'dark:text-gray-200', 'hover:bg-gray-300', 'dark:hover:bg-gray-500');
            bubble.classList.add('bg-blue-500', 'text-white');
        } else {
            selectedTraits.splice(index, 1);
            bubble.classList.remove('bg-blue-500', 'text-white');
            bubble.classList.add('bg-gray-200', 'dark:bg-gray-600', 'text-gray-700', 'dark:text-gray-200', 'hover:bg-gray-300', 'dark:hover:bg-gray-500');
        }
        console.log('Toggled trait:', trait, 'Selected traits:', selectedTraits);
    } catch (err) {
        console.error('Error toggling trait:', err);
    }
}

function setupCategoryToggles() {
    try {
        const toggles = document.querySelectorAll('.category-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const category = toggle.dataset.category;
                const container = document.getElementById(`category-${category}`);
                container.classList.toggle('hidden');
                toggle.classList.toggle('bg-blue-100', 'dark:bg-blue-900');
                toggle.classList.toggle('bg-blue-200', 'dark:bg-blue-800');
                console.log(`Toggled category: ${category}`);
            });
        });
    } catch (err) {
        console.error('Error setting up category toggles:', err);
    }
}

function filterByCategory() {
    try {
        const filter = document.getElementById('categoryFilter').value;
        currentCategory = filter;
        currentPage = 0;
        initializeBubbles();
        console.log('Filtered by category:', filter || 'All');
    } catch (err) {
        console.error('Error filtering by category:', err);
    }
}

function updatePagination() {
    try {
        const filteredTraits = currentCategory ? traits.filter(t => t.category === currentCategory) : traits;
        const totalPages = Math.ceil(filteredTraits.length / traitsPerPage);
        
        const pageInfo = document.getElementById('pageInfo');
        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');

        if (pageInfo) pageInfo.textContent = `Page ${currentPage + 1} of ${totalPages || 1}`;
        if (prevButton) prevButton.disabled = currentPage === 0;
        if (nextButton) nextButton.disabled = currentPage >= totalPages - 1;
        console.log('Pagination updated, total pages:', totalPages);
    } catch (err) {
        console.error('Error updating pagination:', err);
    }
}

function previousPage() {
    try {
        if (currentPage > 0) {
            currentPage--;
            initializeBubbles();
            console.log('Navigated to previous page:', currentPage + 1);
        }
    } catch (err) {
        console.error('Error navigating to previous page:', err);
    }
}

function nextPage() {
    try {
        const filteredTraits = currentCategory ? traits.filter(t => t.category === currentCategory) : traits;
        const totalPages = Math.ceil(filteredTraits.length / traitsPerPage);
        if (currentPage < totalPages - 1) {
            currentPage++;
            initializeBubbles();
            console.log('Navigated to next page:', currentPage + 1);
        }
    } catch (err) {
        console.error('Error navigating to next page:', err);
    }
}

function updateCharacterSelect() {
    try {
        const select = document.getElementById('bubbleCharacterSelect');
        if (!select) {
            console.error('Character select not found.');
            return;
        }
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select a character</option>';
        characters.forEach((char, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = char.name;
            select.appendChild(option);
        });
        if (selectedBubbleCharacter && characters[selectedBubbleCharacter]) {
            select.value = selectedBubbleCharacter;
            console.log('Restored character select:', characters[selectedBubbleCharacter].name);
        } else if (currentValue && characters[currentValue]) {
            select.value = currentValue;
            selectedBubbleCharacter = currentValue;
            console.log('Preserved character select:', characters[currentValue].name);
        }
        updateSelectedTraits();
        console.log('Character select updated:', characters.length);
    } catch (err) {
        console.error('Error updating character select:', err);
    }
}

function updateSelectedTraits() {
    try {
        const select = document.getElementById('bubbleCharacterSelect');
        if (select.value === '') {
            selectedTraits = [];
            selectedBubbleCharacter = '';
        } else {
            const char = characters[select.value];
            selectedBubbleCharacter = select.value;
            selectedTraits = [...char.traits];
        }
        initializeBubbles();
        console.log('Updated selected traits:', selectedTraits, 'Selected character:', selectedBubbleCharacter);
    } catch (err) {
        console.error('Error updating selected traits:', err);
    }
}

function saveBubbleTraits() {
    try {
        const select = document.getElementById('bubbleCharacterSelect');
        if (select.value === '') {
            alert('Please select a character to save traits.');
            return;
        }
        const index = select.value;
        characters[index].traits = [...selectedTraits];
        localStorage.setItem('characters', JSON.stringify(characters));
        updateCharacterSelects();
        console.log('Saved traits for character:', characters[index].name, 'Traits:', selectedTraits);
        alert('Traits saved successfully!');
    } catch (err) {
        console.error('Error saving bubble traits:', err);
        alert('Failed to save traits. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Trait Bubbles page loaded, loading data...');
    loadRandomizationData().then(() => {
        loadTraits().then(() => {
            initThemeToggle();
            initializeBubbles();
            console.log('Trait Bubbles initialized');
        });
    });
});