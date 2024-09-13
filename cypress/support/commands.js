import 'cypress-file-upload';

Cypress.Commands.add('uploadFile', (fileName, selector) => {
  cy.get(selector).attachFile(fileName);
});

function uploadFile(event) {
    const fileInput = event.target;
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        document.getElementById('json-input').value = fileContent;
    };
    reader.readAsText(fileInput.files[0]);
}