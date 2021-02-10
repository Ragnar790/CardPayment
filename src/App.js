import "./App.css";
import cardImg from "./cards.png";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";

function App() {
	//STATES
	const [cardNumber, setCardNumber] = useState();
	const [expDate, setExpDate] = useState("");
	const [cvc, setCVC] = useState();
	const [cardOwner, setCardOwner] = useState("");
	const [error, setError] = useState("");

	const submitHandler = () => {
		fetch("http://localhost:8080/confirmPayment", {
			method: "POST",
			body: JSON.stringify({ cardNumber, expDate, cvc, cardOwner }),
			headers: { "Content-Type": "application/json" },
		})
			.then((r) => {
				if (r.ok) {
					return { success: true };
				} else {
					return r.json();
				}
			})
			.then((r) => {
				if (r.success === true) {
					window.alert(
						`Payment confirmed with card number ${cardNumber}, expiration date ${expDate}, cvc ${cvc}, and card owner named ${cardOwner}`
					);
				} else {
					setError(r.error);
				}
			});
	};
	return (
		<div className="App">
			<h1>Payment Details</h1>
			<img src={cardImg} alt="cards" />
			<Form>
				<FormGroup>
					<Label for="cardNumber">Card Number</Label>
					<Input
						type="number"
						id="cardNumber"
						placeholder="Valid Card Number"
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="ExpirationDate">Expiration Date</Label>
					<Input
						type="text"
						id="ExpirationDate"
						placeholder="MM/YY"
						value={expDate}
						onChange={(e) => setExpDate(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="CVC">CV Code</Label>
					<Input
						type="number"
						name="email"
						id="CVC"
						placeholder="CVC"
						value={cvc}
						onChange={(e) => setCVC(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="cardOwner">Card Owner</Label>
					<Input
						type="email"
						name="email"
						id="cardOwner"
						placeholder="Card Owner Name"
						value={cardOwner}
						onChange={(e) => setCardOwner(e.target.value)}
					/>
				</FormGroup>
				<h6 className="error">{error}</h6>
				<Button color="primary" onClick={submitHandler}>
					Confirm Payment
				</Button>
			</Form>
		</div>
	);
}

export default App;
