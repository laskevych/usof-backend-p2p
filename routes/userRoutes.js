const express = require('express');
const router = express.Router();
const userController = require('./../models/user/controller');

router.get('/', userController.getAll.bind(userController));
router.get('/:id/', userController.getById.bind(userController));
router.post('/',
    userController.validate.bind(userController), // 1
    userController.create.bind(userController) // 2
);

module.exports = router;