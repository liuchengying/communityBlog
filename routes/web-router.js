var express = require('express');
var router = express.Router();

var home = require('../controllers/home');
var register   = require('../controllers/reg');
var login = require('../controllers/login');

module.exports = router;

router.get('/', home);

router.get('/login', login.login);
router.get('/reg', register.reg);
router.get('/active_account', register.activeAccount);
router.get('/loginout',login.login_out);

router.post('/signup', register.registerUser);
router.post('/signin', login.login_in);
