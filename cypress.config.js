const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    DEV_EMAIL: "thomas@ledgerleap.com",
    ADMIN_LOGIN_EMAIL: "thomas+admin@ledgerleap.com",
    ADMIN_LOGIN_PASSWORD: "Pw12345$",
  },

  e2e: {
    baseUrl: 'http://casperfyre.localhost',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
