const controller = require("../controllers/stock.controller");
const { authJwt } = require("../middleware");


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post("/api/addStock",[authJwt.verifyToken], controller.addStock);
	app.get("/api/Stock",[authJwt.verifyToken], controller.getCurrentUserStock);
	app.post("/api/TransferMerchandise",[authJwt.verifyToken], controller.transferMerchandise);

}
