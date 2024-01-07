const {Sequelize, DataTypes} = require("sequelize");
const path = require("path")

const dbPath = path.join(__dirname,"./../../");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: `${dbPath}/database.sqlite`
  });

async function authenticateConnection(){
    try {
        await sequelize.authenticate();
        console.log("connection established successfully!");
    } catch(error) {
        console.error("unable to connect to database", error);
    }
}

module.exports = {sequelize, authenticateConnection};