# CharacterCraft

CharacterCraft is a web-based tool inspired by *The Writer's Digest Sourcebook for Building Believable Characters* by Marc McCutcheon. It helps writers, educators, and storytellers create and manage detailed, believable characters through randomization, trait assignment, and bio generation. The app features a responsive interface with dark mode, exportable HTML reports, and an interactive Trait Bubbles screen with category filtering for dynamic character development.

**Live Demo**: [kappter.github.io/CharacterCraft](https://kappter.github.io/CharacterCraft)

## Features

- **Create Character**: Build characters with randomized or manual inputs for name, age, gender, locale, occupation, and personality traits. Generate short and detailed bios, and export detailed bios as HTML files (enabled after saving).
- **Compare Characters**: Select two saved characters, choose a context (e.g., "midnight stakeout"), and generate a comparison highlighting commonalities and conflicts. Export comparisons as HTML reports.
- **Trait List**: View and add custom traits across categories (Physical, Psychological, Heredity, Background, Motivations, Custom). Traits are sourced from CSV files for easy expansion.
- **Saved Characters**: Save, view, and edit characters stored in `localStorage`. Edit fields like name, traits, or occupation.
- **Trait Bubbles**: Assign traits to saved characters via an interactive screen with clickable trait bubbles, filtered by category (e.g., Physical, Psychological). Updates are saved to `localStorage`.
- **Dark Mode**: Toggle between light and dark themes, with preferences saved in `localStorage`.
- **Responsive Design**: Built with Tailwind CSS and custom styles for mobile and desktop compatibility.
- **Data-Driven**: Uses CSV files (`physical_traits.csv`, `psychological_traits.csv`, etc.) and `randomization_data.json` for flexible trait and randomization options.

## Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- A local server (e.g., Python’s `http.server`) for development to avoid CORS issues with file loading.
- Git for cloning the repository.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kappter/CharacterCraft.git
   cd CharacterCraft
   ```
2. Ensure all files are in the root directory:
   - `index.html`, `trait_bubbles.html`
   - `styles.css`, `script.js`, `utils.js`, `characters.js`, `traits.js`, `ui.js`, `trait_bubbles_logic.js`
   - `randomization_data.json`
   - `physical_traits.csv`, `psychological_traits.csv`, `background_details.csv`, `motivations_beliefs.csv`
   - `favicon.ico`, `cclogo.png`
3. Start a local server:
   ```bash
   python -m http.server 8000
   ```
4. Open `http://localhost:8000` in your browser.

### Deployment
- **GitHub Pages**: Push to the `gh-pages` branch of your repository (`kappter/CharacterCraft`). The app is live at `https://kappter.github.io/CharacterCraft`.
- Ensure all assets (CSV, JSON, images) are included in the repository.
- Clear browser cache (`Ctrl+Shift+R`) if updates don’t appear.

## Usage

1. **Create a Character**:
   - Input or randomize name, age, gender, locale, occupation, and traits using the "Randomize" buttons.
   - Click "Generate Bios" to view short and detailed bios.
   - Click "Save Character" to enable the "Export Detailed Bio" button and download an HTML file.
2. **Compare Characters**:
   - Select two saved characters and a context.
   - Click "Compare" to see a detailed comparison.
   - Click "Export Comparison Report" to download an HTML report.
3. **Trait List**:
   - View all traits in a table, populated from CSV files.
   - Add custom traits with category, characteristic, synonyms, and description.
4. **Saved Characters**:
   - View all saved characters.
   - Edit character details via the edit form.
5. **Trait Bubbles**:
   - Navigate to the Trait Bubbles tab.
   - Select a saved character from the dropdown.
   - Filter traits by category (e.g., Physical, Psychological, Heredity) using buttons.
   - Click trait bubbles to toggle assignment, then click "Save Traits" to update the character.
6. **Dark Mode**:
   - Toggle dark mode in the header. Theme persists across sessions.

## File Structure

- **HTML**:
  - `index.html`: Main app with Create, Compare, Trait List, and Saved Characters tabs.
  - `trait_bubbles.html`: Interactive screen for assigning traits via bubbles with category filters.
- **CSS**:
  - `styles.css`: Custom styles with CSS variables for light/dark themes, plus Tailwind CSS.
- **JavaScript**:
  - `script.js`: Entry point for initializing the app.
  - `utils.js`: Randomization functions, CSV parsing, and theme toggle.
  - `characters.js`: Character creation, saving, editing, comparison, and exports.
  - `traits.js`: Trait loading, display, and management.
  - `ui.js`: Tab switching, form clearing, and app reset.
  - `trait_bubbles_logic.js`: Trait bubble interactions and character trait updates.
- **Data**:
  - `randomization_data.json`: Names, locales, occupations, and contexts for randomization.
  - `physical_traits.csv`, `psychological_traits.csv`, `background_details.csv`, `motivations_beliefs.csv`: Trait data, including new Heredity category.
- **Assets**:
  - `favicon.ico`, `cclogo.png`: Branding images.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure:
- Code follows existing style (e.g., Tailwind classes, CSS variables).
- New features include tests or manual testing steps.
- Update `README.md` for significant changes.

## Issues

- **Buttons Not Working**: If randomization buttons fail, ensure `utils.js` loads correctly and check Console (F12) for errors like `ReferenceError`.
- **Trait List/Trait Bubbles Empty**: Run on a local server (`python -m http.server`) to avoid CORS issues with CSV loading. Check Console for fetch errors.
- **Dropdowns Empty**: Verify characters are saved in `localStorage` and `characters.js` is updating dropdowns.
- **GitHub Pages**: Clear cache (`Ctrl+Shift+R`) if updates don’t appear.
- Report bugs or feature requests via GitHub Issues.

## License

© 2025 CharacterCraft. All Rights Reserved. This project is for educational and personal use, inspired by *The Writer's Digest Sourcebook for Building Believable Characters*.

## Acknowledgments

- Built with [Tailwind CSS](https://tailwindcss.com/) and [Google Fonts (Inter)](https://fonts.google.com/).
- Inspired by *The Writer's Digest Sourcebook for Building Believable Characters* by Marc McCutcheon.
- Developed for writers and educators to craft compelling character narratives.