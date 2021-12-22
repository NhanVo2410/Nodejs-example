const express = require('express');
const usercontrol = require('../controllers/user.controller');

const router = express.Router();

router.post('/', usercontrol.Post);
router.patch('/:id', usercontrol.Patch);
router.delete('/:id', usercontrol.Delete);
router.post('/create-ticket/:id', usercontrol.CreateTicketByUser);
router.get('/get-ticket-by-userid/:id', usercontrol.GetTicketByUserID);
router.get('/get-user-have-ticket-by-group', usercontrol.GetUserhaveticketByGroup);
router.get('/getuserbytime', usercontrol.GetUserByTime);
router.get('/get-user-active-by-status', usercontrol.GetUserActiveByStatus);
router.get('/getAllUserApi', usercontrol.GetAllUserAPI);
router.get('/:id', usercontrol.GetUsersByUserId);
router.get('/', usercontrol.GetAll);
router.get('/edit/:id', usercontrol.renderEditForm);
router.put('/users/edit-user/:id', usercontrol.Patch);
router.patch('/patchuser/:id', usercontrol.PathchUser);

module.exports = router;
