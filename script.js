import { utils } from './utils.js';
import { characters } from './characters.js';
import { traits } from './traits.js';

const tabs = document.querySelectorAll('nav a');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.querySelector('#themeToggle');
let isRandomizing = false;

const bindEventListeners = () => {
    const buttons = document.querySelectorAll('button');
    if (buttons.length === 0) console.error('No buttons found for event listeners');
    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
    });
    console.log('Event listeners bound for: click');
};

const handleClick = (e) => {
    e.preventDefault();
    const { tagName, className, id, dataset } = e.target;
    console.log(`Click detected: event=click, tag=${tagName}, class=${className}, id=${id || 'unknown'}, data-tab=${dataset.tab || 'none'}`);

    if (tagName === 'BUTTON' && dataset.tab) {
        switchTab(dataset.tab);
    } else if (className.includes('randomize-everything')) {
        if (typeof utils.randomizeAllFields === 'function' && !isRandomizing) {
            console.log('Attempting to randomize all fields');
            isRandomizing = true;
            try {
                utils.randomizeAllFields();
                const inputs = document.querySelectorAll('#create input[readonly]');
                inputs.forEach(input => {
                    if (input.id === 'traits' && typeof traits.randomizeTraits === 'function') {
                        traits.randomizeTraits();
                    }
                });
                console.log('Randomize all fields completed');
            } catch (error) {
                console.error('Randomization failed:', error);
            } finally {
                setTimeout(() => { isRandomizing = false; }, 1500);
            }
        } else {
            console.error('utils.randomizeAllFields not available or already randomizing');
        }
    } else if (className.includes('generate-bio')) {
        const char = {
            name: document.querySelector('#name')?.value || 'Unknown',
            age: document.querySelector('#age')?.value || 'Unknown',
            gender: document.querySelector('#gender')?.value || 'Unknown',
            locale: document.querySelector('#locale')?.value || 'Unknown',
            occupation: document.querySelector('#occupation')?.value || 'Unknown',
            traits: document.querySelector('#traits')?.value || 'Unknown'
        };
        const bio = generateDetailedBio(char);
        document.querySelector('#bioPreview').innerHTML = bio;
        console.log('Bio generated:', { char, bio });
    } else if (className.includes('save-character')) {
        if (typeof characters.saveCharacter === 'function') {
            characters.saveCharacter();
            console.log('Character save completed');
            switchTab('saved');
        }
    }
};

const switchTab = (tabId) => {
    tabContents.forEach(content => {
        content.style.display = content.id === tabId ? 'block' : 'none';
    });
    console.log(`Switched to tab: ${tabId}`);
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initialized create tab and event listeners');
    bindEventListeners();
    setTimeout(bindEventListeners, 500); // Fallback binding
    tabs.forEach(tab => tab.addEventListener('click', (e) => { e.preventDefault(); switchTab(tab.dataset.tab); }));
    switchTab('create');
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        console.log(`Initialized theme: ${this.checked ? 'dark' : 'light'}`);
    });
});

function generateDetailedBio(char) {
    const fallbackData = {
        physicalTraits: [{ characteristic: 'Strong Build', description: 'Robust physique', category: 'Physical' }],
        psychologicalTraits: [{ characteristic: 'Calm Demeanor', description: 'Steady under pressure', category: 'Psychological' }],
        backgrounds: [{ characteristic: 'City Life', description: 'Raised in an urban setting', category: 'Background' }],
        motivations: [{ characteristic: 'Seek Knowledge', description: 'Driven by curiosity', category: 'Motivations' }]
    };

    const randomPhysical = fallbackData.physicalTraits[0];
    const randomPsychological = fallbackData.psychologicalTraits[0];
    const randomBackground = fallbackData.backgrounds[0];
    const randomMotivation = fallbackData.motivations[0];

    let bio = `
        <p>${char.name || 'Unknown'}, a ${char.age || 'Unknown'}-year-old ${char.gender || 'Unknown'} ${char.occupation || 'Unknown'} from ${char.locale || 'Unknown'}, carries the weight of a ${randomBackground.characteristic} (${randomBackground.description}).</p>
        <p>Driven by a ${randomMotivation.characteristic} (${randomMotivation.description}), they pursue their goals with determination.</p>
        <p>Their physical presence is marked by a ${randomPhysical.characteristic} (${randomPhysical.description}), complementing their ${randomPsychological.characteristic} (${randomPsychological.description}).</p>
        <p>With traits like ${char.traits || 'Unknown'}, they stand out in their community.</p>
    `;
    return bio;
}