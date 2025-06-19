(function() {
    window.utils = {
        data: null, // Placeholder for data
        getRandomItem: function(array) {
            return array.length ? array[Math.floor(Math.random() * array.length)] : 'Unknown';
        },
        randomizeName: function() {
            if (!this.data || !this.data.firstNames || !this.data.lastNames) return 'Unknown Name';
            return `${this.getRandomItem(this.data.firstNames)} ${this.getRandomItem(this.data.lastNames)}`;
        },
        randomizeAge: function() {
            return Math.floor(Math.random() * 100) + 1;
        },
        randomizeGender: function() {
            if (!this.data || !this.data.genders) return 'Unknown';
            return this.getRandomItem(this.data.genders);
        },
        randomizeLocale: function() {
            if (!this.data || !this.data.locales) return 'Unknown';
            return this.getRandomItem(this.data.locales);
        },
        randomizeOccupation: function() {
            if (!this.data || !this.data.occupations) return 'Unknown';
            return this.getRandomItem(this.data.occupations);
        },
        randomizeTraits: function() {
            if (!this.data || !this.data.traits) return [];
            const count = Math.floor(Math.random() * 8) + 3; // 3 to 10 traits
            const shuffled = [...this.data.traits].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        },
        randomizeAllFields: function() {
            if (!this.data) return;
            const name = this.randomizeName();
            const age = this.randomizeAge();
            const gender = this.randomizeGender();
            const locale = this.randomizeLocale();
            const occupation = this.randomizeOccupation();
            const traits = this.randomizeTraits().join(', ');

            const inputs = {
                '#name': name,
                '#age': age,
                '#gender': gender,
                '#locale': locale,
                '#occupation': occupation,
                '#traits': traits
            };

            Object.entries(inputs).forEach(([id, value]) => {
                const input = document.querySelector(id);
                if (input) input.value = value;
            });

            console.log('Randomized all fields:', { name, age, gender, locale, occupation, traits });
        }
    };

    function loadRandomData() {
        Papa.parse('random_data.csv', {
            download: true,
            header: true,
            delimiter: ',', // Explicitly set comma as delimiter
            complete: function(results) {
                console.log('Raw CSV data structure:', results);
                console.log('Parsed CSV data:', results.data);
                console.log('CSV headers:', results.meta.fields); // Log headers to verify mapping
                const data = results.data.filter(row => row && typeof row === 'object' && row.firstNames);
                if (data.length === 0) {
                    console.error('No valid data found in random_data.csv');
                    initializeFallbackData();
                    return;
                }
                data.forEach(row => console.log('Row data:', row)); // Log each row
                window.utils.data = {
                    firstNames: [...new Set(data.map(row => row.firstNames).filter(n => n && typeof n === 'string'))],
                    lastNames: [...new Set(data.map(row => row.lastNames).filter(n => n && typeof n === 'string'))],
                    genders: [...new Set(data.map(row => row.genders).filter(g => g && typeof g === 'string'))],
                    locales: [...new Set(data.map(row => row.locales).filter(l => l && typeof l === 'string'))],
                    occupations: [...new Set(data.map(row => row.occupations).filter(o => o && typeof o === 'string'))],
                    traits: [...new Set(data.flatMap(row => {
                        if (row.traits && typeof row.traits === 'string') {
                            return row.traits.split(',').map(t => t.trim()).filter(t => t && typeof t === 'string');
                        }
                        console.warn('Invalid traits:', row.traits, 'Row:', row);
                        return [];
                    }))]
                };
                console.log('Loaded data per column:', {
                    firstNames: window.utils.data.firstNames.length,
                    lastNames: window.utils.data.lastNames.length,
                    genders: window.utils.data.genders.length,
                    locales: window.utils.data.locales.length,
                    occupations: window.utils.data.occupations.length,
                    traits: window.utils.data.traits.length
                });
                if (!window.utils.data.firstNames.length || !window.utils.data.traits.length) {
                    console.warn('Insufficient data from CSV, using fallback');
                    initializeFallbackData();
                } else {
                    console.log('Randomization data loaded:', window.utils.data);
                }
            },
            error: function(error) {
                console.error('Failed to load random_data.csv:', error);
                initializeFallbackData();
            }
        });
    }

    function initializeFallbackData() {
        window.utils.data = {
            firstNames: ['John', 'Sam', 'Emily', 'Alex', 'Jane'],
            lastNames: ['Smith', 'Doe', 'Wilson', 'Taylor', 'Davis'],
            genders: ['Male', 'Female', 'Non-binary'],
            locales: ['New York', 'Los Angeles', 'Chicago', 'Sydney', 'London'],
            occupations: ['Engineer', 'Teacher', 'Writer', 'Artist', 'Doctor'],
            traits: ['Loyal', 'Brave', 'Wise', 'Cunning', 'Calm']
        };
        console.warn('Using fallback data due to CSV load or data issue');
    }

    // Ensure utils is loaded before other scripts
    document.addEventListener('DOMContentLoaded', function() {
        loadRandomData();
        setTimeout(() => {
            if (!window.utils.data) {
                console.error('Utils data not initialized, forcing fallback');
                initializeFallbackData();
            }
        }, 1000);
    });
})();