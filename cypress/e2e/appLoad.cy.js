context('Application First Load', () => {
  before(() => {
    cy.visit('/')
  })

  describe('Verify application first load', () => {
    it('should open app first load settings modal', () => {
      cy.get('[data-testid="startup-modal"]').should('be.visible')
    })

    it('should be friday and 18:00 set by default', () => {
      cy.contains('Friday').should('be.visible')
      cy.contains('18:00').should('be.visible')
    })

    it('should open day dropdown', () => {
      cy.contains('Friday').click()
      cy.get('[data-value="Monday"]').should('not.be.visible')
      cy.get('[data-value="Tuesday"]').should('not.be.visible')
      cy.get('[data-value="Wednesday"]').should('not.be.visible')
      cy.get('[data-value="Thursday"]').should('be.visible')
      cy.get('[data-value="Friday"]').should('be.visible')
      cy.get('[data-value="Saturday"]').should('be.visible')
      cy.get('[data-value="Sunday"]').should('be.visible')
    })

    it('should open time dropdown', () => {
      cy.contains('18:00').click()
      cy.get('[data-value="01:00"]').should('not.be.visible')
      cy.get('[data-value="02:00"]').should('not.be.visible')
      cy.get('[data-value="03:00"]').should('not.be.visible')
      cy.get('[data-value="04:00"]').should('not.be.visible')
      cy.get('[data-value="05:00"]').should('not.be.visible')
      cy.get('[data-value="06:00"]').should('not.be.visible')
      cy.get('[data-value="07:00"]').should('not.be.visible')
      cy.get('[data-value="08:00"]').should('not.be.visible')
      cy.get('[data-value="09:00"]').should('not.be.visible')
      cy.get('[data-value="10:00"]').should('not.be.visible')
      cy.get('[data-value="11:00"]').should('not.be.visible')
      cy.get('[data-value="12:00"]').should('not.be.visible')
      cy.get('[data-value="13:00"]').should('not.be.visible')
      cy.get('[data-value="14:00"]').should('not.be.visible')
      cy.get('[data-value="15:00"]').should('not.be.visible')
      cy.get('[data-value="16:00"]').should('not.be.visible')
      cy.get('[data-value="17:00"]').should('not.be.visible')
      cy.get('[data-value="18:00"]').should('be.visible')
      cy.get('[data-value="19:00"]').should('be.visible')
      cy.get('[data-value="20:00"]').should('be.visible')
      cy.get('[data-value="21:00"]').should('be.visible')
      cy.get('[data-value="22:00"]').should('not.be.visible')
      cy.get('[data-value="23:00"]').should('not.be.visible')
      cy.get('[data-value="00:00"]').should('not.be.visible')
    })

    it('should Apply settings', () => {
      cy.clock(Date.UTC(2022, 6, 6, 13, 31, 22), ['Date'])
      cy.contains('Friday').click()
      cy.contains('Saturday').click()
      cy.contains('18:00').click()
      cy.contains('19:00').click()
      cy.contains('Apply').click()
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days3:hours2:minutes28:seconds38'
      )
    })

    it('Verify UI settings modal page on first load', () => {
      cy.visit('/')
      cy.get('[data-testid="startup-modal"]').should('be.visible')
      cy.contains('Please choose').should('be.visible')
      cy.contains('Day and Hour you finish your work').should('be.visible')
      cy.contains('Friday').should('be.visible')
      cy.contains('18:00').should('be.visible')
      cy.contains('Apply').should('be.visible')
    })
  })
})
