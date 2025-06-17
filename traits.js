const traits = {
    traitList: ['Brave', 'Cunning', 'Barrel Chest', 'Wise', 'Loyal'],
    randomizedTraits: [],

    randomizeTraits() {
        const numTraits = Math.floor(Math.random() * 3) + 1; // 1 to 3 traits
        this.randomizedTraits = [];
        while (this.randomizedTraits.length < numTraits) {
            const trait = this.traitList[Math.floor(Math.random() * this.traitList.length)];
            if (!this.randomizedTraits.includes(trait)) {
                this.randomizedTraits.push(trait);
            }
        }
        console.log(`Randomized traits: ${JSON.stringify(this.randomizedTraits)}`);
        return this.randomizedTraits;
    },

    displayTraits() {
        const details = document.querySelector('#traitDetails');
        if (details) {
            details.innerHTML = this.traitList.map(trait => `<p>${trait}</p>`).join('');
            console.log(`Traits displayed: ${this.traitList.length}`);
        }
    },

    displayTraitBubbles() {
        const bubbles = document.querySelector('#selectedTraits');
        if (bubbles) {
            bubbles.innerHTML = this.traitList.map(trait => `<button class="trait-bubble">${trait}</button>`).join('');
            console.log(`Trait bubbles displayed: ${this.traitList.length}`);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log(`Total traits loaded: ${traits.traitList.length}`);
    if (typeof traits.displayTraits === 'function') traits.displayTraits();
    if (typeof traits.displayTraitBubbles === 'function') traits.displayTraitBubbles();
});