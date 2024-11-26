// Timezone Selector
const timezoneSelector = document.getElementById("timezoneSelector");
const clock = document.getElementById("clock");

// Track if the time is manually set
let isManualUpdate = true;
let manualTime = null; // Store manually set time

function updateClock() {
    if (isManualUpdate && manualTime) {
        // Use manual time if manual update is active
        const { hours, minutes, seconds } = manualTime;
        updateClockHands(hours, minutes, seconds);
        return;
    }

    // Timezone-based updates
    const timezone = timezoneSelector.value;
    const now = new Date();
    const options = {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    // Format the time for the selected timezone
    const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
    const [hours, minutes, seconds] = timeString.split(":");

    // Update the clock hands
    updateClockHands(parseInt(hours), parseInt(minutes), parseInt(seconds));
}

function updateClockHands(hours, minutes, seconds) {
    const hourHand = document.getElementById("hour");
    const minuteHand = document.getElementById("minute");
    const secondHand = document.getElementById("second");

    const hourRotation = (hours % 12) * 30 + minutes * 0.5; // 360/12 = 30 degrees per hour
    const minuteRotation = minutes * 6; // 360/60 = 6 degrees per minute
    const secondRotation = seconds * 6; // 360/60 = 6 degrees per second

    hourHand.style.transform = `rotate(${hourRotation}deg)`;
    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
    secondHand.style.transform = `rotate(${secondRotation}deg)`;
}

// Event listener for timezone changes
timezoneSelector.addEventListener("change", () => {
    isManualUpdate = false; // Switch to timezone mode
    manualTime = null; // Clear manual time
    updateClock(); // Immediately update the clock to the new timezone
});

// Initialize the clock
setInterval(updateClock, 1000);

// Manual Time Adjustment
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const setTimeButton = document.getElementById("setTimeButton");

function setManualTime() {
    const timezone = timezoneSelector.value;

    // Get the manual time inputs
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    // Create a date object for the manual time
    const manualDate = new Date();
    manualDate.setHours(hours);
    manualDate.setMinutes(minutes);
    manualDate.setSeconds(seconds);

    // Convert manual time to UTC based on the selected timezone
    const options = { timeZone: timezone, hour12: false };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedTime = formatter.format(manualDate);
    const [adjustedHours, adjustedMinutes, adjustedSeconds] = formattedTime.split(":").map(Number);

    // Store the adjusted manual time
    manualTime = {
        hours: adjustedHours,
        minutes: adjustedMinutes,
        seconds: adjustedSeconds,
    };

    // Update the clock hands
    updateClockHands(manualTime.hours, manualTime.minutes, manualTime.seconds);

    // Set the manual update flag
    isManualUpdate = true;

    // Clear the inputs
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

// Event listener for manual time adjustment
setTimeButton.addEventListener("click", setManualTime);

// Customizable Clock Face
const clockFaceOptions = document.querySelectorAll('input[name="clockFace"]');
const wrapper = document.querySelector('.wrapper');

// Function to apply the selected clock face
function applyClockFace() {
    const selectedFace = document.querySelector('input[name="clockFace"]:checked').value.toLowerCase();

    // Remove existing theme classes
    wrapper.classList.remove('original', 'neon', 'negative');

    // Add the selected theme class
    wrapper.classList.add(selectedFace);
}

// Event listeners for clock face changes
clockFaceOptions.forEach(option => {
    option.addEventListener('change', applyClockFace);
});

// Apply the default clock face on load
applyClockFace();




