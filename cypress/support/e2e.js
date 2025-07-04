// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath');
import 'cypress-mochawesome-reporter/register';
Cypress.on('uncaught:exception', (err, runnable) => {
  // ignore ResizeObserver errors
  if (err.message.includes('ResizeObserver loop')) {
    return false;
  }
});
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshot = `assets/images/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }
  const video = `assets/videos/${Cypress.spec.name}.mp4`;
  addContext({ test }, video);
});
// Cypress.on('uncaught:exception', (err, runnable) => {
//   if (err.message.includes("navIndex")) {
//     return false; // ignore the error and continue test
//   }
// });