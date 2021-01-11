const express = require('express');
const { verifyAccessToken } = require('../config/jwt.config');
const router = express.Router();

const { ft_register, ft_login, ft_refresh_token, ft_logout } = require('../Controllers/Auth.controller');

router.get('/', verifyAccessToken, (req, res, next) => {
    res.send({result: 'OK'});
})

router.post('/register', ft_register);

router.post('/login', ft_login);

router.post('/refresh-token', ft_refresh_token);

router.delete('/logout/:refreshToken', ft_logout)

module.exports = router;