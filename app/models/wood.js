'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Wood extends Model {
		static associate(models) {
			// define association here
		}
	}
	Wood.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: "Le nom est requis" },
				}
			},
			type: {
				type: DataTypes.ENUM('softwood', 'exotic wood', 'noble and hardwoods'),
				allowNull: false,
				validate: {
					isIn: {
						args: [["softwood", "exotic wood", "noble and hardwoods"]],
						msg: "Type must be one of: softwood, exotic wood, noble and hardwoods",
					},
				},
			},
			hardness: {
				type: DataTypes.ENUM('tender', 'medium-hard', 'hard'),
				allowNull: false,
				validate: {
					isIn: {
						args: [["tender", "medium-hard", "hard"]],
						msg: "Hardness must be one of: tender, medium-hard, hard",
					},
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
			}
		},
		{
			sequelize,
			modelName: 'Wood',
		}
	);
	return Wood;
};
