// Dark Mode Toggle Functionality
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

// Check localStorage for mode preference
const userPreferredMode = localStorage.getItem('theme') || 'dark';

// Apply the saved theme
if (userPreferredMode === 'light') {
    document.body.classList.add('light-mode');
} else {
    document.body.classList.remove('light-mode');
}

// Add event listener to the toggle button
toggleDarkModeButton.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        // Switch to Dark Mode
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark'); // Save preference in localStorage
    } else {
        // Switch to Light Mode
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light'); // Save preference in localStorage
    }
});