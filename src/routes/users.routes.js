const { Router } = require('express');
const router = Router();

const { renderSingUpForm, renderSingInForm, singup, singin, logout } = require('../controllers/users.controller');

router.get('/users/signup', renderSingUpForm);
router.post('/users/signup', singup);
router.get('/users/signin', renderSingInForm);
router.post('/users/signin', singin);
router.get('/users/logout', logout);

module.exports = router;