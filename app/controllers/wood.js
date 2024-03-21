const { Wood } = require("../models");
const fs = require("fs");

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
			where: { hardness: userhardness },
		});
		res.status(200).json(woods);
	} catch (err) {
		res.status(500).json({
			message:
				err.message || "Something wrong happened with your request to retrieve the essences of woods"
		});
	}
}

exports.createWood = async (req, res) => {
	try {

		const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
		const woodData = {
			...JSON.parse(req.body.datas),
			image: pathname
		}

		const wood = await Wood.create(woodData);
		res.status(201).json(wood);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Erreur : pas de création de wood",
		});
	}
}

exports.updateWood = async (req, res) => {
	try {
		const wood = await Wood.findByPk(req.params.id);
		if (!wood) {
			return res.status(404).json({
				message: `Wood with id ${req.params.id} not found.`,
			});
		}
		let newWood = {
			...JSON.parse(req.body.datas),
		};

		if (req.file) {
			const pathname = `${req.protocol}://${req.get(
				"host"
			)}/uploads/${req.file.filename}`;
			newWood = {
				...newWood,
				image: pathname,
			};
			if (wood.image) {
				const filename = wood.image.split("/uploads/")[1];
				fs.unlink(`uploads/${filename}`, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
		}

		await wood.update(newWood);

		res.status(200).json(wood);
	} catch (error) {
		res.status(500).json({
			message:
				error.message || "Some error occurred while updating wood.",
		});
	}
};

exports.deleteWood = async (req, res) => {
	try {
		const wood = await Wood.findByPk(req.params.id);
		if (!wood) {
			return res.status(404).json({
				message: `Wood with id ${req.params.id} not found.`,
			});
		}

		if (wood.image) {
			const filename = wood.image.split("/uploads/")[1];
			fs.unlink(`uploads/${filename}`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			});
		}

		await wood.destroy();

		res.status(200).json({
			message: `Wood with id ${req.params.id} has been deleted.`,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occurred while deleting wood.",
		});
	}
}