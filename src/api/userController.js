const User = require('../models/user')
const createError = require('http-errors')
const { verifyToken } = require('../utils/jwt_helper')


module.exports = {
    getUser: async(req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const token = req.headers['authorization'].split(' ')[1];
        try {
            const payload = await verifyToken(token);
            const user = await User.findById(payload.aud).select({password:0});
            res.json({result:user})
        } catch (error) {
            next(error)
        }
    },
    addInterest: async(req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const token = req.headers['authorization'].split(' ')[1];
        try {
            const payload = await verifyToken(token);
            const user = await User.findById(payload.aud);
            user.interests = [...user.interests, ...req.body.interests];
            await user.save();
            res.json({message:'Interests updated successfully!'});
        } catch (error) {
            next(error)
        }
    },
    addHobbies: async(req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const token = req.headers['authorization'].split(' ')[1];
        try {
            const payload = await verifyToken(token);
            const user = await User.findById(payload.aud).select({password:0});
            user.hobbies = [...user.hobbies, ...req.body.hobbies];
            await user.save();
            res.json({message:'Hobbies updated successfully!'});
        } catch (error) {
            next(error)
        }
    }
}