const Spot = require('../model/Spot.js').model;

const SPOT_DB = [
    new Spot(0, "abc@saveaspot.com", "1234567"),
    new Spot(1, "def@saveaspot.com", "1234567")
];

let CURRENT_NEW_ID = 2;

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
        // 把对应id的 spot 的creator 值改成 email
    }

    static async create(spot) {
        // return boolean;  (Optional) can throw Error
        // 把spot 加到数据库
    }


}

exports.repo = SpotRepository;