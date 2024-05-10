const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authenticationMiddleware");

const {showData} = require('../controllers/userController');
const {login} = require('../controllers/userController');
const {register} = require('../controllers/userController');
const {modificarUser} = require('../controllers/userController');
const {borrarUser} = require('../controllers/userController');
const {showAllUsers} = require('../controllers/userController');
const {forgotPassword} = require('../controllers/userController');

router.get('/data', protect, showData);
router.get("/", showAllUsers);
router.post('/login', login);
router.post('/register', register);
router.put("/modify", protect, modificarUser);
router.put("/forgotPassword", forgotPassword);
router.delete("/delete", protect, borrarUser);

module.exports = router;