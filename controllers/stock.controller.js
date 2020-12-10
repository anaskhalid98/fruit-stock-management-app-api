const db = require("../models");
const Stock = db.stock;
const User = db.user;

// Create and Save a new stock
exports.addStock = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "can not be empty!"
		});
	}

	const stock = new Stock({
		city_name: req.body.city_name,
		goods: req.body.goods,
		user_id: req.session.userData.id
	})

	console.log(req.session.userData.id);


	Stock.create(stock)
		.then(data =>{
			res.status(200).send({
				message: "Stock  was created  successfully."
			});
		})
		.catch(err => {
			res.status(500).send({
				message: "Can't create stock, check session"
			});
		});

};
exports.getCurrentUserStock = (req, res) =>{
	const current_user_id = req.session.userData.id;


	Stock.find({ user_id : current_user_id})
		.then(data =>{
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error getting current user stock"
			});
		});
}
