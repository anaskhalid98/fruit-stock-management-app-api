const mongoose = require("mongoose");

const Stock = mongoose.model(
	"Stock",
	new mongoose.Schema({

		city_name: String,
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		goods: []

	})
);

module.exports = Stock;
