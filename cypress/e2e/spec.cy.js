
const doNewUser = true;

function makeId(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function makeEmail() {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const devEmail = Cypress.env("DEV_EMAIL");
  let prepend = `${devEmail.split("@")[0]}+user-${result}`;
  let append = devEmail.split("@")[1];
  return `${prepend}@${append}`;
}

function makePassword() {
  let result = "";
  let chars1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let chars2 = "abcdefghijklmnopqrstuvwxyz";
  let chars3 = "0123456789";
  let chars4 = "_-!@%&*";

  for (var i = 0; i < 4; i++) {
    result += chars1.charAt(Math.floor(Math.random() * chars1.length));
  }

  for (var i = 0; i < 4; i++) {
    result += chars2.charAt(Math.floor(Math.random() * chars2.length));
  }

  for (var i = 0; i < 2; i++) {
    result += chars3.charAt(Math.floor(Math.random() * chars3.length));
  }

  for (var i = 0; i < 2; i++) {
    result += chars4.charAt(Math.floor(Math.random() * chars4.length));
  }

  return result;
}

function randomNumber() {
  let result = "";
  let chars = "123456789";

  for (var i = 0; i < 2; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

describe("Full test of critical functionality", () => {
  var total_token_balance = 0;

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Should load the login screen", () => {
    cy.visit("/")
    cy.contains("Log in")
  });

  it("Should login", () => {
    cy.get("input:first")
      .clear()
      .type(Cypress.env("ADMIN_LOGIN_EMAIL"))

    cy.get("button:first").click({force: true})
    cy.wait(3000)

    cy.get("input:last")
      .clear()
      .type(Cypress.env("ADMIN_LOGIN_PASSWORD"))
      .type("{enter}")

    cy.wait(3000)
  });

  it("Should load dashboard", () => {
    cy.location("pathname").should("eq", "/app/applications")
    cy.contains("New Applications")
    cy.wait(2000)
  });

  it("Navigate to user detail view", () => {
    cy.contains('API Keys').click()
    cy.wait(2000)
    cy.contains('Details').click()
    cy.wait(2000)
  });

  it("Reset password", () => {
    let pw = makePassword();

    cy.contains('Reset Portal Password').click()
    cy.wait(2000)
    cy.get('input').each(($el, i, $list) => {
      if (i < 2) {
        cy.wrap($el).clear().type(pw)
      }
      cy.wait(1000)
    })
    cy.wait(1000)
    cy.get('button:first').click({force: true})
    cy.wait(2000)
  });

  it("Disable/Enable API key", () => {
    cy.contains('Disable Key').click()
    cy.wait(5000)
    cy.contains('Re-activate').click()
    cy.wait(3000)
  });

  it("Change API key", () => {
    cy.contains('Replace Key').click()
    cy.wait(2000)
    cy.get("button:first").click({force: true})
    cy.wait(2000)
  });

  it("Change accessible wallet", () => {
    cy.contains('Change Wallet').click()
    cy.wait(2000)
    cy.contains('Generate').click()
    cy.wait(2000)
  });

  it("Update daily CSPR limit", () => {
    cy.contains('Update').click()
    cy.wait(2000)
    cy.get("input:first").type(randomNumber())
    cy.get("button:first").click({force: true})
    cy.wait(2000)
  });

  it("Add IP address", () => {
    cy.contains('Add New IP').click()
    cy.wait(2000)
    cy.get("input:first").type('127.0.0.1')
    cy.get("button:first").click({force: true})
    cy.wait(2000)
  });

  it("Disable IP address", () => {
    cy.get('.table-container')
      .contains('Disable')
      .first()
      .click()
    cy.wait(2000)
  });

  it("Navigate to API logs view", () => {
    cy.contains('API Logs').click()
    cy.wait(2000)
  });

  it("API call detail", () => {
    cy.contains('View')
      .first()
      .click()
    cy.wait(2000)
    cy.contains('Close')
      .first()
      .click()
    cy.wait(2000)
  });

  it("Navigate to Wallets view", () => {
    cy.contains('Wallets').click()
    cy.wait(2000)
  });

 });