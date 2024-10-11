const Model = require('./../model');
const UserEntity = require('./entity');

class UserModel extends Model {
    constructor() {
        super(
            'users',
            [
                'id',
                'login',
                'fullName',
                'password',
                'email',
                'role',
                'createdAt',
                'updatedAt'
            ],
            UserEntity
        );
    }
}

module.exports = UserModel;