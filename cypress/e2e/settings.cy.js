/* eslint-disable jest/valid-expect */

context('Settings modal', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Apply').click()
    cy.get('[data-cy="settings"]').click()
  })

  describe('Verify that user can use settings modal', () => {
    it('should open settings modal', () => {
      cy.get('[data-testid="settings-modal"]').should('be.visible')
    })

    it('should set new text is input field', () => {
      cy.get('input')
        .invoke('attr', 'placeholder')
        .should('contain', 'Have a beer')
      cy.get('input[placeholder="Have a beer"]')
        .clear()
        .type('some beer!')
        .should('have.value', 'some beer!')
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

    it('should select Monday', () => {
      cy.contains('Friday').click()
      cy.contains('Monday').click()
      cy.contains('Monday').should('be.visible')
    })

    it('should select current day', () => {
      cy.contains('Friday').click()
      cy.contains('Friday').click()
      cy.contains('Friday').should('be.visible')
    })

    it('should select Sunday', () => {
      cy.contains('Friday').click()
      cy.contains('Sunday').click()
      cy.contains('Sunday').should('be.visible')
    })

    it('should select 00:00', () => {
      cy.contains('18:00').click()
      cy.contains('00:00').click()
      cy.contains('00:00').should('be.visible')
    })

    it('should select current hour', () => {
      cy.contains('18:00').click()
      cy.contains('18:00').click()
      cy.contains('18:00').should('be.visible')
    })

    it('should select 23:00', () => {
      cy.contains('18:00').click()
      cy.contains('23:00').click()
      cy.contains('23:00').should('be.visible')
    })

    it('should change switcher position', () => {
      cy.get('[data-cy="toggle"]')
        .click()
        .invoke('attr', 'aria-checked')
        .should('eq', 'true')
    })

    it('should close modal on Apply click', () => {
      cy.contains('Apply').click()
      cy.get('[data-testid="settings-modal"]').should('not.exist')
    })
  })

  describe('Input fields validation', () => {
    it('should open settings modal', () => {
      cy.get('[data-testid="settings-modal"]').should('be.visible')
    })

    it('should highlight greetings input with red color', () => {
      cy.get('input[placeholder="Have a beer"]')
        .clear()
        .should('have.class', 'border-red-500')
      cy.get('input[placeholder="Have a beer"]')
        .clear()
        .type('  ')
        .should('have.class', 'border-red-500')
    })

    it('should not allow to click Apply button', () => {
      cy.get('input[placeholder="Have a beer"]').clear().type('  ')
      cy.contains('Apply').click()
      cy.get('[data-testid="settings-modal"]').should('exist')
    })

    it('should not allow to type more than 20 characters', () => {
      cy.get('input[placeholder="Have a beer"]')
        .clear()
        .type('123456789012345678901')
        .should('have.value', '12345678901234567890')
    })
  })

  describe('Verify settings modal behaviour', () => {
    it('should open settings modal', () => {
      cy.get('[data-testid="settings-modal"]').should('be.visible')
    })

    it('should change inputs', () => {
      cy.get('input[placeholder="Have a beer"]').clear().type('some beer!')

      cy.contains('Friday').click()
      cy.contains('Monday').click()

      cy.contains('18:00').click()
      cy.contains('19:00').click()

      cy.get('[data-cy="toggle"]').click()
    })

    it('should click Cancel button', () => {
      cy.contains('Cancel').click()
    })

    it('should open settings modal with previous values', () => {
      cy.get('input[placeholder="Have a beer"]').clear().type('some beer!')
      cy.contains('Friday').click()
      cy.contains('Monday').click()
      cy.contains('18:00').click()
      cy.contains('19:00').click()
      cy.get('[data-cy="toggle"]').click()

      cy.contains('Apply').click()

      cy.get('[data-cy="settings"]').click()

      cy.get('input[placeholder="Have a beer"]').should(
        'have.value',
        'some beer!'
      )
      cy.contains('Monday').should('be.visible')
      cy.contains('19:00').should('be.visible')
      cy.get('[data-cy="toggle"]').should('have.attr', 'aria-checked', 'true')
    })

    it('should close modal on click outside modal', () => {
      cy.get('body').click('topLeft')
      cy.get('[data-testid="settings-modal"]').should('not.exist')
    })
  })

  describe('Verify that application can use system theme', () => {
    it('should open settings modal with turned off toggle switch', () => {
      cy.get('[data-cy="toggle"]')
        .invoke('attr', 'aria-checked')
        .should('eq', 'false')
    })

    it('should turn on use system theme toggle', () => {
      cy.get('[data-cy="toggle"]')
        .click()
        .invoke('attr', 'aria-checked')
        .should('eq', 'true')
    })

    it('should adjust app theme to system theme', () => {
      cy.get('[data-cy="toggle"]').click()
      cy.contains('Apply').click()
      cy.get('html').should('have.class', 'dark')
    })

    it('should turn off use system theme toggle', () => {
      cy.get('[data-cy="toggle"]')
        .click()
        .click()
        .invoke('attr', 'aria-checked')
        .should('eq', 'false')
    })

    it('should adjust app theme not to use system theme', () => {
      cy.get('[data-cy="toggle"]').click().click()
      cy.contains('Apply').click()
      cy.get('html').should('not.have.class', 'dark')
    })

    it('should apply system theme', () => {
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
    })
  })
})
