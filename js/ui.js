// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check localStorage for mode preference or default to dark mode
const savedMode = localStorage.getItem('theme') || 'dark';

// Apply the saved theme or default to dark mode
if (savedMode === 'light') {
    document.body.classList.add('light-mode');
    darkModeToggle.checked = false;
} else {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Add event listener to the toggle switch
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        // Switch to dark mode
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light mode
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
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

function copyToClipboard(targetId) {
    const textArea = document.getElementById(targetId);
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    alert('Text copied to clipboard!');
}

// Attach event listeners to the copy buttons
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        copyToClipboard(targetId);
    });
});
