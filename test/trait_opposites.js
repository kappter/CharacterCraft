// Comprehensive Trait Opposites Mapping for CharacterCraft
// This file contains the complete mapping of personality traits to their opposites
// Used for hover effects and split bubble functionality

const TRAIT_OPPOSITES = {
    // Personality Core Types
    "Creative": "Conventional",
    "Conventional": "Creative",
    "Analytical": "Intuitive", 
    "Intuitive": "Analytical",
    "Empathetic": "Detached",
    "Detached": "Empathetic",
    "Ambitious": "Content",
    "Content": "Ambitious",
    "Calm": "Anxious",
    "Anxious": "Calm",
    "Optimistic": "Pessimistic",
    "Pessimistic": "Optimistic",
    "Introverted": "Extroverted",
    "Extroverted": "Introverted",
    "Spontaneous": "Methodical",
    "Methodical": "Spontaneous",
    "Independent": "Dependent",
    "Dependent": "Independent",
    "Logical": "Emotional",
    "Emotional": "Logical",

    // Social & Interpersonal Traits
    "Charismatic": "Awkward",
    "Awkward": "Charismatic",
    "Diplomatic": "Blunt",
    "Blunt": "Diplomatic",
    "Resourceful": "Helpless",
    "Helpless": "Resourceful",
    "Determined": "Indecisive",
    "Indecisive": "Determined",
    "Witty": "Humorless",
    "Humorless": "Witty",
    "Loyal": "Fickle",
    "Fickle": "Loyal",
    "Generous": "Selfish",
    "Selfish": "Generous",
    "Honest": "Deceptive",
    "Deceptive": "Honest",
    "Patient": "Impatient",
    "Impatient": "Patient",
    "Friendly": "Hostile",
    "Hostile": "Friendly",
    "Confident": "Insecure",
    "Insecure": "Confident",
    "Humble": "Arrogant",
    "Arrogant": "Humble",
    "Trusting": "Suspicious",
    "Suspicious": "Trusting",
    "Forgiving": "Vindictive",
    "Vindictive": "Forgiving",
    "Sociable": "Antisocial",
    "Antisocial": "Sociable",
    "Open-minded": "Close-minded",
    "Close-minded": "Open-minded",
    "Inclusive": "Exclusive",
    "Exclusive": "Inclusive",

    // Work & Professional Traits
    "Hardworking": "Lazy",
    "Lazy": "Hardworking",
    "Dedicated": "Uncommitted",
    "Uncommitted": "Dedicated",
    "Focused": "Distracted",
    "Distracted": "Focused",
    "Curious": "Indifferent",
    "Indifferent": "Curious",
    "Perfectionist": "Careless",
    "Careless": "Perfectionist",
    "Innovative": "Traditional",
    "Traditional": "Innovative",
    "Organized": "Chaotic",
    "Chaotic": "Organized",
    "Practical": "Idealistic",
    "Idealistic": "Practical",
    "Cautious": "Reckless",
    "Reckless": "Cautious",
    "Flexible": "Rigid",
    "Rigid": "Flexible",
    "Competitive": "Cooperative",
    "Cooperative": "Competitive",
    "Leader": "Follower",
    "Follower": "Leader",
    "Detail-oriented": "Big-picture",
    "Big-picture": "Detail-oriented",
    "Efficient": "Inefficient",
    "Inefficient": "Efficient",
    "Thorough": "Superficial",
    "Superficial": "Thorough",
    "Progressive": "Conservative",
    "Conservative": "Progressive",

    // Emotional & Psychological Traits
    "Sensitive": "Insensitive",
    "Insensitive": "Sensitive",
    "Passionate": "Apathetic",
    "Apathetic": "Passionate",
    "Artistic": "Unartistic",
    "Unartistic": "Artistic",
    "Eccentric": "Conventional",
    "Mysterious": "Transparent",
    "Transparent": "Mysterious",
    "Mischievous": "Serious",
    "Serious": "Mischievous",
    "Spiritual": "Materialistic",
    "Materialistic": "Spiritual",
    "Cheerful": "Gloomy",
    "Gloomy": "Cheerful",
    "Even-tempered": "Moody",
    "Moody": "Even-tempered",
    "Stoic": "Expressive",
    "Expressive": "Stoic",
    "Philosophical": "Pragmatic",
    "Pragmatic": "Philosophical",
    "Imaginative": "Literal",
    "Literal": "Imaginative",
    "Theoretical": "Applied",
    "Applied": "Theoretical",

    // Behavioral & Lifestyle Traits
    "Adventurous": "Cautious",
    "Outgoing": "Reserved",
    "Reserved": "Outgoing",
    "Energetic": "Lethargic",
    "Lethargic": "Energetic",
    "Disciplined": "Undisciplined",
    "Undisciplined": "Disciplined",
    "Punctual": "Tardy",
    "Tardy": "Punctual",
    "Neat": "Messy",
    "Messy": "Neat",
    "Frugal": "Spendthrift",
    "Spendthrift": "Frugal",
    "Health-conscious": "Indulgent",
    "Indulgent": "Health-conscious",
    "Tech-savvy": "Tech-averse",
    "Tech-averse": "Tech-savvy",
    "Urban": "Rural",
    "Rural": "Urban",
    "Minimalist": "Maximalist",
    "Maximalist": "Minimalist",

    // Communication & Expression
    "Articulate": "Inarticulate",
    "Inarticulate": "Articulate",
    "Verbose": "Concise",
    "Concise": "Verbose",
    "Persuasive": "Unconvincing",
    "Unconvincing": "Persuasive",
    "Eloquent": "Tongue-tied",
    "Tongue-tied": "Eloquent",
    "Direct": "Indirect",
    "Indirect": "Direct",
    "Tactful": "Tactless",
    "Tactless": "Tactful",

    // Moral & Ethical Traits
    "Principled": "Unprincipled",
    "Unprincipled": "Principled",
    "Ethical": "Unethical",
    "Unethical": "Ethical",
    "Fair": "Unfair",
    "Unfair": "Fair",
    "Just": "Unjust",
    "Unjust": "Just",
    "Compassionate": "Ruthless",
    "Ruthless": "Compassionate",
    "Altruistic": "Self-serving",
    "Self-serving": "Altruistic",

    // Learning & Growth
    "Studious": "Negligent",
    "Negligent": "Studious",
    "Inquisitive": "Incurious",
    "Incurious": "Inquisitive",
    "Adaptable": "Inflexible",
    "Inflexible": "Adaptable",
    "Open to feedback": "Defensive",
    "Defensive": "Open to feedback",
    "Growth-minded": "Fixed-minded",
    "Fixed-minded": "Growth-minded",

    // Risk & Decision Making
    "Bold": "Timid",
    "Timid": "Bold",
    "Decisive": "Hesitant",
    "Hesitant": "Decisive",
    "Risk-taking": "Risk-averse",
    "Risk-averse": "Risk-taking",
    "Impulsive": "Deliberate",
    "Deliberate": "Impulsive",
    "Proactive": "Reactive",
    "Reactive": "Proactive"
};

// Function to get the opposite of a trait
function getOpposite(trait) {
    return TRAIT_OPPOSITES[trait] || null;
}

// Function to check if a trait has an opposite
function hasOpposite(trait) {
    return trait in TRAIT_OPPOSITES;
}

// Function to get all trait pairs
function getAllTraitPairs() {
    const pairs = [];
    const processed = new Set();
    
    for (const [trait, opposite] of Object.entries(TRAIT_OPPOSITES)) {
        if (!processed.has(trait) && !processed.has(opposite)) {
            pairs.push([trait, opposite]);
            processed.add(trait);
            processed.add(opposite);
        }
    }
    
    return pairs;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TRAIT_OPPOSITES, getOpposite, hasOpposite, getAllTraitPairs };
}

