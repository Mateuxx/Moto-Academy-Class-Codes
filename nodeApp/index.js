const express = require("express");
const app = express();
const port = 9090;

app.use(express.json());

let users = [
  { id: 1, name: "João" },
  { id: 2, name: "Mateus" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.map(users => users.id == userId);
  res.json(user);
});

app.post("/users", (req, res) => {
  const {user} = req.body
  users.push(user)
  console.log(users)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
