document.addEventListener("DOMContentLoaded", () => {
    const habitNameInput = document.getElementById("habit-name");
    const addHabitButton = document.getElementById("add-habit-button");
    const habitsList = document.getElementById("habits");
    const calendar = document.getElementById("calendar");
    const motivationalMessage = document.getElementById("motivational-message");

    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    addHabitButton.addEventListener("click", () => {
        const habitName = habitNameInput.value.trim();
        if (habitName) {
            addHabit(habitName);
            habitNameInput.value = "";
        }
    });

    function addHabit(name) {
        const habit = { name, days: {} };
        habits.push(habit);
        saveHabits();
        renderHabits();
        renderCalendar();
        showMotivationalMessage();
    }

    function saveHabits() {
        localStorage.setItem("habits", JSON.stringify(habits));
    }

    function renderHabits() {
        habitsList.innerHTML = "";
        habits.forEach((habit, index) => {
            const habitItem = document.createElement("li");
            habitItem.textContent = habit.name;
            const actions = document.createElement("div");
            actions.className = "habit-actions";

            const editButton = document.createElement("button");
            editButton.className = "edit-button";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => {
                const newName = prompt("Edit habit name:", habit.name);
                if (newName) {
                    habit.name = newName;
                    saveHabits();
                    renderHabits();
                    renderCalendar();
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                habits.splice(index, 1);
                saveHabits();
                renderHabits();
                renderCalendar();
            });

            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            habitItem.appendChild(actions);
            habitsList.appendChild(habitItem);
        });
    }

    function renderCalendar() {
        calendar.innerHTML = "";
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.className = "day";
            day.textContent = i;

            day.addEventListener("click", () => {
                const habitIndex = prompt("Enter the habit number to mark the day (1-" + habits.length + "):");
                if (habitIndex && habitIndex > 0 && habitIndex <= habits.length) {
                    const habit = habits[habitIndex - 1];
                    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${i}`;
                    habit.days[dateString] = !habit.days[dateString];
                    saveHabits();
                    renderCalendar();
                }
            });

            const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${i}`;
            habits.forEach(habit => {
                if (habit.days[dateString]) {
                    day.classList.add("completed");
                }
            });

            calendar.appendChild(day);
        }
    }

    function showMotivationalMessage() {
        const messages = [
            "Keep going! You're doing great!",
            "Every day is a new opportunity!",
            "Small steps lead to big changes.",
            "Stay positive and keep pushing forward."
        ];
        motivationalMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
    }

    renderHabits();
    renderCalendar();
    showMotivationalMessage();
});
