const Spot = require('../model/Spot.js').model;
const sequelizePkg = require('sequelize');
const db = require('../db/db.js').client;
const DataTypes = sequelizePkg.DataTypes;

const SPOT_TABLE = db.define('Spot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "id"
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "requester_email"
    },
    helper: {
        type: DataTypes.STRING,
        field: "worker_email"
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "location"
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "date"
    },
    reward: {
        type: DataTypes.STRING,
        field: "reward"
    },
    complete: {
        type: DataTypes.BOOLEAN,
        field: "is_completed"
    }
}, {
    tableName: 'Spots',
    timestamps: false
})

class SpotRepository {
    static async getAllActive() {
        // return array (of Spot)
        // 从数据库中找到所有 complete === false 的spot
    }


    static async getAllCreatedByUser(email) {
        // return array (of Spot)
        // 从数据库中找到所有 creator === email 的spot
    }

    static async getAllWorkedByUser(email) {
        // return array (of Spot)
        // 从数据库中找到所有 helper=== email 的spot
    }

    static async help(id, email) {
        // return boolean;  (Optional) can throw Error
        // 把对应id的 spot 的helper 值改成 email
    }

    static async complete(id, email) {
        // return number (the id);  (Optional) can throw Error
        // 把对应id的 spot 的completed 值改成 true
    }

    static async create(spot) {
        // return boolean;  (Optional) can throw Error
        // 把spot 加到数据库
    }


}

exports.repo = SpotRepository;
