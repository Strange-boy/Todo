const { Router } = require("express");
const { createTodoSchema, updateTodoSchema } = require("../types");
const router = Router();

//in order to get all the todos
router.get("/todos", (request, response) => {});

//in order to post todos
router.post("/todo", (request, response) => {
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
});

//in order to mark the todo as completed
router.put("/completed", (request, response) => {
	const updateTodoPayload = request.body;
	const parsedPayload = updateTodoSchema.safeParse(updateTodoPayload);

	if (!parsedPayload.success) {
		response.status(403).json({
			message: "Incorrect input formats",
		});
		return;
	}
});

module.exports = router;
