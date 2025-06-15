const traits = {
    traitList: [
        { category: 'Physical', characteristic: 'Barrel Chest', synonyms: '', description: 'Broad, robust chest.' },
        { category: 'Psychological', characteristic: 'Skeptical Pragmatism', synonyms: 'Cautious realism', description: 'Practical with a questioning mindset.' },
        { category: 'Physical', characteristic: 'Long Neck', synonyms: '', description: 'Elegant, extended neck.' }
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
                <tr class="cursor-pointer" onclick="document.querySelector('#traitDetails').innerHTML='Description: ${trait.description}';">
                    <td>${trait.category}</td>
                    <td>${trait.characteristic}</td>
                </tr>
            `).join('');
        }
        console.log(`Traits displayed: ${this.traitList.length}`);
    },
    displayTraitBubbles() {
        const bubbles = document.querySelector('#traitBubbles');
        if (bubbles) {
            bubbles.innerHTML = this.traitList.map(trait => `
                <div class="trait-bubble">${trait.characteristic}</div>
            `).join('');
        }
        console.log(`Trait bubbles displayed: ${this.traitList.length}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log(`Total traits loaded: ${traits.traitList.length}`);
});