
require('dotenv').config();
module.exports =
{
	"development": {
		"username": process.env.db_username,
		"password": process.env.db_password,
		"database": process.env.db_dev,
		"host": process.env.db_host,
		"dialect": process.env.db_dialect
	},
	"test": {
		"username": process.env.db_username,
		"password": process.env.db_password,
		"database": process.env.db_test,
		"host": process.env.db_host,
		"dialect": process.env.db_dialect
	},
	"production": {
		"username": process.env.db_username,
		"password": process.env.db_password,
		"database": process.env.db_dev,
		"host": process.env.db_prod,
		"dialect": process.env.db_dialect
	}
}