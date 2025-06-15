const randomizationData = {
    firstNames: ['John', 'Jane', 'Alex', 'Sam', 'Taylor'],
    lastNames: ['Smith', 'Doe', 'Brown', 'Taylor', 'Wilson'],
    genders: ['Male', 'Female', 'Non-binary'],
    locales: ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'],
    occupations: ['Engineer', 'Artist', 'Teacher', 'Doctor', 'Writer'],
    ages: Array.from({ length: 80 }, (_, i) => i + 18)
};

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomizeName() {
    const firstName = getRandomItem(randomizationData.firstNames);
    const lastName = getRandomItem(randomizationData.lastNames);
    const nameInput = document.querySelector('#name');
    nameInput.value = `${firstName} ${lastName}`;
    console.log(`Randomized name: ${nameInput.value}`);
}

function randomizeAge() {
    const age = getRandomItem(randomizationData.ages);
    document.querySelector('#age').value = age;
    console.log(`Randomized age: ${age}`);
}

function randomizeGender() {
    const gender = getRandomItem(randomizationData.genders);
    document.querySelector('#gender').value = gender;
    console.log(`Randomized gender: ${gender}`);
}

function randomizeLocale() {
    const locale = getRandomItem(randomizationData.locales);
    document.querySelector('#locale').value = locale;
    console.log(`Randomized locale: ${locale}`);
}

function randomizeOccupation() {
    const occupation = getRandomItem(randomizationData.occupations);
    document.querySelector('#occupation').value = occupation;
    console.log(`Randomized occupation: ${occupation}`);
}

function randomizeAllFields() {
    randomizeName();
    randomizeAge();
    randomizeGender();
    randomizeLocale();
    randomizeOccupation();
    console.log('Randomization data loaded:', randomizationData);
    setTimeout(() => console.log('Randomization applied and persisted'), 100);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Randomization data loaded:', randomizationData);
});