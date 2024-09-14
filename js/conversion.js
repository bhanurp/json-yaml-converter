// Declare the debounce timeout variables globally
let jsonDebounceTimeout;
let yamlDebounceTimeout;

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

document.getElementById('json-input').addEventListener('input', function () {
    clearTimeout(jsonDebounceTimeout); // Clear the previous timeout
    jsonDebounceTimeout = setTimeout(function() {
        convertToYaml(); // Invoke the conversion to JSON
    }, 500); // Set new timeout for 500ms after last input
});

document.getElementById('json-input').addEventListener('paste', function () {
    clearTimeout(jsonDebounceTimeout);
    jsonDebounceTimeout = setTimeout(convertToYaml, 500); // Convert 500ms after paste
});

document.getElementById('yaml-output').addEventListener('input', function () {
    clearTimeout(yamlDebounceTimeout); // Clear the previous timeout
    yamlDebounceTimeout = setTimeout(function() {
        convertToJson(); // Invoke the conversion to JSON
    }, 500); // Set new timeout for 500ms after last input
});

document.getElementById('yaml-output').addEventListener('paste', function () {
    clearTimeout(yamlDebounceTimeout);
    yamlDebounceTimeout = setTimeout(convertToJson, 500); // Convert 500ms after paste
});