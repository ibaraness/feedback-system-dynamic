const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./../db/db");

class UserFeedback extends Model { }
UserFeedback.init({
    fid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    name: "UserFeedback"
});
UserFeedback.sync();

module.exports.UserFeedback = UserFeedback;