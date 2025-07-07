describe('Ticketing Application', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the ticket submission form', () => {
    cy.get('h1').should('contain', 'Submit a Ticket')
    cy.get('form').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('select[name="type_id"]').should('exist')
    cy.get('textarea[name="message"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should submit a ticket successfully', () => {
    const ticketData = {
      email: 'john@example.com',
      type_id: '1',
      message: 'This is a test ticket description'
    }

    cy.get('input[name="email"]').type(ticketData.email)
    cy.get('select[name="type_id"]').select(ticketData.type_id)
    cy.get('textarea[name="message"]').type(ticketData.message)
    cy.get('button[type="submit"]').click()

    cy.get('body').should('contain', 'Ticket submitted successfully')
  })

  it('should validate required fields', () => {
    cy.get('button[type="submit"]').click()
    
    // Should stay on the same page if validation fails
    cy.url().should('not.include', '/submit')
  })

  it('should access protected tickets page with authentication', () => {
    // Test with correct credentials
    const username = Cypress.env('AUTH_USERNAME') || 'admin'
    const password = Cypress.env('AUTH_PASSWORD') || 'pass'

    cy.request({
      method: 'GET',
      url: '/tickets',
      auth: {
        username: username,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.contain('Tickets List')
    })
  })

  it('should reject access to tickets page without authentication', () => {
    cy.request({
      method: 'GET',
      url: '/tickets',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('should display ticket types dynamically', () => {
    cy.get('select[name="type_id"] option').should('have.length.at.least', 2)
    cy.get('select[name="type_id"] option:not([value=""])').should('have.length.at.least', 1)
  })
}) 