let randomizationData = null;

async function loadRandomizationData() {
    try {
        const response = await fetch('./randomization_data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        randomizationData = await response.json();
        console.log('Randomization data loaded:', randomizationData);
    } catch (err) {
        console.error('Error loading randomization data:', err);
        // Fallback data
        randomizationData = {
            firstNames: ['John', 'Emma', 'Liam', 'Olivia', 'Quinn'],
            lastNames: ['Smith', 'Johnson', 'Walker', 'Brown', 'Li'],
            genders: ['Male', 'Female', 'Non-binary'],
            locales: ['New York', 'Tokyo', 'Bangkok', 'London', 'Rio de Janeiro'],
            occupations: ['Engineer', 'Teacher', 'Architect', 'Artist', 'Doctor'],
            ageRanges: ['18-25', '26-35', '36-50', '51-75', '76-100']
        };
        console.warn('Using fallback randomization data');
    }
}

function randomizeName() {
    try {
        if (!randomizationData || !randomizationData.firstNames || !randomizationData.lastNames) {
            throw new Error('Randomization data not loaded');
        }
        const firstName = randomizationData.firstNames[Math.floor(Math.random() * randomizationData.firstNames.length)];
        const lastName = randomizationData.lastNames[Math.floor(Math.random() * randomizationData.lastNames.length)];
        const fullName = `${firstName} ${lastName}`;
        document.getElementById('name').value = fullName;
        console.log('Randomized name:', fullName);
        return fullName;
    } catch (err) {
        console.error('Error randomizing name:', err);
        const fallbackName = 'Unnamed';
        document.getElementById('name').value = fallbackName;
        return fallbackName;
    }
}

function getRandomAgeRange() {
    try {
        if (!randomizationData || !randomizationData.ageRanges) {
            throw new Error('Randomization data not loaded');
        }
        const range = randomizationData.ageRanges[Math.floor(Math.random() * randomizationData.ageRanges.length)];
        console.log('Selected age range:', range);
        return range;
    } catch (err) {
        console.error('Error selecting age range:', err);
        return '18-25'; // Fallback
    }
}

function randomizeAge() {
    try {
        const range = getRandomAgeRange();
        const [min, max] = range.split('-').map(Number);
        if (isNaN(min) || isNaN(max)) throw new Error('Invalid age range');
        const age = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('age').value = age;
        console.log('Randomized age:', age);
        return age;
    } catch (err) {
        console.error('Error randomizing age:', err);
        const fallbackAge = 30;
        document.getElementById('age').value = fallbackAge;
        console.warn('Used fallback age due to error');
        return fallbackAge;
    }
}

function randomizeGender() {
    try {
        if (!randomizationData || !randomizationData.genders) {
            throw new Error('Randomization data not loaded');
        }
        const gender = randomizationData.genders[Math.floor(Math.random() * randomizationData.genders.length)];
        document.getElementById('gender').value = gender;
        console.log('Randomized gender:', gender);
        return gender;
    } catch (err) {
        console.error('Error randomizing gender:', err);
        const fallbackGender = 'Non-binary';
        document.getElementById('gender').value = fallbackGender;
        return fallbackGender;
    }
}

function randomizeLocale() {
    try {
        if (!randomizationData || !randomizationData.locales) {
            throw new Error('Randomization data not loaded');
        }
        const locale = randomizationData.locales[Math.floor(Math.random() * randomizationData.locales.length)];
        document.getElementById('locale').value = locale;
        console.log('Randomized locale:', locale);
        return locale;
    } catch (err) {
        console.error('Error randomizing locale:', err);
        const fallbackLocale = 'Unknown';
        document.getElementById('locale').value = fallbackLocale;
        return fallbackLocale;
    }
}

function randomizeOccupation() {
    try {
        if (!randomizationData || !randomizationData.occupations) {
            throw new Error('Randomization data not loaded');
        }
        const occupation = randomizationData.occupations[Math.floor(Math.random() * randomizationData.occupations.length)];
        document.getElementById('occupation').value = occupation;
        console.log('Randomized occupation:', occupation);
        return occupation;
    } catch (err) {
        console.error('Error randomizing occupation:', err);
        const fallbackOccupation = 'Freelancer';
        document.getElementById('occupation').value = fallbackOccupation;
        return fallbackOccupation;
    }
}

function randomizeTraits() {
    try {
        const traits = getTraits();
        if (!traits || traits.length === 0) {
            throw new Error('No traits available');
        }
        const numTraits = Math.floor(Math.random() * 3) + 1; // 1-3 traits
        const selectedTraits = [];
        for (let i = 0; i < numTraits; i++) {
            const randomTrait = traits[Math.floor(Math.random() * traits.length)];
            if (randomTrait && !selectedTraits.includes(randomTrait.characteristic)) {
                selectedTraits.push(randomTrait.characteristic);
            }
        }
        document.getElementById('traits').value = selectedTraits.join(', ');
        console.log('Randomized traits:', selectedTraits);
        return selectedTraits;
    } catch (err) {
        console.error('Error randomizing traits:', err);
        document.getElementById('traits').value = '';
        console.log('Randomized traits: []');
        return [];
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

function randomizeContext(contextId) {
    try {
        const contexts = ['Work', 'Family', 'Social', 'Hobby', 'Travel'];
        const context = contexts[Math.floor(Math.random() * contexts.length)];
        document.getElementById(contextId).value = context;
        console.log(`Randomized context (${contextId}):`, context);
        return context;
    } catch (err) {
        console.error(`Error randomizing context (${contextId}):`, err);
        document.getElementById(contextId).value = 'Unknown';
        return 'Unknown';
    }
}

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    toggle.checked = savedTheme === 'dark';
    console.log('Initialized with theme:', savedTheme);

    toggle.addEventListener('change', () => {
        const newTheme = toggle.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log('Theme toggled to:', newTheme);
    });
}