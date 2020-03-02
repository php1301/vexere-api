const express = require('express')
const ticketController = require('./controller')
const router = express.Router()
const { authenticate, authorize } = require('../../../middlewares/auth')

// router.get("/", ticketController.getTickets)
// router.get("/:id", ticketController.getTicketById)
router.post("/", authenticate, authorize(["client"]), ticketController.createTicket)
// router.put("/:id", TicketController.replaceTicketById)
// router.patch("/:id", TicketController.updateTicketsById)
// router.delete("/:id", TicketController.deleteTicketsById)
module.exports = router