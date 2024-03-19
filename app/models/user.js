'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init({
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: "Le prénom est requis" },
			},
		},
		lastName:
		{
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: "Le nom est requis" },
			},
		},
		email: {
			type: DataTypes.MAIL,
			allowNull: false,
			validate: {
				notEmpty: { msg: "L'email est requise" },
			},
			unique: true,
			isEmail: { msg: "L'email doit être au bon format" },
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: "Le mot de passe est requis" },
			},
		},
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};