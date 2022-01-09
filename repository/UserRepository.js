const User = require('../model/User.js').model;
const db = require('../db/db.js').client;

const sequelizePkg = require('sequelize');
const DataTypes = sequelizePkg.DataTypes;

const USER_TABLE = db.define('Users', {
    id: {              // attribute name used in DB
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "id"  // column name in DB
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: "email"
    },
    secret: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "secret"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
    }
}, {
    tableName: 'Users',
    timestamps: false
});



class UserRepository {

    static async getUser(email) {
        const usr = await USER_TABLE.findOne({
            where: {
                email: email
            }
        });

        return new User(usr.id, usr.email, usr.secret);
    }

    static async addUser(email, password) {

        try {
            await USER_TABLE.create(
                {
                    email: email,
                    secret: password
                }
            );

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

exports.repo = UserRepository;