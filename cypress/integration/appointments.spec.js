describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Diogo Pinto");

    //alt text from avatar img
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains("Saving...").should("exist");

    cy.contains("Saving...").should("not.exist");

    cy.contains(".appointment__card--show", "Diogo Pinto");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // 'force: true' flags Cypress to ignore edit/delete buttons not being visible on the DOM
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Diogo Pinto");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains("Saving...").should("exist");

    cy.contains("Saving...").should("not.exist");

    cy.contains(".appointment__card--show", "Diogo Pinto");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 'force: true' flags Cypress to ignore edit/delete buttons not being visible on the DOM
    cy.get("[alt=Delete]").first().click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting...").should("exist");

    cy.contains("Deleting...").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
