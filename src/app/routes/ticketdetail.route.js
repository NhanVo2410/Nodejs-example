const express = require('express');
const ticketdetailcontrol = require('../controllers/ticketdetail.controller');

const router = express.Router();

router.get('/', ticketdetailcontrol.GetAll);
router.get('/:id', ticketdetailcontrol.GetTicketDetailByTicketID);
router.post('/', ticketdetailcontrol.Post);
router.patch('/:id', ticketdetailcontrol.Patch);
router.delete('/:id', ticketdetailcontrol.Delete);

module.exports = router;
