const Controller = require('./../controller');
const UserModel = require('./model');
const { body } = require("express-validator");

class UserController extends Controller {
    constructor() {
        super(new UserModel(), [
            body('login')
                .notEmpty().withMessage('Login cannot be empty'),

            body('email')
                .notEmpty().withMessage('Email cannot be empty')
                .isEmail().withMessage('Must be a valid email'),
        ]);
    }
}

module.exports = new UserController();