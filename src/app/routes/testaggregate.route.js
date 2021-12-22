const express = require('express');
const testaggrecontrol = require('../controllers/testaggregate.controller');

const router = express.Router();
router.get('/v1/:id', testaggrecontrol.GetUserActive);
router.get('/v2/:id', testaggrecontrol.GetUserActive2);
router.get('/v3/:id', testaggrecontrol.GetUserActive3);
router.get('/', testaggrecontrol.GetTwoColl);

module.exports = router;
