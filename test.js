const UserModelClass = require('./models/user/model');
const { faker } = require('@faker-js/faker');

(async () => {
    const userModel = new UserModelClass();

    // const user = await userModel.getRecordById(1);


    // console.log(user.id);
    // user.id = 5;
    // console.log(user.fullName);
    // console.log(user.getFirstName());


    const newUser = userModel.createEntity();
    newUser.login = 'andrew2';
    newUser.email = 'andrew2';
    newUser.password = 'andrew';
    newUser.fullName = 'Test';
    await newUser.save();

    // const NUMBER_OF_USERS = 10;
    //
    // for (let i = 0; i < NUMBER_OF_USERS; i++) {
    //     const entity = userModel.createEntity()
    //
    //     const firstName = faker.person.firstName();
    //     const lastName = faker.person.lastName();
    //     entity.login = faker.internet.displayName({ firstName, lastName });
    //     entity.fullName = `${firstName} ${lastName}`;
    //     entity.email = faker.internet.email({ firstName, lastName });
    //     entity.password = faker.internet.password();
    //     entity.createdAt = faker.date.between({ from: '2022-01-01T00:00:00.000Z', to: '2024-10-05T00:00:00.000Z' });
    //     entity.updatedAt = faker.date.between({ from: '2022-01-01T00:00:00.000Z', to: '2024-10-05T00:00:00.000Z' });
    //     await entity.save();
    // }
})();