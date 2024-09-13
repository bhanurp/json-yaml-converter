// Upload file (JSON/YAML)
function uploadFile(type) {
    const fileInput = document.getElementById(type + '-upload');
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        if (type === 'json') {
            document.getElementById('json-input').value = fileContent;
        } else if (type === 'yaml') {
            document.getElementById('yaml-output').value = fileContent;
        }
    };
    reader.readAsText(fileInput.files[0]);
}

// Download file (JSON/YAML)
function downloadFile(type) {
    const text = (type === 'json') ? document.getElementById('json-input').value : document.getElementById('yaml-output').value;
    const filename = `converted.${type}`;
    const file = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
}