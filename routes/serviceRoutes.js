const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authenticationMiddleware");

const {getServicio} = require('../controllers/serviceController');
const {crearServicio} = require('../controllers/serviceController');
const {modificarServicio} = require('../controllers/serviceController');
const {borrarServicio} = require('../controllers/serviceController');

router.get('/', protect, getServicio);
router.post('/', protect, crearServicio);
router.put('/:id', protect, modificarServicio);
router.delete('/:id', protect, borrarServicio);

module.exports = router;