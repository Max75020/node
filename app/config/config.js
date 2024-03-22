require('dotenv').config({path:"../.env"});
module.exports =
{
	"development": {
		"username": process.env.db_username,
		"password": process.env.db_password,
		"database": process.env.db_dev,
		"host": process.env.db_host,
		"dialect": process.env.db_dialect,
		"port": process.env.db_port
	},
	"test": {
		"username": process.env.db_username,
		"password": process.env.db_password,
		"database": process.env.db_test,
		"host": process.env.db_host,
		"dialect": process.env.db_dialect,
		"port": process.env.db_port
	},
	"production": {
		"username": process.env.db_username,
		"password": process.env.db_password,
		"database": process.env.db_prod,
		"host": process.env.db_host,
		"dialect": process.env.db_dialect,
		"port": process.env.db_port
	}
}