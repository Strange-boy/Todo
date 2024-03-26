const express = require("express");
const app = express();
const todoRouter = require("./routes/todo");

app.use(express.json());
app.use(todoRouter);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
