context('Application Theme', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: false,
          })
      },
    })
    cy.contains('Apply').click()
  })

  describe('Verify that theme can be changed', () => {
    it('should be visible theme toggle switcher', () => {
      cy.get('[data-cy="theme-toggle"]').should('be.visible')
    })

    it('should change to dark theme', () => {
      cy.get('[data-cy="theme-toggle"]').click()
      cy.get('html').should('have.class', 'dark')
    })

    it('should change to light theme', () => {
      cy.get('[data-cy="theme-toggle"]').click()
      cy.get('[data-cy="theme-toggle"]').click()
      cy.get('html').should('not.have.class', 'dark')
    })
  })

  describe('Verify that theme remains unchanged after page reload', () => {
    it('should change to dark theme', () => {
      cy.get('[data-cy="theme-toggle"]').click()
      cy.get('html').should('have.class', 'dark')
    })

    it('should remain dark theme after page reload', () => {
      cy.get('[data-cy="theme-toggle"]').click()
      cy.get('html').should('have.class', 'dark')
      cy.reload()
      cy.get('[data-cy="theme-toggle"]')
        .invoke('attr', 'aria-checked')
        .should('eq', 'true')
      cy.get('html').should('have.class', 'dark')
    })

    it('should remain light theme after page reload', () => {
      cy.get('[data-cy="theme-toggle"]').click().click()
      cy.get('html').should('not.have.class', 'dark')
      cy.reload()
      cy.get('[data-cy="theme-toggle"]')
        .invoke('attr', 'aria-checked')
        .should('eq', 'false')
      cy.get('html').should('not.have.class', 'dark')
    })

    it('should apply system theme and hide theme toggle', () => {
      cy.get('[data-cy="settings"]').click()
      cy.get('[data-cy="toggle"]').click()
      cy.contains('Apply').click()
      cy.get('html').should('not.have.class', 'dark')
      cy.get('[data-cy="theme-toggle"]').should('not.exist')
    })

    it('should remain light theme after page reload - after settings were changed', () => {
      cy.get('[data-cy="settings"]').click()
      cy.get('[data-cy="toggle"]').click()
      cy.contains('Apply').click()
      cy.get('html').should('not.have.class', 'dark')
      cy.get('[data-cy="theme-toggle"]').should('not.exist')
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'matchMedia')
            .withArgs('(prefers-color-scheme: dark)')
            .returns({
              matches: false,
            })
        },
      })
      cy.get('html').should('not.have.class', 'dark')
      cy.get('[data-cy="theme-toggle"]').should('not.exist')
    })

    it('should remain dark theme after page reload - after settings were changed', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'matchMedia')
            .withArgs('(prefers-color-scheme: dark)')
            .returns({
              matches: true,
            })
        },
      })
      cy.get('[data-cy="settings"]').click()
      cy.get('[data-cy="toggle"]').click()
      cy.contains('Apply').click()
      cy.get('html').should('have.class', 'dark')
      cy.get('[data-cy="theme-toggle"]').should('not.exist')
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'matchMedia')
            .withArgs('(prefers-color-scheme: dark)')
            .returns({
              matches: true,
            })
        },
      })
      cy.get('html').should('have.class', 'dark')
      cy.get('[data-cy="theme-toggle"]').should('not.exist')
    })
  })

  describe('Verify that after disabling "use system theme" the theme remains as it was before it', () => {
    it('should turn on use system theme toggle', () => {
      cy.get('[data-cy="settings"]').click()
      cy.get('[data-cy="toggle"]').click()
      cy.contains('Apply').click()
      cy.get('html').should('not.have.class', 'dark')
    })

    it('should open settings modal with turned on toggle switch', () => {
      cy.get('[data-cy="settings"]').click()
      cy.get('[data-cy="toggle"]').click()
      cy.contains('Apply').click()
      cy.get('html').should('not.have.class', 'dark')
      cy.get('[data-cy="settings"]').click()
      cy.get('[data-cy="toggle"]')
        .invoke('attr', 'aria-checked')
        .should('eq', 'true')
    })

    it('should turn off use system theme toggle', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'matchMedia')
            .withArgs('(prefers-color-scheme: dark)')
            .returns({
              matches: true,
            })
        },
      })
      cy.get('[data-cy="settings"]').click()
      cy.get('[data-cy="toggle"]').click()
      cy.contains('Apply').click()
      cy.get('html').should('have.class', 'dark')
      cy.get('[data-cy="settings"]').click()
      cy.get('[data-cy="toggle"]')
        .invoke('attr', 'aria-checked')
        .should('eq', 'true')
      cy.get('[data-cy="toggle"]').click()
      cy.contains('Apply').click()
      cy.get('html').should('not.have.class', 'dark')
    })
  })
})
