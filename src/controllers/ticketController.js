const db = require('../models/database')
const { generateTicketForm, generateTicketsList } = require('../views/ticketForm')

async function showTicketForm(req, res) {
  try {
    const types = await db.getTypes()
    const html = generateTicketForm(types)
    res.send(html)
  } catch (error) {
    console.error('Database error in showTicketForm:', error.message)
    res.status(500).send('Database error: Unable to load ticket types')
  }
}

async function createTicket(req, res) {
  const { type_id, email, message } = req.body
  
  if (!type_id || !email || !message) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['type_id', 'email', 'message']
    })
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }
  

  
  try {
    await db.createTicket(type_id, email, message.trim())
    res.status(201).json({ message: 'Ticket created successfully' })
  } catch (error) {
    console.error('Database error in createTicket:', error.message)
    res.status(500).json({ error: 'Database error: Unable to create ticket' })
  }
}

async function listTickets(req, res) {
  try {
    const tickets = await db.getTickets()
    const html = generateTicketsList(tickets)
    res.send(html)
  } catch (error) {
    console.error('Database error in listTickets:', error.message)
    res.status(500).send('Database error: Unable to load tickets')
  }
}

async function getTypes(req, res) {
  try {
    const types = await db.getTypes()
    res.json(types)
  } catch (error) {
    console.error('Database error in getTypes:', error.message)
    res.status(500).json({ error: 'Database error: Unable to load types' })
  }
}

module.exports = {
  showTicketForm,
  createTicket,
  listTickets,
  getTypes
} 