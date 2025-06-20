const traits = {
    data: {
        traits: ['Brave', 'Kind', 'Curious', 'Loyal', 'Wise']
    },
    randomizeTraits() {
        const selectedTraits = [];
        for (let i = 0; i < 3; i++) {
            selectedTraits.push(this.data.traits[Math.floor(Math.random() * this.data.traits.length)]);
        }
        this.randomizedTraits = [...new Set(selectedTraits)]; // Remove duplicates
        document.querySelector('#traits').value = this.randomizedTraits.join(', ');
    },
    displayTraits() {
        const traitsList = document.querySelector('#traitsList');
        if (traitsList) {
            traitsList.innerHTML = this.data.traits.map(trait => `<p>${trait}</p>`).join('');
            console.log(`Total traits loaded: ${this.data.traits.length}`);
        }
    },
    displayTraitBubbles() {
        const container = document.querySelector('#traitBubbleContainer');
        if (container) {
            container.innerHTML = this.data.traits.map(trait => `<span class="trait-bubble">${trait}</span>`).join('');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    traits.displayTraits();
    traits.displayTraitBubbles();
});
