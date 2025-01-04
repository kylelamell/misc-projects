import { Router } from "express";
import { config } from "dotenv";

config();
const apiKey = process.env.API_KEY;

const router = Router();

router.post("/register", async (req, res) => {
  console.log("we made it to POST /register");

  const { name, email, password} = req.body;

  try {
    // try to register

    const responseObject = { token: "random generated token used to authenticate if registration successful" }

    return res.status(200).json({ data: responseObject});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: "failed to register" });
  }
});

router.post("/login", async (req, res) => {
  console.log("we made it to POST /login");

  const { email, password } = req.body;

  try {
    // try to login

    const responseObject = { token: "random generated token used to authenticate if login successful" }

    return res.status(200).json({ data: "we logging in" });
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: "failed to login"});
  }
});

router.post("/todos", async (req, res) => {
  console.log("we made it to POST /todos");

  const { title, description } = req.body;

  try {
    // try to create todos

    const responseObject = { id: "find the next id", title: title, description: description }

    return res.status(200).json({ data: responseObject });
  }
  catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.put("/todos/:todoId", async (req, res) => {
  console.log("we made it to PUT /todos/:todoId");

  const todoId = parseInt(req.params.todoId);

  const { title, description } = req.body;

  try {
    // try to update the todo

    const responseObject = { id: todoId, title, title, description: description }

    return res.status(200).json({ data: responseObject });
  }
  catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Forbidden" });
  }
});

router.delete("/todos/:todoId", async (req, res) => {
  console.log("we made it to DELETE /todos/:todoId");

  const todoId = parseInt(req.params.todoId);

  try {
    // try to delete the todo
    return res.status(204).json({ data: "we deleting todos" });
  }
  catch (error) {
    console.log(error);
    return res.status(403).json({ massage: "Forbidden" });
  }
});

router.get("/todos", async (req, res) => {
  console.log("we made it to GET /todos");

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    // try to get todos

    const responseObject = {
      data: [
        {
          id: 1,
          title: "Buy groceries",
          description: "Buy milk, eggs, bread"
        },
        {
          id: 2,
          title: "Pay bills",
          description: "Pay electricity and water bills"
        }
      ],
      page: 1,
      limit: 10,
      total: 2
    }


    return res.status(200).json({ data: responseObject });
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unauthorized" });
  }
});



export { router}