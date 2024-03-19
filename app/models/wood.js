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
			name: DataTypes.STRING,
			type: {
				type: DataTypes.ENUM('softwood', 'exotic wood', 'noble and hardwoods'),
				allowNull: false,
			},
			hardness: {
				type: DataTypes.ENUM('tender', 'medium-hard', 'hard'),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Wood',
		}
	);
	return Wood;
};
