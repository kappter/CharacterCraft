import { utils } from './utils.js';
import { characters } from './characters.js';
import { traits } from './traits.js';

const tabs = document.querySelectorAll('nav a');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.querySelector('#themeToggle');
let isRandomizing = false;

function bindEventListeners() {
    const buttons = document.querySelectorAll('button');
    console.log('Attempting to bind listeners to', buttons.length, 'buttons');
    if (buttons.length === 0) {
        console.error('No buttons found in DOM for event listeners');
        return;
    }
    buttons.forEach((button, index) => {
        button.addEventListener('click', handleClick);
        console.log(`Bound listener to button ${index}:`, button.className, button.id);
    });
    console.log('Event listeners bound for: click');
}

function handleClick(e) {
    e.preventDefault();
    const { tagName, className, id, dataset } = e.target;
    console.log(`Click detected: event=click, tag=${tagName}, class=${className}, id=${id || 'unknown'}, data-tab=${dataset.tab || 'none'}`);

    if (tagName === 'BUTTON' && dataset.tab) {
        switchTab(dataset.tab);
    } else if (className.includes('randomize-everything')) {
        if (typeof utils.randomizeAllFields === 'function' && !isRandomizing) {
            console.log('Randomizing all fields...');
            isRandomizing = true;
            try {
                utils.randomizeAllFields();
                const inputs = document.querySelectorAll('#create input[readonly]');
                inputs.forEach(input => {
                    if (input.id === 'traits' && typeof traits.randomizeTraits === 'function') {
                        traits.randomizeTraits();
                        input.value = traits.randomizedTraits?.join(', ') || 'No traits';
                    } else if (input.id) {
                        input.value = document.querySelector(`#${input.id}`).value || 'Not set';
                    }
                });
                console.log('Randomization completed, inputs updated');
            } catch (error) {
                console.error('Randomization failed:', error);
            } finally {
                setTimeout(() => { isRandomizing = false; }, 1500);
            }
        }
    } else if (className.includes('save-character')) {
        if (typeof characters.saveCharacter === 'function') {
            characters.saveCharacter();
            console.log('Character saved');
        }
    }
}

function switchTab(tabId) {
    tabContents.forEach(content => {
        content.style.display = content.id === tabId ? 'block' : 'none';
    });
    console.log(`Switched to tab: ${tabId}`);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initialized create tab and event listeners');
    bindEventListeners();
    setTimeout(() => {
        console.log('Retrying event listener binding...');
        bindEventListeners();
    }, 500);
    tabs.forEach(tab => tab.addEventListener('click', (e) => { e.preventDefault(); switchTab(tab.dataset.tab); }));
    switchTab('create');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
            console.log(`Theme toggled to: ${this.checked ? 'dark' : 'light'}`);
        });
    } else {
        console.warn('Theme toggle element not found');
    }
});

function generateDetailedBio(char) {
    const fallbackData = {
        physicalTraits: [{ characteristic: 'Strong Build', description: 'Robust physique' }],
        psychologicalTraits: [{ characteristic: 'Calm Demeanor', description: 'Steady under pressure' }],
        backgrounds: [{ characteristic: 'City Life', description: 'Raised in an urban setting' }],
        motivations: [{ characteristic: 'Seek Knowledge', description: 'Driven by curiosity' }]
    };
    return `
        <p>${char.name || 'Unknown'}, a ${char.age || 'Unknown'}-year-old ${char.gender || 'Unknown'} ${char.occupation || 'Unknown'} from ${char.locale || 'Unknown'}, with ${char.traits || 'Unknown'} traits.</p>
    `;
}
