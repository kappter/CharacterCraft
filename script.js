const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.querySelector('#theme-toggle');
let isRandomizing = false;

// Fallback CSV data
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

function loadFileData(fileName) {
    console.warn(`loadFileData called for ${fileName}, using fallback data as no file loading implemented`);
    return ''; // Return empty string to trigger fallback in parseCSV
}

function switchTab(tabId) {
    if (!isRandomizing) {
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.add('hidden'));
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.querySelector(`#${tabId}-tab`);
        if (activeTab && activeContent) {
            activeTab.classList.add('active');
            activeContent.classList.remove('hidden');
            if (tabId === 'saved' && typeof characters.updateCharacterSelects === 'function') {
                setTimeout(() => {
                    characters.updateCharacterSelects();
                    console.log('Character selects updated on Saved tab');
                }, 300);
            }
        }
        console.log(`Switched to tab: ${tabId}`);
    }
}

function resetApp() {
    if (!isRandomizing) {
        localStorage.clear();
        switchTab('create');
        document.querySelectorAll('input').forEach(input => input.value = '');
        document.querySelector('#shortBioOutput').innerHTML = '';
        document.querySelector('#comparisonOutput').innerHTML = '';
        if (typeof characters.updateCharacterSelects === 'function') {
            characters.updateCharacterSelects();
            console.log('Character selects reset');
        }
        if (typeof characters.displayCharacters === 'function') {
            characters.displayCharacters();
            console.log('Characters display reset');
        }
        console.log('App reset');
    }
}

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

function parseCSV(csvString, fileName) {
    if (typeof Papa !== 'undefined' && Papa.parse) {
        const result = Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(),
            transform: (value) => value.trim()
        });
        if (result.errors.length) {
            console.error(`CSV Parsing Errors for ${fileName}:`, result.errors.map(e => ({
                type: e.type,
                code: e.code,
                message: e.message,
                row: e.row
            })));
            return []; // Return empty array on error to use fallback
        }
        return result.data.filter(row => row.characteristic && row.description && row.category) || [];
    } else {
        console.error('Papa Parse is not loaded or defined');
        return [];
    }
}

function getRandomItem(array) {
    return array.length ? array[Math.floor(Math.random() * array.length)] : { characteristic: 'Unknown', description: '' };
}

function generateDetailedBio(char) {
    const traitsData = parseCSV(loadFileData('traits.csv') || '', 'traits.csv');
    const motivationsData = parseCSV(loadFileData('motivations_beliefs.csv') || '', 'motivations_beliefs.csv');
    const physicalTraitsData = parseCSV(loadFileData('physical_traits.csv') || '', 'physical_traits.csv');
    const backgroundData = parseCSV(loadFileData('background_details.csv') || '', 'background_details.csv');
    const psychologicalData = parseCSV(loadFileData('psychological_traits.csv') || '', 'psychological_traits.csv');

    const physicalTraits = physicalTraitsData.length ? physicalTraitsData.filter(t => t.category === 'Physical') : fallbackData.physicalTraits;
    const psychologicalTraits = psychologicalData.length ? psychologicalData.filter(t => t.category === 'Psychological') : fallbackData.psychologicalTraits;
    const backgrounds = backgroundData.length ? backgroundData.filter(t => t.category === 'Background') : fallbackData.backgrounds;
    const motivations = motivationsData.length ? motivationsData.filter(t => t.category === 'Motivations') : fallbackData.motivations;

    console.log('Parsed Data:', { physicalTraits, psychologicalTraits, backgrounds, motivations });

    const randomPhysical = getRandomItem(physicalTraits);
    const randomPsychological = getRandomItem(psychologicalTraits);
    const randomBackground = getRandomItem(backgrounds);
    const randomMotivation = getRandomItem(motivations);

    let bio = `
        <p>${char.name || 'Unknown'}, a ${char.age || 'Unknown'}-year-old ${char.gender || 'Unknown'} ${char.occupation || 'Unknown'} from ${char.locale || 'Unknown'}, carries the weight of a ${randomBackground.characteristic} (${randomBackground.description}). This background has shaped their early life, instilling a deep connection to their roots and influencing their worldview with a blend of resilience and adaptability.</p>
        
        <p>Driven by a ${randomMotivation.characteristic} (${randomMotivation.description}), they pursue their goals with unwavering determination. This motivation often leads them to seek out new challenges, whether in their professional life as a ${char.occupation || 'Unknown'} or in personal endeavors, reflecting a complex inner drive that defines their character.</p>
        
        <p>Their physical presence is marked by a ${randomPhysical.characteristic} (${randomPhysical.description}), which complements their ${randomPsychological.characteristic} (${randomPsychological.description}). This combination of traits allows them to navigate social and professional landscapes with a unique grace, often leaving a lasting impression on those they encounter.</p>
        
        <p>Complemented by additional traits like ${char.traits || 'Unknown'}, their personality is a rich tapestry of experiences and qualities. Whether collaborating with others or pursuing solitary projects, they bring a distinctive flair that sets them apart in their community.</p>
    `;
    return bio;
}

