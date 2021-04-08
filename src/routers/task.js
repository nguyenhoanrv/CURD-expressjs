const express = require("express");
const router = new express.Router();
const Task = require("../models/Task");

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowUpdateFields = ["description", "completed"];
  const isValidOperation = updateFields.every((field) =>
    allowUpdateFields.includes(field)
  );
  if (!isValidOperation) {
    return res.status(400).send("Invalid updates");
  }
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send("Not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send("Not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
