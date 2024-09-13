// Convert JSON to YAML
function convertToJson() {
    const jsonText = document.getElementById('json-input').value;
    try {
        const jsonData = JSON.parse(jsonText);
        const yamlText = jsyaml.dump(jsonData);
        document.getElementById('yaml-output').value = yamlText;
    } catch (err) {
        alert("Invalid JSON: " + err.message);
    }
}

// Convert YAML to JSON
function convertToYaml() {
    const yamlText = document.getElementById('yaml-output').value;
    try {
        const jsonData = jsyaml.load(yamlText);
        document.getElementById('json-input').value = JSON.stringify(jsonData, null, 2); // Prettify JSON
    } catch (err) {
        alert("Invalid YAML: " + err.message);
    }
}

// Prettify JSON
function prettifyJson() {
    const jsonText = document.getElementById('json-input').value;
    try {
        const jsonData = JSON.parse(jsonText);
        const prettyJson = JSON.stringify(jsonData, null, 2);
        document.getElementById('json-input').value = prettyJson;
    } catch (err) {
        alert("Invalid JSON: " + err.message);
    }
}