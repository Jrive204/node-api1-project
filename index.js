// implement your API here
const express = require("express");
const Users = require("./data/db");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ Hello: "testing" });
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err) & res.status(500));
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)

    .then(users =>
      !users
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.status(200).json(users) & console.log(users)
    )
    .catch(err =>
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      })
    );
});

server.post("/api/users", (req, res) => {
  const Userinfo = req.body;

  Users.insert(Userinfo)
    .then(users =>
      Object.keys(req.body).length > 2
        ? res.status(500).json({
            errorMessage:
              "There was an error while saving the user to the database!!S!"
          })
        : Userinfo.name && Userinfo.bio
        ? res.status(201).json(users)
        : res.status(400).json({
            message: "Please provide name and bio for the user."
          })
    )
    .catch(err =>
      !Userinfo.name || !Userinfo.bio
        ? res.status(400).json({
            errorMessage: "Please provide name and bio for the user!!."
          })
        : res.status(500).json({
            errorMessage:
              "There was an error while saving the user to the database..."
          })
    );
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)

    .then(users =>
      !users
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.status(200).json(users)
    )
    .catch(err =>
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      })
    );
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  Users.update(id, { name, bio })
    .then(user =>
      !user
        ? res.status(404).json({
            message: "The user with the specified ID does not exist"
          })
        : Object.keys(req.body).length > 2
        ? res.status(500).json({
            errorMessage: "The user information could not be modified!!"
          })
        : name && bio
        ? res.status(200).json(user) &
          console.log(Object.keys(req.body).length > 2)
        : res.status(400).json({
            message: "Please provide name and bio for the user."
          })
    )
    .catch(err => {
      res.status(500).json({
        errorMessage: "The user information could not be modified."
      });
    });
});

const port = 5000;
server.listen(port, () => console.log(`Api on port: ${port}`));
