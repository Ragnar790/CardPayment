const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
	cors({
		//because the frontend and backend are running on different servers
		credentials: true,
		//frontend path
		origin: "http://localhost:3000",
	})
);

//CREATING THE CONNECTION
const db = mongoose.createConnection("mongodb://localhost:27017/CardDetails", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
db.on("connected", () => {
	console.log("connected to database.");
});

//DEFINING THE SCHEMA
const cardDetailsSchema = new mongoose.Schema({
	cardNumber: Number,
	expDate: String,
	cvc: Number,
	cardOwner: String,
});
//Model
const cardDetailsModel = db.model("cardDetail", cardDetailsSchema);

// function to check null or undefined
const nullOrUnd = (val) => val === null || val === undefined;

app.post("/confirmPayment", async (req, res) => {
	const { cardNumber, expDate, cvc, cardOwner } = req.body;
	console.log(cardNumber, expDate, cvc, cardOwner);
	if (
		cardNumber.toString().length === 16 &&
		!nullOrUnd(expDate) &&
		!nullOrUnd(cvc) &&
		!nullOrUnd(cardOwner)
	) {
		const newCard = new cardDetailsModel({
			cardNumber,
			expDate,
			cvc,
			cardOwner,
		});
		await newCard.save();
		res.status(201).send(newCard);
	} else {
		console.log(cardNumber.toString().length);
		res.status(401).send({
			error:
				"Please enter a valid card number and ensure  all fields are entered",
		});
	}
});

//Defining the port
app.listen(8080, () => {
	console.log("app listening on port 8080");
});
