require("dotenv").config();
var cors = require("cors");

const app = require("./app.js");
const port = process.env.PORT;

var corsOptions = {
	origin: process.env.ORIGIN,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
