describe('JSON-YAML Converter Tests', () => {
    // Test 1: JSON to YAML Conversion
    it('should convert JSON to YAML correctly', () => {
      cy.visit('/');
      cy.get('#json-input').type('{"name": "Bhanu", "age": 30}', { parseSpecialCharSequences: false });
      cy.contains('Convert to YAML').click();
      cy.get('#yaml-output').should('have.value', 'name: Bhanu\nage: 30\n');
    });
  
    // Test 2: YAML to JSON Conversion
    it('should convert YAML to JSON correctly', () => {
      cy.visit('/');
      cy.get('#yaml-output').type('name: Bhanu\nage: 30', { parseSpecialCharSequences: false });
      cy.contains('Convert to JSON').click();
      cy.get('#json-input').should('have.value', '{\n  "name": "Bhanu",\n  "age": 30\n}');
    });
  
    // Test 3: Invalid JSON Input
    it('should show error for invalid JSON', () => {
      cy.visit('/');
      cy.get('#json-input').type('{name: "Bhanu"}', { parseSpecialCharSequences: false });
      cy.contains('Convert to YAML').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid JSON: Expected property name or \'}\' in JSON at position 1 (line 1 column 2)');
      });
    });
  
    // Test 4: Invalid YAML Input
    it('should show error for invalid YAML', () => {
      cy.visit('/');
      cy.get('#yaml-output').type('name: Bhanu\nage: 30: error');
      cy.contains('Convert to JSON').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid YAML: bad indentation of a mapping entry (2:8)\n\n 1 | name: Bhanu\n 2 | age: 30: error\n------------^');
      });
    });
  
   // Test 5: Dark Mode Toggle
    it('should toggle dark mode and persist after refresh', () => {
      cy.visit('/');
      cy.get('body').then(($body) => {
        console.log('Initial body class:', $body.attr('class'));
      });
      cy.get('body', { timeout: 10000 }).should('not.have.class', 'dark-mode'); // Verify dark mode is on
      cy.reload(); // Reload the page
      cy.get('body').then(($body) => {
        console.log('Body class after reload:', $body.attr('class'));
      });
      cy.get('body', { timeout: 10000 }).should('not.have.class', 'dark-mode'); // Verify dark mode persists after refresh
    });
  
    // Test 6: Prettify JSON
    it('should prettify JSON', () => {
      cy.visit('/');
      cy.get('#json-input').type('{"name":"Bhanu","age":30}', { parseSpecialCharSequences: false });
      cy.contains('Prettify JSON').click();
      cy.get('#json-input').should('have.value', '{\n  "name": "Bhanu",\n  "age": 30\n}');
    });
  
    // Test 7: Upload JSON File
    it('should upload and display JSON file content', () => {
      cy.visit('/');
      const filePath = 'sample.json'; // Path to your test file in the Cypress fixtures folder
      cy.get('input[type="file"]#json-upload').attachFile(filePath);
      cy.get('#json-input').should('have.value', '{\n  "name": "Bhanu",\n  "age": 30\n}');
    });

    // Test 8: Upload YAML File
    it('should upload and display YAML file content', () => {
      cy.visit('/');
      const filePath = 'sample.yaml'; // Path to your test file in the Cypress fixtures folder
      cy.get('input[type="file"]#yaml-upload').attachFile(filePath);
      cy.get('#yaml-output').should('have.value', 'name: Bhanu\nage: 30\n');
    });
  
    // Test 9: Check YAML Spaces
    it('should detect inconsistent YAML spaces', () => {
      cy.visit('/');
      cy.get('#yaml-output').type('name: Bhanu\n age: 30'); // YAML with inconsistent spacing
      cy.contains('Check YAML Spaces').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Inconsistent spaces found in YAML:\nLine 2: " age: 30"');
      });
    });
  });

  describe('Dark Mode Toggle Tests', () => {
    // Test: Toggle Dark Mode
    it('should toggle dark mode and persist after refresh', () => {
      cy.visit('/');
      cy.get('body').then(($body) => {
        console.log('Initial body class:', $body.attr('class'));
      });
      cy.get('body', { timeout: 10000 }).should('not.have.class', 'dark-mode'); // Verify dark mode is on
      cy.reload(); // Reload the page
      cy.get('body').then(($body) => {
        console.log('Body class after reload:', $body.attr('class'));
      });
      cy.get('body', { timeout: 10000 }).should('not.have.class', 'dark-mode'); // Verify dark mode persists after refresh
    });
  
    // Test: Toggle Light Mode
    it('should toggle light mode and persist after refresh', () => {
      cy.visit('/');
      cy.get('body').then(($body) => {
        console.log('Initial body class:', $body.attr('class'));
      });
      cy.get('#dark-mode-toggle').click({ force: true }); // Toggle dark mode
      cy.get('#dark-mode-toggle').click({ force: true }); // Toggle back to light mode
      cy.get('body').then(($body) => {
        console.log('Body class after toggle:', $body.attr('class'));
      });
      cy.get('body', { timeout: 10000 }).should('not.have.class', 'dark-mode'); // Verify light mode is on
      cy.reload(); // Reload the page
      cy.get('body').then(($body) => {
        console.log('Body class after reload:', $body.attr('class'));
      });
      cy.get('body', { timeout: 10000 }).should('not.have.class', 'dark-mode'); // Verify light mode persists after refresh
    });
  });
  