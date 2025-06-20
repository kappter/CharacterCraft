const utils = {
    data: {
        firstNames: ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'Logan',
                     'Mia', 'Lucas', 'Harper', 'Elijah', 'Amelia', 'James', 'Charlotte', 'Benjamin', 'Evelyn', 'Alexander'],
        lastNames: ['Johnson', 'Smith', 'Brown', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson',
                    'White', 'Martin', 'Lee', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young'],
        genders: ['Male', 'Female'],
        locales: ['Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Seattle', 'Denver', 'Portland', 'San Diego', 'Austin', 'Boston'],
        occupations: ['Teacher', 'Engineer', 'Writer', 'Doctor', 'Artist', 'Programmer', 'Chef', 'Musician', 'Nurse', 'Scientist'],
        ages: Array.from({length: 80}, (_, i) => i + 18)
    },
    randomizeName() { return `${this.data.firstNames[Math.floor(Math.random() * this.data.firstNames.length)]} ${this.data.lastNames[Math.floor(Math.random() * this.data.lastNames.length)]}`; },
    randomizeAge() { return this.data.ages[Math.floor(Math.random() * this.data.ages.length)]; },
    randomizeGender() { return this.data.genders[Math.floor(Math.random() * this.data.genders.length)]; },
    randomizeLocale() { return this.data.locales[Math.floor(Math.random() * this.data.locales.length)]; },
    randomizeOccupation() { return this.data.occupations[Math.floor(Math.random() * this.data.occupations.length)]; },
    randomizeAllFields() {
        document.querySelector('#name').value = this.randomizeName();
        document.querySelector('#age').value = this.randomizeAge();
        document.querySelector('#gender').value = this.randomizeGender();
        document.querySelector('#locale').value = this.randomizeLocale();
        document.querySelector('#occupation').value = this.randomizeOccupation();
    }
};
