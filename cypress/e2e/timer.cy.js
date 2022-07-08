context('Application Timer', () => {
  describe('Verify that Timer can consists blocks', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.clock(new Date(2022, 6, 6, 13, 31, 22))
      cy.contains('Apply').click()
    })

    it('should have 4 digit blocks', () => {
      cy.get('[data-cy="settings"]').click()

      cy.contains('Friday').click()
      cy.contains('Thursday').click()
      cy.contains('18:00').click()
      cy.contains('14:00').click()
      cy.contains('Apply').click()

      cy.tick(1000)

      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days1:hours0:minutes28:seconds37'
      )
    })

    it('should have 3 digit blocks', () => {
      cy.get('[data-cy="settings"]').click()

      cy.contains('Friday').click()
      cy.contains('Wednesday').click()
      cy.contains('18:00').click()
      cy.contains('15:00').click()
      cy.contains('Apply').click()

      cy.tick(1000)

      cy.get('[data-cy="clock"]').should(
        'have.text',
        'hours1:minutes28:seconds37'
      )
    })

    it('should have 2 digit blocks', () => {
      cy.get('[data-cy="settings"]').click()

      cy.contains('Friday').click()
      cy.contains('Wednesday').click()
      cy.contains('18:00').click()
      cy.contains('14:00').click()
      cy.contains('Apply').click()

      cy.tick(1000)

      cy.get('[data-cy="clock"]').should('have.text', 'minutes28:seconds37')
    })
  })

  describe('Verify that digits logically decreases', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.clock(new Date(2022, 7, 1, 13, 31, 22))
    })
    it('should apply new settings', () => {
      cy.contains('Apply').click()
      cy.get('[data-cy="settings"]').click()

      cy.contains('Friday').click()
      cy.contains('Saturday').click()
      cy.contains('18:00').click()
      cy.contains('19:00').click()
      cy.contains('Apply').click()

      cy.tick(1000)

      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days5:hours5:minutes28:seconds37'
      )
      cy.tick(1000)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days5:hours5:minutes28:seconds36'
      )
    })

    it('should decrement second', () => {
      cy.contains('Apply').click()

      cy.tick(1000)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days4:hours4:minutes28:seconds37'
      )

      cy.tick(1000)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days4:hours4:minutes28:seconds36'
      )

      cy.tick(1000)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days4:hours4:minutes28:seconds35'
      )
    })

    it('should decrement minute', () => {
      cy.contains('Apply').click()

      cy.tick(60000)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days4:hours4:minutes28:seconds37'
      )

      cy.tick(1000)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days4:hours4:minutes27:seconds37'
      )
    })

    it('should hide day when it reaches zero (0)', () => {
      cy.contains('Apply').click()

      cy.tick(1000 * 60 * 60 * 24 * 4)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days4:hours4:minutes28:seconds37'
      )

      cy.tick(1000)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'hours4:minutes28:seconds37'
      )
    })
  })

  describe('Verify that Greetings text is displayed if countdown is over', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.clock(new Date(2022, 7, 1, 13, 31, 22))
    })
    it('should show greetings text', () => {
      cy.contains('Apply').click()

      cy.tick(1000 * 60 * 60 * 24 * 5)
      cy.get('[data-cy="clock"]').should(
        'have.text',
        'days4:hours4:minutes28:seconds37'
      )

      cy.tick(1000)
      cy.get('[data-cy="clock"]').should('not.exist')
      cy.contains('Have a beer!').should('be.visible')
    })
  })
})
