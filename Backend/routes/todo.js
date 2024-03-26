const { Router } = require("express");
const {
	createTodoSchema,
	updateTodoSchema,
	deleteTodoSchema,
} = require("../types");
const { Todo } = require("../db/todo");
const router = Router();

//in order to get all the todos
router.get("/todos", async (request, response) => {
	//when we want to get all the todos
	try {
		const allTodos = await Todo.find({});

		response.status(200).json({
			message: "All todo are fetched successfully",
			todoList: allTodos,
		});
	} catch (error) {
		response.status(500).json({
			message: "Internal Server Error",
			errorMessage: error.message,
		});
	}
});

//in order to post todos
router.post("/todo", async (request, response) => {
	const title = request.body.title;
	const description = request.body.description;

	const todo = { title, description };

	const parsedPayload = createTodoSchema.safeParse(todo);

	if (!parsedPayload.success) {
		response.status(403).json({
			message: "Incorrect input formats",
		});
		return;
	}

	//put the data in mongo db
	try {
		const todo = await Todo.create({
			title: title,
			description: description,
			completed: false,
		});

		response.status(200).json({
			message: "Todo was created successfully",
		});
	} catch (error) {
		response.status(500).json({
			message: "Internal Server Error",
		});
	}
});

//in order to mark the todo as completed
router.put("/completed", async (request, response) => {
	const updateTodoPayload = request.body;
	const parsedPayload = updateTodoSchema.safeParse(updateTodoPayload);

	if (!parsedPayload.success) {
		response.status(403).json({
			message: "Incorrect input formats",
		});
		return;
	}

	//updating the todo
	try {
		await Todo.updateOne(
			{
				_id: updateTodoPayload.id,
			},
			{
				completed: true,
			}
		);

		response.status(200).json({
			message: "Todo successfully updated",
		});
	} catch (error) {
		response.status(500).json({
			message: "Internal Server Error",
		});
	}
});

//in order to delete a todo
router.delete("/todo", async (request, response) => {
	const deletePayload = request.body;
	const parsedPayload = deleteTodoSchema.safeParse(deletePayload);

	if (!parsedPayload.success) {
		response.status(403).json({
			message: "Incorrect input formats",
		});
		return;
	}

	try {
		const deletedValue = await Todo.deleteOne({ _id: deletePayload.id });

		if (deletedValue.acknowledged) {
			response.status(200).json({
				message: "Todo successfully deleted !!",
			});
		} else {
			response.status(403).json({
				message: "Please make sure to input valid input",
			});
		}
	} catch (error) {
		response.status(500).json({
			message: "Internal Server Error",
		});
	}
});

module.exports = router;
