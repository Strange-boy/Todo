require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.mongoDB_string);

//define the scheme
const TodoSchema = new mongoose.Schema({
	title: String,
	description: String,
	completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
	Todo,
};
