const utils = {
    randomizationData: {
        firstNames: ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava'],
        lastNames: ['Johnson', 'Smith', 'Brown', 'Taylor', 'Wilson'],
        genders: ['Male', 'Female', 'Non-binary'],
        locales: ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'],
        occupations: ['Engineer', 'Teacher', 'Doctor', 'Artist', 'Writer'],
        ageRanges: ['18-25', '26-35', '36-50', '51-75']
    },
    randomizeName() {
        const first = this.randomizationData.firstNames[Math.floor(Math.random() * this.randomizationData.firstNames.length)];
        const last = this.randomizationData.lastNames[Math.floor(Math.random() * this.randomizationData.lastNames.length)];
        document.querySelector('#name').value = `${first} ${last}`;
        console.log(`Randomized name: ${first} ${last}`);
    },
    randomizeAge() {
        const range = this.randomizationData.ageRanges[Math.floor(Math.random() * this.randomizationData.ageRanges.length)];
        const [min, max] = range.split('-').map(Number);
        const age = Math.floor(Math.random() * (max - min + 1)) + min;
        document.querySelector('#age').value = age;
        console.log(`Randomized age: ${age}`);
    },
    randomizeGender() {
        const gender = this.randomizationData.genders[Math.floor(Math.random() * this.randomizationData.genders.length)];
        document.querySelector('#gender').value = gender;
        console.log(`Randomized gender: ${gender}`);
    },
    randomizeLocale() {
        const locale = this.randomizationData.locales[Math.floor(Math.random() * this.randomizationData.locales.length)];
        document.querySelector('#locale').value = locale;
        console.log(`Randomized locale: ${locale}`);
    },
    randomizeOccupation() {
        const occupation = this.randomizationData.occupations[Math.floor(Math.random() * this.randomizationData.occupations.length)];
        document.querySelector('#occupation').value = occupation;
        console.log(`Randomized occupation: ${occupation}`);
    },
    randomizeAllFields() {
        this.randomizeName();
        this.randomizeAge();
        this.randomizeGender();
        this.randomizeLocale();
        this.randomizeOccupation();
        traits.randomizeTraits();
        console.log('Randomized all fields');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Randomization data loaded:', utils.randomizationData);
});