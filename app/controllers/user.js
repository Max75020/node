const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
	try {
		const passwordHash = await bcrypt.hash(req.body.password,10);
		const user = await User.create({
			...req.body,
			password : passwordHash
			});
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occurred while creating new user.",
		});
	}
};

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({
			where:{email:req.body.email}
		})
		if(!user){
			return res.status(404).json({message : "No user"})
		}
		const passwordValid = await bcrypt.compare(req.body.password,user.password);
		if(!passwordValid){
			return res.status(401).json({message : "Password invalid"})
		}
		const token = jwt.sign({id:user.id},process.env.token_secret,{expiresIn:Number(process.env.token_time)})
		
		return res.status(200).json({token,user})	
	} catch(error) {
		res.status(500).json({message : "An error has occured during login"})
	}
};