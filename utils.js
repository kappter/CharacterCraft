const utils = {
    randomizationData: {
        firstNames: ['John', 'Jane', 'Alex', 'Sam', 'Taylor'],
        lastNames: ['Smith', 'Doe', 'Brown', 'Taylor', 'Wilson'],
        genders: ['Male', 'Female', 'Non-binary'],
        locales: ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'],
        occupations: ['Engineer', 'Artist', 'Teacher', 'Doctor', 'Writer'],
        ages: Array.from({ length: 80 }, (_, i) => i + 18)
    },

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    randomizeName() {
        const firstName = this.getRandomItem(this.randomizationData.firstNames);
        const lastName = this.getRandomItem(this.randomizationData.lastNames);
        const nameInput = document.querySelector('#name');
        if (nameInput) {
            nameInput.value = `${firstName} ${lastName}`;
            console.log(`Randomized name: ${nameInput.value}`);
        }
    },

    randomizeAge() {
        const age = this.getRandomItem(this.randomizationData.ages);
        const ageInput = document.querySelector('#age');
        if (ageInput) {
            ageInput.value = age;
            console.log(`Randomized age: ${age}`);
        }
    },

    randomizeGender() {
        const gender = this.getRandomItem(this.randomizationData.genders);
        const genderInput = document.querySelector('#gender');
        if (genderInput) {
            genderInput.value = gender;
            console.log(`Randomized gender: ${gender}`);
        }
    },

    randomizeLocale() {
        const locale = this.getRandomItem(this.randomizationData.locales);
        const localeInput = document.querySelector('#locale');
        if (localeInput) {
            localeInput.value = locale;
            console.log(`Randomized locale: ${locale}`);
        }
    },

    randomizeOccupation() {
        const occupation = this.getRandomItem(this.randomizationData.occupations);
        const occupationInput = document.querySelector('#occupation');
        if (occupationInput) {
            occupationInput.value = occupation;
            console.log(`Randomized occupation: ${occupation}`);
        }
    },

    randomizeAllFields() {
        this.randomizeName();
        this.randomizeAge();
        this.randomizeGender();
        this.randomizeLocale();
        this.randomizeOccupation();
        console.log('Randomization data loaded:', this.randomizationData);
        setTimeout(() => console.log('Randomization applied and persisted'), 100);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Randomization data loaded:', utils.randomizationData);
});