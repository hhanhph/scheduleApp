describe("Homepage", () => {
  it("measures page load on the home page", () => {
    cy.visit("http://localhost:3000/", {
      onBeforeLoad: (win) => {
        win.performance.mark("start-loading");
      },
    })
      .its("performance")
      .then((performance) => {
        // This is how we will tell that our page is loaded
        cy.get('button[id="editBtn"]')
          .should("have.text", "Plan new schedule")
          // Add a timestamp once the page has loaded
          .then(() => performance.mark("end-loading"))
          .then(() => {
            performance.measure("pageLoad", "start-loading", "end-loading");
            // Retrieve the timestamp we just created
            const measure = performance.getEntriesByName("pageLoad")[0];
            // This is the total amount of time (in milliseconds) between the start and end
            const duration = measure.duration;
            assert.isAtMost(duration, 5000);
          });
        cy.get(
          '*[class="datepicker-date-day-Item wrapper  date-day-Item-selected"]'
        )
          .first()
          .click()
          .then(() => {
            cy.get("img")
              .first()
              .should("be.visible")
              .then(() => performance.mark("load-first-img"))
              .then(() => {
                performance.measure(
                  "imgLoad",
                  "start-loading",
                  "load-first-img"
                );
                // Retrieve the timestamp we just created
                const measure2 = performance.getEntriesByName("imgLoad")[0];
                // This is the total amount of time (in milliseconds) between the start and end
                const duration = measure2.duration;
                assert.isAtMost(duration, 5000);
              });
          });
      });
  });
});
