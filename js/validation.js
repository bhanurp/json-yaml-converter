// Check for inconsistent spaces in YAML
function checkYamlSpaces() {
    const yamlText = document.getElementById('yaml-output').value;
    const lines = yamlText.split('\n');
    const inconsistentLines = [];

    lines.forEach((line, index) => {
        const leadingSpaces = line.match(/^\s*/)[0];
        if (leadingSpaces.length % 2 !== 0 && line.trim().length > 0) {
            inconsistentLines.push(`Line ${index + 1}: "${line}"`);
        }
    });

    if (inconsistentLines.length > 0) {
        alert("Inconsistent spaces found in YAML:\n" + inconsistentLines.join('\n'));
    } else {
        alert("No inconsistent spaces found in YAML.");
    }
}