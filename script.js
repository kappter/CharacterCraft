const tabs = document.querySelectorAll('nav a');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.querySelector('#themeToggle');
let isRandomizing = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initialized create tab and event listeners');

    if (typeof characters === 'undefined' || typeof traits === 'undefined') {
        console.error('Characters or Traits modules not loaded');
        return;
    }

    const bindEventListeners = () => {
        const buttons = document.querySelectorAll('button');
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
            if (typeof window.utils?.randomizeAllFields === 'function' && !isRandomizing) {
                console.log('Attempting to randomize all fields');
                isRandomizing = true;
                try {
                    window.utils.randomizeAllFields();
                    const inputs = document.querySelectorAll('#create input[readonly]');
                    inputs.forEach(input => {
                        if (input.id === 'traits' && typeof traits.randomizeTraits === 'function') {
                            traits.randomizeTraits();
                            input.value = traits.randomizedTraits ? traits.randomizedTraits.join(', ') : '';
                        } else if (input.id && window.utils[`randomize${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`]) {
                            input.value = window.utils[`randomize${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`]();
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
            const exportButton = document.querySelector('#exportBio');
            if (exportButton) exportButton.disabled = false;
            console.log('Bio generated:', { char, bio });
        } else if (className.includes('save-character')) {
            if (typeof characters.saveCharacter === 'function') {
                characters.saveCharacter();
                console.log('Character save completed');
                switchTab('saved');
            }
        } else if (className.includes('export-bio')) {
            const bio = document.querySelector('#bioPreview')?.innerText || 'No bio available';
            const blob = new Blob([bio], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'character_bio.txt';
            a.click();
            URL.revokeObjectURL(url);
        } else if (className.includes('compare-characters')) {
            const char1Id = document.querySelector('#characterSelect1')?.value;
            const char2Id = document.querySelector('#characterSelect2')?.value;
            const chars = JSON.parse(localStorage.getItem('characters') || '[]');
            const char1 = chars.find(c => c.id == char1Id) || {};
            const char2 = chars.find(c => c.id == char2Id) || {};
            const scenario = generateIntersectionScenario(char1, char2);
            document.querySelector('#comparisonOutput').innerHTML = scenario;
            const exportCompButton = document.querySelector('#exportComparison');
            if (exportCompButton) exportCompButton.disabled = false;
            console.log('Comparison scenario generated:', { char1, char2, scenario });
        } else if (className.includes('generate-report') && e.target.classList.contains('generate-report')) {
            const charId = dataset.charId || document.querySelector('#characterSelect1')?.value || document.querySelector('#characterSelect2')?.value;
            const chars = JSON.parse(localStorage.getItem('characters') || '[]');
            const char = chars.find(c => c.id == charId) || {};
            const reportContent = document.querySelector('#characterReportContent');
            if (reportContent && char.id) {
                reportContent.innerHTML = `
                    <p><strong>Name:</strong> ${char.name || 'Unknown'}</p>
                    <p><strong>Age:</strong> ${char.age || 'Unknown'}</p>
                    <p><strong>Gender:</strong> ${char.gender || 'Unknown'}</p>
                    <p><strong>Locale:</strong> ${char.locale || 'Unknown'}</p>
                    <p><strong>Occupation:</strong> ${char.occupation || 'Unknown'}</p>
                    <p><strong>Traits:</strong> ${char.traits || 'Unknown'}</p>
                `;
                document.querySelector('#characterReportModal').classList.remove('hidden');
                console.log('Report generated:', char);
            } else {
                console.error('No character selected or invalid data:', { charId, chars });
            }
        }
    };

    bindEventListeners();

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.style.display = content.id === tabId ? 'block' : 'none';
            });
            console.log(`Switched to tab: ${tabId}`);
        });
    });
    tabs[0].click();

    themeToggle.addEventListener('change', toggleTheme);
    initializeTheme();

    if (document.querySelector('#characterSelect1') && document.querySelector('#characterSelect2')) {
        if (typeof characters.updateCharacterSelects === 'function') characters.updateCharacterSelects();
    } else {
        setTimeout(() => {
            if (typeof characters.updateCharacterSelects === 'function') characters.updateCharacterSelects();
        }, 500);
    }
    if (typeof characters.displayCharacters === 'function') characters.displayCharacters();
    if (typeof traits.displayTraits === 'function') traits.displayTraits();
    if (typeof traits.displayTraitBubbles === 'function') traits.displayTraitBubbles();
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.checked = newTheme === 'dark';
    console.log(`Theme toggled to: ${newTheme}`);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    console.log(`Initialized theme: ${savedTheme}`);
}

