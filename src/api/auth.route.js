const { Router } = require('express');
const {login, logout, refreshToken, register, resetPassword, forgotPassword} = require('./authController');

const router = Router();

router.post('/register', register)

router.post('/login', login)

router.post('/refresh', refreshToken)

router.post('/forgot', forgotPassword)

router.post('/reset', resetPassword)

module.exports = router;
