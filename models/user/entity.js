const Entity = require('./../entity');

class UserEntity extends Entity {
    getFirstName() {
        return this.fullName.split(' ')[0];
    }

    async save() {
        if (this.email) {
            this.email = this.getFirstName();
        }

        super.save();
    }

    // getLikeObject() {
    //     ///&& field !== 'password'
    //     return super.getLikeObject();
    // }
}

module.exports = UserEntity;