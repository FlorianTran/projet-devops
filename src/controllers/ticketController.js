const db = require('../models/database')
const { generateTicketForm, generateTicketsList } = require('../views/ticketForm')

async function showTicketForm(req, res) {
  try {
    const types = await db.getTypes()
    const html = generateTicketForm(types)
    res.send(html)
  } catch (error) {
    res.status(500).send('Database error')
  }
}

async function createTicket(req, res) {
  const { type_id, email, message } = req.body
  if (!type_id || !email || !message) {
    return res.status(400).send('Invalid')
  }
  
  try {
    await db.createTicket(type_id, email, message)
    res.status(201).send('OK')
  } catch (error) {
    res.status(500).send('Database error')
  }
}

async function listTickets(req, res) {
  try {
    const tickets = await db.getTickets()
    const html = generateTicketsList(tickets)
    res.send(html)
  } catch (error) {
    res.status(500).send('Database error')
  }
}

async function getTypes(req, res) {
  try {
    const types = await db.getTypes()
    res.json(types)
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
}

module.exports = {
  showTicketForm,
  createTicket,
  listTickets,
  getTypes
} 