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
        document.querySelector('#name').value = randomizeName();
        document.querySelector('#age').value = randomizeAge();
        document.querySelector('#gender').value = randomizeGender();
        document.querySelector('#locale').value = randomizeLocale();
        document.querySelector('#occupation').value = randomizeOccupation();
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
