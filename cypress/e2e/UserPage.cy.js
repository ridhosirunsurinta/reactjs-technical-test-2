/// <reference type="Cypress"/>

describe("Filter by keyword", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should filter by keyword", () => {
    cy.get("#keyword").type("susan");
    cy.get("#btn-search").click();
  });
});
