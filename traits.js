const traits = {
    traitList: [
        { category: 'Physical', characteristic: 'Barrel Chest' },
        { category: 'Psychological', characteristic: 'Skeptical Pragmatism' }
    ],
    randomizeTraits() {
        const selected = this.traitList[Math.floor(Math.random() * this.traitList.length)].characteristic;
        document.querySelector('#traits').value = selected;
        console.log(`Randomized traits: ['${selected}']`);
    },
    displayTraits() {
        const tableBody = document.querySelector('#traitTableBody');
        if (tableBody) {
            tableBody.innerHTML = this.traitList.map(trait => `
                <tr>
                    <td>${trait.category}</td>
                    <td>${trait.characteristic}</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `).join('');
        }
        console.log(`Traits displayed: ${this.traitList.length}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log(`Total traits loaded: ${traits.traitList.length}`);
    traits.displayTraits();
});