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
		.then(data => {
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
exports.getCurrentUserStock = (req, res) => {
	const current_user_id = "5fd252430d1e0a4dbcdae931";

	Stock.find({user_id: current_user_id})
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error getting current user stock"
			});
		});
}

exports.transferMerchandise = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Can not be empty!"
		});
	}

	const number_to_transfer = req.body.number;

	//update departure stock
	Stock.updateOne(
		{_id: req.body.departure, "goods.name": req.body.merchandise},
		{$inc: {"goods.$.total_in_stock": - 1}})
		.then(data=>{
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating stock"
			});
		});

	//update arrival stock
	Stock.updateOne(
		{_id: req.body.arrival, "goods.name": req.body.merchandise},
		{$inc: {"goods.$.total_in_stock": 2}})
		.then(data=>{
			res.status(200).send({message: "Updated successfully"});
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating stock"
			});
		});



}
