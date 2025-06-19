function loadRandomData() {
    Papa.parse('random_data.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data.filter(row => row && typeof row === 'object'); // Filter out invalid rows
            if (data.length === 0) {
                console.error('No valid data found in random_data.csv');
                initializeFallbackData();
                return;
            }
            window.utils = {
                firstNames: [...new Set(data.map(row => row.firstNames).filter(n => n && typeof n === 'string'))],
                lastNames: [...new Set(data.map(row => row.lastNames).filter(n => n && typeof n === 'string'))],
                genders: [...new Set(data.map(row => row.genders).filter(g => g && typeof g === 'string'))],
                locales: [...new Set(data.map(row => row.locales).filter(l => l && typeof l === 'string'))],
                occupations: [...new Set(data.map(row => row.occupations).filter(o => o && typeof o === 'string'))],
                traits: [...new Set(data.flatMap(row => {
                    if (row.traits && typeof row.traits === 'string') {
                        return row.traits.split(',').map(t => t.trim()).filter(t => t);
                    }
                    return [];
                }))]
            };
            if (!window.utils.firstNames.length || !window.utils.traits.length) {
                console.warn('Insufficient data from CSV, using fallback');
                initializeFallbackData();
            } else {
                console.log('Randomization data loaded:', window.utils);
            }
        },
        error: function(error) {
            console.error('Failed to load random_data.csv:', error);
            initializeFallbackData();
        }
    });
}

function initializeFallbackData() {
    window.utils = {
        firstNames: ['John', 'Sam', 'Emily', 'Alex', 'Jane'],
        lastNames: ['Smith', 'Doe', 'Wilson', 'Taylor', 'Davis'],
        genders: ['Male', 'Female', 'Non-binary'],
        locales: ['New York', 'Los Angeles', 'Chicago', 'Sydney', 'London'],
        occupations: ['Engineer', 'Teacher', 'Writer', 'Artist', 'Doctor'],
        traits: ['Loyal', 'Brave', 'Wise', 'Cunning', 'Calm']
    };
    console.warn('Using fallback data due to CSV load or data issue');
}

function getRandomItem(array) {
    return array.length ? array[Math.floor(Math.random() * array.length)] : { characteristic: 'Unknown', description: '' };
}

function randomizeName() {
    if (!window.utils || !window.utils.firstNames || !window.utils.lastNames) return 'Unknown Name';
    return `${getRandomItem(window.utils.firstNames)} ${getRandomItem(window.utils.lastNames)}`;
}

function randomizeAge() {
    return Math.floor(Math.random() * 100) + 1;
}

function randomizeGender() {
    if (!window.utils || !window.utils.genders) return 'Unknown';
    return getRandomItem(window.utils.genders);
}

function randomizeLocale() {
    if (!window.utils || !window.utils.locales) return 'Unknown';
    return getRandomItem(window.utils.locales);
}

function randomizeOccupation() {
    if (!window.utils || !window.utils.occupations) return 'Unknown';
    return getRandomItem(window.utils.occupations);
}

function randomizeTraits() {
    if (!window.utils || !window.utils.traits) return [];
    const count = Math.floor(Math.random() * 8) + 3; // 3 to 10 traits
    const shuffled = [...window.utils.traits].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function randomizeAllFields() {
    if (!window.utils) return;
    const name = randomizeName();
    const age = randomizeAge();
    const gender = randomizeGender();
    const locale = randomizeLocale();
    const occupation = randomizeOccupation();
    const traits = randomizeTraits().join(', ');

    const inputs = {
        '#name': name,
        '#age': age,
        '#gender': gender,
        '#locale': locale,
        '#occupation': occupation,
        '#traits': traits
    };

    Object.entries(inputs).forEach(([id, value]) => {
        const input = document.querySelector(id);
        if (input) input.value = value;
    });

    console.log('Randomized all fields:', { name, age, gender, locale, occupation, traits });
}

document.addEventListener('DOMContentLoaded', loadRandomData);