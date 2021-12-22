const express = require('express');
const ticketcontrol = require('../controllers/ticket.controller');

const router = express.Router();

router.get('/', ticketcontrol.GetAll);
router.get('/:id', ticketcontrol.GetTicketByUserID);
router.post('/', ticketcontrol.Post);
router.patch('/:id', ticketcontrol.Patch);
router.delete('/:id', ticketcontrol.Delete);
router.post('/create-ticket-detail-by-ticketid/:id', ticketcontrol.CreateTicketDetailByTicketID);
router.get('/get-ticket-detail-by-ticketid/:id', ticketcontrol.GetTicketDetailByTicketID);

module.exports = router;
