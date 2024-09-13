// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check localStorage for mode preference
const userPreferredMode = localStorage.getItem('theme') || 'dark';

// Apply the saved theme
if (userPreferredMode === 'light') {
    document.body.classList.add('light-mode');
    darkModeToggle.checked = false; // Switch off the checkbox for light mode
} else {
    document.body.classList.remove('light-mode');
    darkModeToggle.checked = true; // Switch on the checkbox for dark mode
}

// Add event listener to the toggle checkbox
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        // Switch to Dark Mode
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark'); // Save preference in localStorage
    } else {
        // Switch to Light Mode
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light'); // Save preference in localStorage
    }
});

function uploadFile(event) {
    const fileInput = event.target;
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        if (fileInput.id === 'json-upload') {
            document.getElementById('json-input').value = fileContent;
        } else if (fileInput.id === 'yaml-upload') {
            document.getElementById('yaml-output').value = fileContent;
        }
    };
    reader.readAsText(fileInput.files[0]);
}