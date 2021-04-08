const express = require("express");
const app = new express();
const port = process.env.PORT || 3000;

//routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
//connect db
const db = require("./db");
db.connect();
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

//route task

app.listen(port, () => {
  console.log(`App run in port ${port}`);
});
