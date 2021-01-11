const User = require('./../Models/User.model');
const { authSchema, userSchema } = require('../Models/Joi/User.joi');
const createError = require('http-errors');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../config/jwt.config');

module.exports = {
    ft_register: async (req, res, next) => {
        try {
            const result = await userSchema.validateAsync(req.body);
            const doesExit = await User.findOne({email: result.email});
            if (doesExit) throw createError.Conflict(`${result.email} is already register`);
            
            const newUser = new User(result);
            const savedUser = await newUser.save();
            const accessToken = await signAccessToken(savedUser.id);
            const refreshToken = await signRefreshToken(savedUser.id);
            res.status(200).send({accessToken: accessToken, refreshToken: refreshToken})
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    },
    ft_login: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);
            const user = await User.findOne({ email: result.email });
            if (!user) {
                throw createError.NotFound('User is not register');
            }
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) {
                throw createError.Unauthorized('Username/password is not valid');
            }
            const accessToken = await signAccessToken(user.id);
            const refreshToken = await signRefreshToken(user.id);
            res.status(200).send({
                id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                accessToken: accessToken,
                refreshToken: refreshToken });
        } catch (error) {
            if (error.isJoi === true){
                return next(createError.BadRequest("Invalid username or password"));
            }
            next(error);
        }
    },
    ft_refresh_token: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
    
            if (!refreshToken) {
                throw createError.BadRequest();
            }
            const userId = await verifyRefreshToken(refreshToken);
    
            const user = await User.findOne({ _id: userId });
            const accessToken = await signAccessToken(userId);
            const newRefreshToken = await signRefreshToken(userId);
            res.send({
                id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                accessToken: accessToken,
                refreshToken: newRefreshToken });
            // res.send({accessToken: accessToken, refreshToken: newRefreshToken});
        } catch (error) {
            next(error);
        }
    },
    ft_logout: async (req, res, next) => {
        console.log('am here');
        try {
            const { refreshToken } = req.params;
    
            if (!refreshToken) {
                throw createError.BadRequest();
            }
            const userId = await verifyRefreshToken(refreshToken);
            res.status(200).send({result: "1"});
        } catch (error) {
            next(error);
        }
    }
}