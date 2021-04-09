const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
//register
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCerdentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();

    res.send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
});
//get me
router.get("/users/me", AuthMiddleware, (req, res) => {
  res.send(req.user);
});
//get user by id
router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("Not found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get all user
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update user
router.patch("/users/:id", AuthMiddleware, async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowUpdateFields = ["name", "email", "password", "age"];
  const isValidOperation = updateFields.every((field) =>
    allowUpdateFields.includes(field)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = req.user;
    updateFields.forEach((field) => (user[field] = req.body[field]));
    await user.save();
    if (!user) {
      return res.status(404).send("Not found");
    }
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

//delete user
router.delete("/users/me", AuthMiddleware, async (req, res) => {
  try {
    const user = await req.user.remove();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
