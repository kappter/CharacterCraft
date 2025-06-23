// Autobiography Introduction Templates with Rich Historical Elements

const AUTOBIOGRAPHY_INTROS = [
    // Quirky Positive Historical Elements
    {
        template: "I was born during the year when {positive_event}, which my mother always said was a good omen. She claimed it meant I'd have {positive_trait} throughout my life.",
        positive_events: [
            "the Berlin Wall fell", "Nelson Mandela was released from prison", "the first website went online",
            "the Hubble Space Telescope was launched", "the Human Genome Project began", "the first Earth Day was celebrated",
            "the first mobile phone call was made", "MTV started broadcasting", "the first personal computer was sold",
            "the first heart transplant was performed", "the first man walked on the moon", "the Beatles released their first album",
            "the first email was sent", "the first video game was created", "the first satellite was launched",
            "the polio vaccine was discovered", "the first television broadcast happened", "the first airplane flew",
            "the first radio transmission occurred", "the first photograph was taken", "the first electric light bulb was invented"
        ],
        positive_traits: [
            "an adventurous spirit", "natural curiosity", "the ability to bring people together", "resilience in tough times",
            "a gift for seeing beauty in ordinary things", "the courage to stand up for what's right", "an infectious optimism",
            "the wisdom to learn from mistakes", "a talent for making others laugh", "the strength to overcome obstacles",
            "a generous heart", "the ability to find hope in dark times", "natural leadership qualities",
            "an artistic soul", "the gift of empathy", "boundless creativity", "unwavering determination"
        ]
    },
    {
        template: "The day I was born, {unusual_positive} happened in our town, and my grandmother swore it was connected to my arrival. Looking back, maybe she was right about {positive_outcome}.",
        unusual_positive: [
            "a rare double rainbow appeared", "the first snow in fifty years fell", "a family of deer wandered through Main Street",
            "the old church bells rang by themselves", "a meteor shower lit up the sky", "the town's oldest tree bloomed out of season",
            "a lost dog found its way home after three years", "the local newspaper printed its first color photo",
            "a time capsule from 1920 was discovered", "the town's first traffic light was installed",
            "a famous author stopped by the local bookstore", "the high school won its first state championship",
            "a rare bird species was spotted in the town park", "the old movie theater reopened after decades",
            "a community garden was planted in the empty lot", "the town's first female mayor was elected"
        ],
        positive_outcomes: [
            "my ability to see wonder in everyday moments", "my talent for bringing good luck to others",
            "my knack for being in the right place at the right time", "my gift for helping lost things find their way",
            "my natural ability to light up a room", "my talent for growing things",
            "my skill at reuniting people with what they've lost", "my eye for capturing beautiful moments",
            "my ability to uncover hidden treasures", "my talent for creating order from chaos",
            "my gift for inspiring others through words", "my competitive spirit and drive to succeed",
            "my rare ability to spot what others miss", "my talent for bringing old things back to life",
            "my green thumb and nurturing nature", "my natural leadership abilities"
        ]
    },
    {
        template: "I came into this world during {historical_positive}, and my father used to joke that I inherited {inherited_gift} from that moment in history.",
        historical_positive: [
            "the Summer of Love", "the first moon landing", "the civil rights movement", "the invention of the internet",
            "the fall of the Berlin Wall", "the first Earth Day", "the discovery of DNA", "the golden age of jazz",
            "the Harlem Renaissance", "the space race", "the women's suffrage movement", "the invention of television",
            "the first computer", "the discovery of penicillin", "the first flight", "the invention of the telephone",
            "the first radio broadcast", "the discovery of electricity", "the industrial revolution", "the age of exploration"
        ],
        inherited_gift: [
            "a love for peace and harmony", "an explorer's heart", "a fighter's spirit for justice", "a connector's soul",
            "the ability to break down barriers", "a deep respect for nature", "a scientist's curiosity", "a musician's rhythm",
            "an artist's vision", "a pioneer's courage", "an advocate's voice", "a storyteller's gift",
            "an innovator's mind", "a healer's touch", "an adventurer's spirit", "a communicator's talent",
            "a broadcaster's presence", "an inventor's creativity", "a builder's determination", "a discoverer's wonder"
        ]
    },

    // Quirky Negative Historical Elements (Character-Building)
    {
        template: "I was born during {challenging_event}, which my mother said explained my {resilient_trait}. She always told me that difficult times create strong people.",
        challenging_events: [
            "the worst blizzard in decades", "a city-wide blackout", "the year of the great flood", "a major economic recession",
            "the coldest winter on record", "a historic drought", "the year the factory closed", "a nationwide strike",
            "the worst hurricane in memory", "a period of civil unrest", "the year of the oil crisis", "a major earthquake",
            "the stock market crash", "a severe flu pandemic", "the year of the coal shortage", "a transportation strike",
            "the worst crop failure in years", "a period of political upheaval", "the year of the great fire", "a major industrial accident"
        ],
        resilient_traits: [
            "stubborn determination", "ability to find warmth in cold situations", "talent for staying calm in chaos",
            "skill at making something from nothing", "natural resilience against hardship", "ability to bloom in tough conditions",
            "talent for rebuilding what's broken", "gift for bringing people together in crisis", "strength in the face of storms",
            "ability to stand firm when others waver", "skill at finding solutions in scarcity", "talent for staying grounded during upheaval",
            "ability to recover quickly from setbacks", "gift for caring for others during illness", "talent for creating light in darkness",
            "skill at keeping things moving when others stop", "ability to grow despite poor conditions", "gift for finding stability in uncertainty",
            "talent for rising from the ashes", "ability to learn from dangerous situations"
        ]
    },
    {
        template: "The year I was born, {family_challenge} happened to our family, but my parents always said it taught them {valuable_lesson}, which they passed on to me.",
        family_challenges: [
            "my father lost his job", "we had to move three times", "my grandmother got very sick", "our house was damaged in a storm",
            "my parents had to work multiple jobs", "we lived with relatives for months", "my father was deployed overseas",
            "we lost our family business", "my mother went back to school", "we had to sell our car", "my parents got divorced",
            "we moved to a new country", "my sibling was born with health issues", "we faced financial difficulties",
            "my grandparents moved in with us", "we had to care for a sick relative", "my father changed careers completely",
            "we moved from the city to a small town", "my mother started her own business", "we lived in temporary housing"
        ],
        valuable_lessons: [
            "that security comes from within, not from circumstances", "that family sticks together no matter what",
            "that health is more precious than wealth", "that home is wherever your family is",
            "that hard work always pays off eventually", "that kindness from others can save you",
            "that distance makes love stronger", "that sometimes you have to start over to grow",
            "that education is the one thing no one can take away", "that you can live with less than you think",
            "that love is more important than staying together", "that courage means starting fresh",
            "that everyone deserves care and patience", "that money isn't everything",
            "that wisdom comes from experience", "that helping others helps yourself",
            "that following your passion takes courage", "that community exists everywhere",
            "that taking risks can lead to rewards", "that temporary situations don't define you"
        ]
    },
    {
        template: "I entered the world during {historical_challenge}, and my grandfather used to say it gave me {character_strength} that would serve me well in life.",
        historical_challenges: [
            "the Great Depression", "World War II", "the Cold War", "the Vietnam War", "the oil crisis",
            "the civil rights struggles", "the women's liberation movement", "the environmental awakening", "the technology revolution",
            "the space race tensions", "the nuclear age fears", "the social upheaval of the sixties", "the economic uncertainty of the seventies",
            "the political scandals of the era", "the changing social norms", "the generation gap conflicts", "the urban decay period",
            "the rural-to-urban migration", "the industrial decline", "the cultural revolution"
        ],
        character_strengths: [
            "an appreciation for simple pleasures", "the ability to find hope in dark times", "a healthy skepticism of authority",
            "the courage to question what's wrong", "a deep understanding of sacrifice", "the ability to fight for what's right",
            "a strong sense of equality and justice", "a respect for the natural world", "the ability to adapt to rapid change",
            "the drive to reach for the stars", "the wisdom to prepare for uncertainty", "the strength to challenge the status quo",
            "the resilience to weather economic storms", "the ability to see through false promises", "the flexibility to embrace new ways",
            "the bridge-building skills between different worlds", "the determination to rebuild what's broken",
            "the courage to leave the familiar behind", "the strength to reinvent yourself", "the vision to see beyond current limitations"
        ]
    },

    // Unique Personal Elements
    {
        template: "My birth story is unusual because {unique_circumstance}, which my family says explains why I've always been {unique_trait}.",
        unique_circumstances: [
            "I was born in the back of a taxi during rush hour", "I arrived three weeks early during a family reunion",
            "I was born during a total solar eclipse", "I came into the world during my sister's wedding",
            "I was born on the same day as my great-grandmother's 100th birthday", "I arrived during the biggest snowstorm in decades",
            "I was born in an elevator between the 3rd and 4th floors", "I came into the world during a power outage",
            "I was born on a leap day", "I arrived during my parents' cross-country move",
            "I was born on the same day my grandfather passed away", "I came into the world during a family camping trip",
            "I was born during my mother's college graduation", "I arrived during a city-wide celebration",
            "I was born on New Year's Eve", "I came into the world during a family business opening"
        ],
        unique_traits: [
            "someone who thrives under pressure", "naturally adaptable to any situation", "drawn to rare and special moments",
            "able to bring joy to any celebration", "connected to family history and tradition", "resilient in harsh conditions",
            "good at finding solutions in tight spaces", "able to create light in dark situations", "special and one-of-a-kind",
            "comfortable with constant change", "able to find meaning in endings and beginnings", "at home in nature",
            "driven to achieve and celebrate success", "naturally festive and community-minded", "someone who marks important moments",
            "entrepreneurial and business-minded"
        ]
    }
];

