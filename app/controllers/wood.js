const { Wood } = require("../models");

exports.readAll = async (req, res) => {
	try {
		const woods = await Wood.findAll();
		res.status(200).json(woods);
	} catch (err) {
		res.status(500).json({
			message:
				err.message || "Something wrong happened with your request to retrieve the essences of woods"
		});
	}
}

exports.readByHardness = async (req, res) => {
	try {
		const userhardness = req.params.hardness;
		const woods = await Wood.findAll({
			where: {hardness:userhardness},
		});
		res.status(200).json(woods);
	} catch (err) {
		res.status(500).json({
			message:
				err.message || "Something wrong happened with your request to retrieve the essences of woods"
		});
	}
}