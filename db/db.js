
const Sequelize = require("sequelize");

const seq = new Sequelize("sqlite:../SaveASpotDB/SaveASpotDB.db");

seq.authenticate().then(() => {
    console.log("db connection has been created");
})

exports.client = seq;