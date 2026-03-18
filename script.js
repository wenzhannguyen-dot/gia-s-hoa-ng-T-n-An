// Define timezones
const TIMEZONES = [
    { id: 'newYork', city: 'New York', timezone: 'America/New_York' },
    { id: 'london', city: 'London', timezone: 'Europe/London' },
    { id: 'paris', city: 'Paris', timezone: 'Europe/Paris' },
    { id: 'dubai', city: 'Dubai', timezone: 'Asia/Dubai' },
    { id: 'india', city: 'India', timezone: 'Asia/Kolkata' },
    { id: 'beijing', city: 'Beijing', timezone: 'Asia/Shanghai' },
    { id: 'tokyo', city: 'Tokyo', timezone: 'Asia/Tokyo' },
    { id: 'sydney', city: 'Sydney', timezone: 'Australia/Sydney' }
];

// Format time with leading zeros
function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Format date
function formatDate(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update clock for a specific timezone
function updateClock(tzInfo) {
    const card = document.getElementById(tzInfo.id);
    
    if (!card) return;
    
    // Get current time in the specified timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tzInfo.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tzInfo.timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    const timeString = formatter.format(new Date());
    const dateString = dateFormatter.format(new Date());
    
    const timeDisplay = card.querySelector('.time-display');
    const dateDisplay = card.querySelector('.date-display');
    
    if (timeDisplay) {
        timeDisplay.textContent = timeString;
    }
    
    if (dateDisplay) {
        dateDisplay.textContent = dateString;
    }
}

// Update all clocks
function updateAllClocks() {
    TIMEZONES.forEach(tz => updateClock(tz));
}

// Initialize and start the clock
function init() {
    // Update immediately on load
    updateAllClocks();
    
    // Update every second
    setInterval(updateAllClocks, 1000);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}