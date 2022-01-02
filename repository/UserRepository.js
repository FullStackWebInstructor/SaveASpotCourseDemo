const User = require('../model/User.js').model;

const USER_DB = [
    new User(0, "abc@saveaspot.com", "1234567"),
    new User(1, "def@saveaspot.com", "1234567")
];

let CURRENT_NEW_ID = 2;

class UserRepository {

    static async getUser(email) {
        return USER_DB.find((u) => {
            return u.email === email;
        })
    }

    static async addUser(email, password) {
        const existingUser = USER_DB.find((u) => {
            return u.email === email;
        });
        if (existingUser !== undefined) {
            return false;
        }

        USER_DB.push(new User(CURRENT_NEW_ID, email, password));
        CURRENT_NEW_ID++;
        return true;
    }
}

exports.repo = UserRepository;