# TypeFlow

TypeFlow is a speed typing practice web application that offers customizable typing exercises with various difficulty levels and content sources.

## Features

- Multiple text sources:
  - Default pre-defined texts
  - Wikipedia articles
  - AI-generated content using Google's Gemini API
- Adjustable difficulty levels: Easy, Medium, Hard
- Real-time typing statistics:
  - Input characters
  - Total words
  - Total characters
- Results summary:
  - Correct characters
  - Correct words
  - Words per minute (WPM)
  - Time record

## Technologies Used

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- PHP
- Google Generative AI API

## Setup and Installation

1. Clone the repository:
    git clone https://github.com/bn-salah05/speed_typing_practice.git

2. Set up a local web server (e.g., Apache, Nginx) with PHP support.

3. Configure your web server to serve the project directory.

4. Create a `.env` file in the project root and add your Google Generative AI API key:
    API_KEY=your_api_key_here

5. Open the application in your web browser.

## Usage

1. Select a text source (Default, Wikipedia, or Gemini).
2. If using Wikipedia or Gemini, enter a topic.
3. Choose a difficulty level.
4. Click "Start" to begin the typing exercise.
5. Type the displayed text as accurately and quickly as possible.
6. View your results and statistics after completing the exercise.

## Project Structure

- `index.html`: Main HTML file
- `JS_Files/`: JavaScript modules
- `DOM.js`: DOM element references
- `getPreferences.js`: User preference handling
- `processPreferences.js`: Preference processing
- `fetchLocal.js`: Local text fetching
- `fetchRemote_Wikimedia.js`: Wikipedia API integration
- `fetchRemote_Gemini.js`: Google Generative AI integration
- `statistics.js`: Typing statistics calculation
- `displayRefText.js`: Text display and formatting
- `time_management.js`: Timer functionality
- `verify.js`: Input verification and results
- `Local_Files/`: Local text storage
- `APIs/`: PHP scripts for API interactions
- `log_visitor.php`: Visitor logging functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
