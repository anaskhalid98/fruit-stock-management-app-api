const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty",
		});
	}

	const hashedPassword = bcrypt.hashSync(req.body.password, 8);

	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword ,
		stock :[]
	});

	user.save((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		else {
			res.send({ message: "User was registered successfully!", data : user });
		}
	});
};

exports.signin = (req, res) => {
	User.findOne({
		username: req.body.username
	}).exec((err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			let passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!"
				});
			}

			let token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400 // 24 hours
			});

			const userData = {
				id: user._id,
				username: user.username,
				email: user.email,
				stock: user.stock,
				accessToken: token
			};
			res.status(200).send({accessToken:token});
		});
};
