const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./models/index");

const app = express();

const corsOptions = {
	origin: "http://localhost:3001"
};

app.use(cors(corsOptions));
app.use(session({
	secret:'secret-key',
	resave: false,
	saveUninitialized:false
}))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Welcome to fruit stock management application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});



//connect to database
db.mongoose.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch(err => {
		console.log("Cannot connect to the database!", err);
		process.exit();
	});

//routes
require('./routes/auth.routes')(app);
require('./routes/stock.routes')(app);
