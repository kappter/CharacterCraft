# CharacterCraft

CharacterCraft is a web application designed to assist writers in creating vivid, believable characters for their stories. Inspired by *The Writer's Digest Sourcebook for Building Believable Characters* by Marc McCutcheon, the app provides tools to generate character bios, compare characters, manage traits, and save character profiles. With a modern, user-friendly interface, CharacterCraft supports both manual input and randomization to spark creativity, making it ideal for novelists, screenwriters, and role-playing game enthusiasts.

## Features

### 1. Character Creation
- **Input Fields**: Create characters by entering details such as name, age, gender, locale, occupation, and personality traits.
- **Randomization**: Each input field includes a "Randomize" button to auto-generate values (e.g., random names, ages between 18-80, locales like New York or Tokyo, occupations like Writer or Engineer, and 1-3 psychological traits).
- **Bio Generation**: Generate a short bio (~100 words) and an extended bio (~1000 words, approximated via repetition) based on user inputs and traits from CSV files.
- **Trait Integration**: Bios incorporate traits from four categories (Physical, Psychological, Background, Motivations) loaded from CSV files, ensuring rich, varied descriptions.
- **Save Functionality**: Save characters to localStorage for later use or editing.

### 2. Character Comparison
- Compare two saved characters to identify commonalities, points of contention, and potential transition points in their interactions.
- Useful for plotting character dynamics or conflicts in a story.

### 3. Trait List Management
- View a table of all traits, organized by category (Physical, Psychological, Background, Motivations, Custom).
- Add new traits with a category, characteristic, synonyms, and description, dynamically updating the in-memory trait list.
- Traits are sourced from four CSV files, allowing for easy expansion of the trait database.

### 4. Saved Characters
- Display a list of all saved characters with their details (name, age, gender, locale, occupation, traits).
- Edit saved characters via a form, tweaking any field and updating the stored data.
- Persistent storage using localStorage ensures characters are retained across sessions.

### 5. Modern UI
- **Tabbed Interface**: Navigate between Create Character, Compare Characters, Trait List, and Saved Characters tabs for a focused workflow.
- **Dark Mode**: Toggle between light and dark themes with a switch in the header, with preferences saved in localStorage.
- **Fixed Header/Footer**: A fixed header displays the app title and dark mode toggle; a fixed footer shows a copyright notice.
- **Responsive Design**: Built with Tailwind CSS and Inter font, the UI adapts to mobile, tablet, and desktop screens.
- **Animations**: Subtle transitions for tab switches, button hovers, and dark mode toggle enhance user engagement.

### 6. Data-Driven Traits
- Traits are loaded from four CSV files:
  - `physical_traits.csv`: Physical characteristics (e.g., weathered hands, sharp cheekbones).
  - `psychological_traits.csv`: Personality traits (e.g., restless curiosity, quiet resolve).
  - `background_details.csv`: Life history (e.g., coastal childhood, wanderer’s past).
  - `motivations_beliefs.csv`: Core drives and values (e.g., quest for redemption, pursuit of knowledge).
- Each CSV follows the format: `category,characteristic,synonyms,description`, enabling easy customization.

## Intent
CharacterCraft aims to streamline the character creation process by providing a structured yet flexible toolset. Drawing from the principles of *The Writer's Digest Sourcebook for Building Believable Characters*, the app emphasizes depth and authenticity in character design. Writers can:
- Quickly generate character ideas with randomization.
- Craft detailed bios to flesh out backstories and motivations.
- Compare characters to explore narrative dynamics.
- Customize traits to suit specific genres or settings.
The modern, intuitive interface ensures accessibility for both novice and experienced writers, fostering creativity without overwhelming the user.

## Installation and Usage

1. **Clone or Download**:
   - Clone the repository or download the project files.

2. **File Structure**:
   - Ensure the following files are in the same directory:
     - `index.html`: Main HTML file.
     - `styles.css`: Custom CSS for theme-specific styles.
     - `script.js`: JavaScript for functionality.
     - `physical_traits.csv`: Physical trait data.
     - `psychological_traits.csv`: Psychological trait data.
     - `background_details.csv`: Background trait data.
     - `motivations_beliefs.csv`: Motivations and beliefs trait data.

3. **Serve the App**:
   - Use a local server to enable CSV fetching (e.g., Python’s HTTP server):
     ```bash
     python -m http.server
     ```
   - Open `http://localhost:8000` in a web browser.

4. **Usage Instructions**:
   - **Create Character Tab**:
     - Enter details manually or click "Randomize" buttons to auto-fill fields.
     - Click "Generate Bios" to create short and extended bios.
     - Click "Save Character" to store the character and navigate to the Saved Characters tab.
   - **Compare Characters Tab**:
     - Select two saved characters and click "Compare" to view commonalities and conflicts.
   - **Trait List Tab**:
     - View existing traits or add new ones by filling out the form and clicking "Add Trait".
   - **Saved Characters Tab**:
     - View saved characters or select one to edit, updating details as needed.
   - **Dark Mode**: Toggle dark mode via the switch in the header.

## Development Notes
- **Tech Stack**:
  - HTML, Tailwind CSS, and JavaScript for the frontend.
  - Inter font (via Google Fonts CDN) for typography.
  - localStorage for persistent character and theme storage.
  - CSV files for trait data, parsed client-side.
- **Limitations**:
  - Extended bio length (~1000 words) is approximated via repetition; a future version could use a narrative generator.
  - New traits are stored in-memory and reset on page refresh; a backend could persist them to CSV files.
  - Randomization lists (names, occupations) are small; expand them for greater variety.
- **Future Enhancements**:
  - Backend integration for persistent trait storage.
  - Advanced bio generation with unique narratives.
  - Export/import characters as JSON or CSV.
  - Randomize buttons for the Edit Character form.

## License
This project is for educational and personal use, inspired by *The Writer's Digest Sourcebook for Building Believable Characters*. No commercial use is intended. All rights reserved for original content and concepts.

## Acknowledgments
- *The Writer's Digest Sourcebook for Building Believable Characters* by Marc McCutcheon for inspiration.
- Tailwind CSS and Inter font for design resources.