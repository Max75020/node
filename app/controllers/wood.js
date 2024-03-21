const { Wood } = require("../models");
const fs = require("fs");
const { generateWoodLinks, generateGlobalLinksWoods } = require("../services/generateLink.js");

exports.readAll = async (req, res) => {
	try {
		const woods = await Wood.findAll();
		const woodsLinks = woods.map((wood) => {
			return {
				...wood.toJSON(),
				links: generateWoodLinks(wood)
			}
		})
		res.status(200).json({ woods: woodsLinks, links: generateGlobalLinksWoods() });
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
		const woodsLinks = woods.map((wood) => {
			return {
				...wood.toJSON(),
				links: generateWoodLinks(wood)
			}
		})
		res.status(200).json({ woods: woodsLinks, links: generateGlobalLinksWoods() });
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
		let wood = await Wood.create({
			...JSON.parse(req.body.datas),
			image: pathname,
		});
		wood = {
			...wood.toJSON(),
			links: generateWoodLinks(wood)
		}

		res.status(201).json(wood);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Erreur : pas de création de wood",
		});
	}
}

exports.updateWood = async (req, res) => {
	try {
		let wood = await Wood.findByPk(req.params.id);
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
		wood = {
			...wood.toJSON(),
			links: generateWoodLinks(wood)
		}

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