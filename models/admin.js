const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');
const bcrypt = require('bcrypt');

class Admin extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [8]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        class: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                len: [8]
            }
        }
    },
    {
        hooks:{
            async beforeCreate(newUserData){
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData,10);
                return updatedUserData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'admin'
    }
);

module.exports = Admin;