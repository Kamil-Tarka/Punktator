const express = require('express');
const router = express.Router();
var app = express()
const cors = require('cors');
app.use(cors())
const IndexController = require('../controllers/IndexController');
const ClientController = require('../controllers/ClientController');
const UserController = require('../controllers/UserControler');
const LogController = require('../controllers/LogController');

router.all('*', cors());

router.get('/', IndexController.home);

router.get('/client', ClientController.getAll);
router.get('/client/:id', ClientController.getById);
router.post('/client', ClientController.store);
router.put('/client/:id', ClientController.updateById);
router.delete('/client/:id', ClientController.deleteById);

router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.getById);
router.post('/user', UserController.store);
router.put('/user/:id', UserController.updateById);
router.delete('/user/:id', UserController.deleteById);

router.get('/log', LogController.getAll);
router.post('/log', LogController.store);

module.exports = router;