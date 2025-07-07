const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')
const { requireAuth } = require('../middleware/auth')

router.get('/', ticketController.showTicketForm)
router.post('/', ticketController.createTicket)
router.get('/tickets', requireAuth, ticketController.listTickets)
router.get('/types', ticketController.getTypes)

module.exports = router 