function generateDetailedBio(char) {
    const fallbackData = {
        physicalTraits: [{ characteristic: 'Strong Build', description: 'Robust physique', category: 'Physical' }],
        psychologicalTraits: [{ characteristic: 'Calm Demeanor', description: 'Steady under pressure', category: 'Psychological' }],
        backgrounds: [{ characteristic: 'City Life', description: 'Raised in an urban setting', category: 'Background' }],
        motivations: [{ characteristic: 'Seek Knowledge', description: 'Driven by curiosity', category: 'Motivations' }],
        scenarios: [
            { type: 'Meeting', context: 'met unexpectedly at a bustling market' },
            { type: 'Collaboration', context: 'teamed up on a critical project' },
            { type: 'Conflict', context: 'clashed over a disputed resource' }
        ],
        outcomes: [
            { result: 'formed a lasting alliance', condition: 'complementary traits' },
            { result: 'parted ways amicably', condition: 'neutral traits' },
            { result: 'ended in a heated rivalry', condition: 'conflicting traits' }
        ]
    };

    const physicalTraits = fallbackData.physicalTraits;
    const psychologicalTraits = fallbackData.psychologicalTraits;
    const backgrounds = fallbackData.backgrounds;
    const motivations = fallbackData.motivations;

    const randomPhysical = physicalTraits[Math.floor(Math.random() * physicalTraits.length)];
    const randomPsychological = psychologicalTraits[Math.floor(Math.random() * psychologicalTraits.length)];
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];

    let bio = `
        <p>${char.name || 'Unknown'}, a ${char.age || 'Unknown'}-year-old ${char.gender || 'Unknown'} ${char.occupation || 'Unknown'} from ${char.locale || 'Unknown'}, carries the weight of a ${randomBackground.characteristic} (${randomBackground.description}). This background has shaped their early life, instilling a deep connection to their roots and influencing their worldview with a blend of resilience and adaptability.</p>
        
        <p>Driven by a ${randomMotivation.characteristic} (${randomMotivation.description}), they pursue their goals with unwavering determination. This motivation often leads them to seek out new challenges, whether in their professional life as a ${char.occupation || 'Unknown'} or in personal endeavors, reflecting a complex inner drive that defines their character.</p>
        
        <p>Their physical presence is marked by a ${randomPhysical.characteristic} (${randomPhysical.description}), which complements their ${randomPsychological.characteristic} (${randomPsychological.description}). This combination of traits allows them to navigate social and professional landscapes with a unique grace, often leaving a lasting impression on those they encounter.</p>
        
        <p>Complemented by additional traits like ${char.traits || 'Unknown'}, their personality is a rich tapestry of experiences and qualities. Whether collaborating with others or pursuing solitary projects, they bring a distinctive flair that sets them apart in their community.</p>
    `;
    return bio;
}

function generateIntersectionScenario(char1, char2) {
    const scenario = fallbackData.scenarios[Math.floor(Math.random() * fallbackData.scenarios.length)];
    const outcome = fallbackData.outcomes[Math.floor(Math.random() * fallbackData.outcomes.length)];
    const interaction = char1.traits && char2.traits && char1.traits.includes('Calm') && char2.traits.includes('Aggressive') ? 'initial tension' : 'natural harmony';

    let narrative = `
        <p>In a twist of fate, ${char1.name || 'Unknown'} and ${char2.name || 'Unknown'} ${scenario.context}. ${char1.name}, a ${char1.age || 'Unknown'}-year-old ${char1.gender || 'Unknown'} ${char1.occupation || 'Unknown'} from ${char1.locale || 'Unknown'} with traits like ${char1.traits || 'Unknown'}, crossed paths with ${char2.name}, a ${char2.age || 'Unknown'}-year-old ${char2.gender || 'Unknown'} ${char2.occupation || 'Unknown'} from ${char2.locale || 'Unknown'} with traits like ${char2.traits || 'Unknown'}.</p>
        <p>Their ${scenario.type.toLowerCase()} unfolded in a neutral setting, marked by ${interaction} due to their differing traits. This led to a different perspective, where they ${outcome.result}.</p>
    `;
    return narrative;
}
