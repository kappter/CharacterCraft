const utils = (function() {
    const data = {
        firstNames: ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'Logan',
                     'Mia', 'Lucas', 'Harper', 'Elijah', 'Amelia', 'James', 'Charlotte', 'Benjamin', 'Evelyn', 'Alexander'],
        lastNames: ['Johnson', 'Smith', 'Brown', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson',
                    'White', 'Martin', 'Lee', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young'],
        genders: ['Male', 'Female'],
        locales: ['Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Seattle', 'Denver', 'Portland', 'San Diego', 'Austin', 'Boston'],
        occupations: ['Teacher', 'Engineer', 'Writer', 'Doctor', 'Artist', 'Programmer', 'Chef', 'Musician', 'Nurse', 'Scientist'],
        ages: Array.from({length: 80}, (_, i) => i + 18)
    };

    function randomizeName() { return `${data.firstNames[Math.floor(Math.random() * data.firstNames.length)]} ${data.lastNames[Math.floor(Math.random() * data.lastNames.length)]}`; }
    function randomizeAge() { return data.ages[Math.floor(Math.random() * data.ages.length)]; }
    function randomizeGender() { return data.genders[Math.floor(Math.random() * data.genders.length)]; }
    function randomizeLocale() { return data.locales[Math.floor(Math.random() * data.locales.length)]; }
    function randomizeOccupation() { return data.occupations[Math.floor(Math.random() * data.occupations.length)]; }
    function randomizeAllFields() {
        console.log('Randomizing all fields...');
        const inputs = {
            name: document.querySelector('#name'),
            age: document.querySelector('#age'),
            gender: document.querySelector('#gender'),
            locale: document.querySelector('#locale'),
            occupation: document.querySelector('#occupation'),
            traits: document.querySelector('#traits')
        };
        for (let [id, input] of Object.entries(inputs)) {
            if (input) {
                input.value = utils[`randomize${id.charAt(0).toUpperCase() + id.slice(1)}`]();
                console.log(`Updated ${id} to: ${input.value}`);
            } else {
                console.error(`${id} input not found`);
            }
        }
        console.log('Randomization completed');
    }

    return {
        randomizeName,
        randomizeAge,
        randomizeGender,
        randomizeLocale,
        randomizeOccupation,
        randomizeAllFields
    };
})();

export { utils };