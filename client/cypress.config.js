const { defineConfig } = require("cypress");

/* eslint-disable no-unused-vars */
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 1080,
    viewportWidth: 1920
  },
});
