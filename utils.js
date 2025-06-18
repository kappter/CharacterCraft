const utils = {
    randomizationData: {
        firstNames: ['John', 'Jane', 'Alex', 'Sam', 'Emily'],
        lastNames: ['Doe', 'Smith', 'Wilson', 'Brown', 'Taylor'],
        genders: ['Male', 'Female', 'Non-binary'],
        locales: ['New York', 'Tokyo', 'London', 'Sydney', 'Paris'],
        occupations: ['Engineer', 'Doctor', 'Artist', 'Teacher', 'Writer']
    },

    randomizeAllFields() {
        this.randomizeName();
        this.randomizeAge();
        this.randomizeGender();
        this.randomizeLocale();
        this.randomizeOccupation();
        console.log('Randomization data loaded:', this.randomizationData);
    },

    randomizeName() {
        const first = this.randomizationData.firstNames[Math.floor(Math.random() * this.randomizationData.firstNames.length)];
        const last = this.randomizationData.lastNames[Math.floor(Math.random() * this.randomizationData.lastNames.length)];
        document.querySelector('#name').value = `${first} ${last}`;
        console.log(`Randomized name: ${first} ${last}`);
    },

    randomizeAge() {
        const age = Math.floor(Math.random() * 80) + 18; // 18 to 97
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
    }
};

export default utils;