function generateIntersectionScenario(char1, char2) {
    const scenario = getRandomItem(fallbackData.scenarios);
    const outcome = getRandomItem(fallbackData.outcomes);
    const context1 = document.querySelector('#context1')?.value || 'a neutral setting';
    const context2 = document.querySelector('#context2')?.value || 'a different perspective';
    const psychTraits1 = parseCSV(loadFileData('psychological_traits.csv') || '', 'psychological_traits.csv');
    const psychTraits2 = psychTraits1; // Using same data for simplicity
    const trait1 = getRandomItem(psychTraits1).characteristic;
    const trait2 = getRandomItem(psychTraits2).characteristic;
    const interaction = trait1.includes('Calm') && trait2.includes('Aggressive') ? 'initial tension' : 
                       trait1.includes('Optimistic') && trait2.includes('Pessimistic') ? 'surprising synergy' : 
                       'natural harmony';

    let narrative = `
        <p>In a twist of fate, ${char1.name || 'Unknown'} and ${char2.name || 'Unknown'} ${scenario.context}. ${char1.name}, a ${char1.age || 'Unknown'}-year-old ${char1.gender || 'Unknown'} ${char1.occupation || 'Unknown'} from ${char1.locale || 'Unknown'} with traits like ${char1.traits || 'Unknown'}, crossed paths with ${char2.name}, a ${char2.age || 'Unknown'}-year-old ${char2.gender || 'Unknown'} ${char2.occupation || 'Unknown'} from ${char2.locale || 'Unknown'} with traits like ${char2.traits || 'Unknown'}.</p>
        <p>Their ${scenario.type.toLowerCase()} unfolded in ${context1}, marked by ${interaction} due to ${char1.name}'s ${trait1} clashing or complementing ${char2.name}'s ${trait2}. This led to ${context2}, where they ${outcome.result}.</p>
    `;
    return narrative;
}

