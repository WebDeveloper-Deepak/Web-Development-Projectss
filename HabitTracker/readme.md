# Habit Tracker

A simple and interactive habit tracker built with HTML, CSS, and JavaScript. This application allows you to add, edit, and delete habits, track daily progress, and visualize your habit streaks on a calendar. Motivational messages are also included to help keep you motivated.

## Features

- Add new habits
- Edit and delete existing habits
- Track daily progress for each habit
- Display a detailed calendar view for each habit
- Save data using `localStorage` for persistence
- Receive motivational messages

## File Structure

```
habit-tracker/
├── index.html
├── styles.css
├── script.js
```

## Getting Started

### Prerequisites

You only need a modern web browser to run this application.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adarsh01208/habit-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd habit-tracker
   ```

3. Open `index.html` in your web browser to start the habit tracker.

## Usage

1. **Add a New Habit:**
   - Enter the habit name in the input field at the top.
   - Click the "Add Habit" button to add the habit to the list.

2. **Edit a Habit:**
   - Click the "Edit" button next to the habit you want to edit.
   - Enter the new habit name and confirm the change.

3. **Delete a Habit:**
   - Click the "Delete" button next to the habit you want to delete.

4. **Track Daily Progress:**
   - Click on a day in the calendar to mark it as completed for a specific habit.
   - Enter the habit number corresponding to the habit you want to mark.

5. **Motivational Messages:**
   - View motivational messages at the bottom of the page to stay inspired.

## Code Overview

### HTML (index.html)

The HTML file contains the structure of the habit tracker, including sections for adding habits, displaying the habit list, showing the progress calendar, and motivational messages.

### CSS (styles.css)

The CSS file provides styling for the habit tracker, ensuring a clean and user-friendly interface.

### JavaScript (script.js)

The JavaScript file handles the functionality of the habit tracker, including:
- Adding, editing, and deleting habits.
- Rendering the habit list and calendar.
- Tracking progress and storing data in `localStorage`.
- Displaying motivational messages.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to create a pull request or open an issue.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Happy tracking! Stay motivated and keep building positive habits!