// Historical Context Elements for Autobiography Generation
const HISTORICAL_CONTEXT = {
    positive_world_events: [
        "the invention of the internet changed everything", "the Berlin Wall came down", "Nelson Mandela was freed",
        "the first heart transplant gave people hope", "humans walked on the moon", "the polio vaccine was discovered",
        "the civil rights movement advanced equality", "women gained the right to vote", "the first Earth Day raised environmental awareness",
        "the peace movement spread across the world", "medical breakthroughs extended human life", "technology connected the globe",
        "space exploration expanded our horizons", "renewable energy offered new possibilities", "social media brought people together",
        "genetic research promised cures for diseases", "international cooperation increased", "literacy rates improved worldwide",
        "child mortality rates decreased significantly", "democracy spread to new nations"
    ],
    
    challenging_world_events: [
        "the world was dealing with economic uncertainty", "environmental concerns were growing", "political tensions were high",
        "social inequality was being challenged", "technological change was disrupting traditional ways",
        "globalization was changing local communities", "climate change was becoming apparent", "cultural conflicts were emerging",
        "traditional industries were declining", "urban problems were increasing", "rural communities were struggling",
        "generational differences were widening", "information overload was becoming common", "privacy concerns were growing",
        "job security was decreasing", "healthcare costs were rising", "education systems were being questioned",
        "family structures were changing", "religious institutions were evolving", "media influence was expanding"
    ],
    
    personal_positive_elements: [
        "my family always believed in education", "we had a tradition of Sunday dinners", "my grandmother told the best stories",
        "our house was always full of music", "we took annual camping trips", "my parents encouraged my curiosity",
        "we had a big garden where I learned to grow things", "our neighborhood was like an extended family",
        "my family valued hard work and honesty", "we celebrated every small achievement", "our home was open to anyone who needed help",
        "my parents taught me to stand up for others", "we had family game nights every Friday", "my family encouraged my creativity",
        "we volunteered together at local charities", "my parents showed me the value of reading", "our family meals were sacred time",
        "we took pride in our cultural heritage", "my family taught me to appreciate nature", "we believed in second chances"
    ],
    
    personal_challenges: [
        "money was always tight in our household", "my parents worked multiple jobs to make ends meet",
        "we moved frequently due to my father's work", "my family dealt with illness and health scares",
        "we lived in a rough neighborhood", "my parents divorced when I was young", "we struggled with language barriers",
        "my family faced discrimination", "we dealt with addiction issues", "my parents had different cultural backgrounds",
        "we lived far from extended family", "my family business failed", "we faced housing instability",
        "my parents had very different parenting styles", "we dealt with mental health challenges", "my family was very traditional in a changing world",
        "we struggled with technology and modern life", "my parents had unrealistic expectations", "we faced religious or cultural conflicts",
        "my family was very private and didn't share emotions"
    ]
};

// Export for use in autobiography generation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AUTOBIOGRAPHY_INTROS, HISTORICAL_CONTEXT };
}