function handleClick(event) {
    event.preventDefault();
    const { tagName, className, dataset } = event.target;
    console.log(`Click detected: event=click, tag=${tagName}, class=${className}, id=${event.target.id || 'unknown'}, data-tab=${dataset.tab || 'none'}`);

    if (tagName === 'BUTTON' && dataset.tab) {
        switchTab(dataset.tab);
    } else if (className.includes('reset-app')) {
        resetApp();
    } else if (className.includes('randomize-everything')) {
        if (typeof window.utils?.randomizeAllFields === 'function' && !isRandomizing) {
            console.log('Attempting to randomize all fields');
            isRandomizing = true;
            try {
                window.utils.randomizeAllFields();
                if (typeof traits.randomizeTraits === 'function') {
                    traits.randomizeTraits();
                    const traitsInput = document.querySelector('#traits');
                    if (traitsInput) traitsInput.value = traits.randomizedTraits ? traits.randomizedTraits.join(', ') : '';
                }
                console.log('Randomize all fields completed');
            } catch (error) {
                console.error('Randomization failed:', error);
            } finally {
                setTimeout(() => { isRandomizing = false; }, 1200);
            }
        } else {
            console.error('utils.randomizeAllFields is not a function or already randomizing');
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
        document.querySelector('#shortBioOutput').innerHTML = bio;
        const exportButton = document.querySelector('#exportBioButton');
        if (exportButton) exportButton.disabled = false;
        console.log('Bio generated:', { char, bio });
    } else if (className.includes('save-character')) {
        if (typeof characters.saveCharacter === 'function') {
            console.log('Attempting to save character');
            characters.saveCharacter();
            console.log('Character save completed');
            switchTab('saved');
        }
    } else if (className.includes('export-bio')) {
        const bio = document.querySelector('#shortBioOutput')?.innerText || 'No bio available';
        const blob = new Blob([bio], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_bio.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('compare-characters')) {
        const char1Id = document.querySelector('#character1')?.value;
        const char2Id = document.querySelector('#character2')?.value;
        const chars = JSON.parse(localStorage.getItem('characters') || '[]');
        const char1 = chars.find(c => c.id == char1Id) || {};
        const char2 = chars.find(c => c.id == char2Id) || {};
        const scenario = generateIntersectionScenario(char1, char2);
        document.querySelector('#comparisonOutput').innerHTML = scenario;
        const exportCompButton = document.querySelector('#exportComparisonButton');
        if (exportCompButton) exportCompButton.disabled = false;
        console.log('Comparison scenario generated:', { char1, char2, scenario });
    } else if (className.includes('randomize-comparison')) {
        document.querySelector('#context1').value = 'a neutral setting';
        document.querySelector('#context2').value = 'a different perspective';
    } else if (className.includes('export-comparison')) {
        const comparison = document.querySelector('#comparisonOutput')?.innerText || 'No comparison available';
        const blob = new Blob([comparison], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'comparison_scenario.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('update-character')) {
        if (typeof characters.updateCharacter === 'function') characters.updateCharacter();
    } else if (className.includes('export-report')) {
        const reportContent = document.querySelector('#characterReportContent');
        const bio = document.querySelector('#shortBioOutput')?.innerText || generateDetailedBio({
            name: reportContent?.querySelector('p:nth-child(1)')?.textContent.replace('Name: ', '') || 'Unknown',
            age: reportContent?.querySelector('p:nth-child(2)')?.textContent.replace('Age: ', '') || 'Unknown',
            gender: reportContent?.querySelector('p:nth-child(3)')?.textContent.replace('Gender: ', '') || 'Unknown',
            locale: reportContent?.querySelector('p:nth-child(4)')?.textContent.replace('Locale: ', '') || 'Unknown',
            occupation: reportContent?.querySelector('p:nth-child(5)')?.textContent.replace('Occupation: ', '') || 'Unknown',
            traits: reportContent?.querySelector('p:nth-child(6)')?.textContent.replace('Traits: ', '') || 'Unknown'
        });
        const fullReport = (reportContent?.innerText || '') + '\n\nDetailed Bio:\n' + bio;
        const blob = new Blob([fullReport], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_report.txt';
        a.click();
        URL.revokeObjectURL(url);
    } else if (className.includes('close-modal')) {
        document.querySelector('#characterReportModal').classList.add('hidden');
    } else if (className.includes('randomize-name')) {
        if (typeof window.utils?.randomizeName === 'function' && !isRandomizing) {
            console.log('Attempting to randomize name');
            isRandomizing = true;
            window.utils.randomizeName();
            console.log('Randomize name completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeName is not a function or already randomizing');
        }
    } else if (className.includes('randomize-age')) {
        if (typeof window.utils?.randomizeAge === 'function' && !isRandomizing) {
            console.log('Attempting to randomize age');
            isRandomizing = true;
            window.utils.randomizeAge();
            console.log('Randomize age completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeAge is not a function or already randomizing');
        }
    } else if (className.includes('randomize-gender')) {
        if (typeof window.utils?.randomizeGender === 'function' && !isRandomizing) {
            console.log('Attempting to randomize gender');
            isRandomizing = true;
            window.utils.randomizeGender();
            console.log('Randomize gender completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeGender is not a function or already randomizing');
        }
    } else if (className.includes('randomize-locale')) {
        if (typeof window.utils?.randomizeLocale === 'function' && !isRandomizing) {
            console.log('Attempting to randomize locale');
            isRandomizing = true;
            window.utils.randomizeLocale();
            console.log('Randomize locale completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeLocale is not a function or already randomizing');
        }
    } else if (className.includes('randomize-occupation')) {
        if (typeof window.utils?.randomizeOccupation === 'function' && !isRandomizing) {
            console.log('Attempting to randomize occupation');
            isRandomizing = true;
            window.utils.randomizeOccupation();
            console.log('Randomize occupation completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('utils.randomizeOccupation is not a function or already randomizing');
        }
    } else if (className.includes('randomize-traits')) {
        if (typeof traits.randomizeTraits === 'function' && !isRandomizing) {
            console.log('Attempting to randomize traits');
            isRandomizing = true;
            traits.randomizeTraits();
            const traitsInput = document.querySelector('#traits');
            if (traitsInput) traitsInput.value = traits.randomizedTraits ? traits.randomizedTraits.join(', ') : '';
            console.log('Randomize traits completed');
            setTimeout(() => { isRandomizing = false; }, 1000);
        } else {
            console.error('traits.randomizeTraits is not a function or already randomizing');
        }
    } else if (className.includes('randomize-context1')) {
        document.querySelector('#context1').value = 'a neutral setting';
    } else if (className.includes('randomize-context2')) {
        document.querySelector('#context2').value = 'a different perspective';
    } else if (className.includes('trait-bubble')) {
        document.querySelector('#selectedTraits').innerHTML = `Trait: ${event.target.textContent}`;
    } else if (className.includes('generate-report')) {
        const charId = dataset.charId || document.querySelector('#character1')?.value || document.querySelector('#character2')?.value;
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
}

document.addEventListener('DOMContentLoaded', () => {
    switchTab('create');
    initializeTheme();
    document.addEventListener('click', handleClick);
    themeToggle.addEventListener('change', toggleTheme);
    if (typeof characters.updateCharacterSelects === 'function') characters.updateCharacterSelects();
    if (typeof characters.displayCharacters === 'function') characters.displayCharacters();
    if (typeof traits.displayTraits === 'function') traits.displayTraits();
    if (typeof traits.displayTraitBubbles === 'function') traits.displayTraitBubbles();
    console.log('Event listeners bound for: click');
    console.log('Page loaded, initialized create tab and event listeners');
});
