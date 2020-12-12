const db = require("../models");
const jwt_decode = require('jwt-decode');
const Stock = db.stock;
const User = db.user;

// Create and Save a new stock
/**
 {
    "city_name": "Marseille",
    "goods": [
        {
            "name": "Orange",
            "total_in_stock": 20
        },
        {
            "name": "Banane",
            "total_in_stock": 19
        },
        {
            "name": "Pomme",
            "total_in_stock": 30
        },
        {
            "name": "Fraise",
            "total_in_stock": 18
        },
        {
            "name": "Cerise",
            "total_in_stock": 5
        }
    ]
}
 * */
exports.addStock = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "can not be empty!"
		});
	}

	let token = req.headers["x-access-token"];
	const decode = jwt_decode(token);

	const stock = new Stock({
		city_name: req.body.city_name,
		goods: req.body.goods,
		user_id: decode.id
	})

	console.log(stock);

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
	let token = req.headers["x-access-token"];
	const decode = jwt_decode(token);

	Stock.find({user_id: decode.id})
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

	const quantity_to_change = parseInt(req.body.quantity);

	//update departure stock
	Stock.updateOne(
		{_id: req.body.departure, "goods.name": req.body.merchandise},
		{$inc: {"goods.$.total_in_stock": -quantity_to_change}})
		.then(data => {
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({
				message: "Error updating stock"
			});
		});

	//update arrival stock
	Stock.updateOne(
		{_id: req.body.arrival, "goods.name": req.body.merchandise},
		{$inc: {"goods.$.total_in_stock": quantity_to_change}})
		.then(data => {
			res.status(200).send({message: "Updated successfully"});
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({
				message: "Error updating stock"
			});
		});


}
