const express = require("express");
const router = express.Router();

const {
  getToDo,
  postToDo,
  putToDo,
  deleteToDo,
} = require("../controllers/todo.controller");

router.get("/", getToDo);
router.post("/", postToDo);
router.put("/:id", putToDo);
router.delete("/:id", deleteToDo);

module.exports = router;
