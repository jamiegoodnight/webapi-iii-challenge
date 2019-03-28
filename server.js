const express = require("express");

const postsRouter = require("./posts/posts-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

server.use(express.json());

// Custom Middleware

function capitalize(req, res, next) {
  if (req.body.name) {
    req.body.name[0].toUpperCase();
    next();
  } else {
    next();
  }
}

server.use(capitalize);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Posts and Users API</h>
    <p>Welcome to the Lambda Posts and Users API</p>
  `);
});

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

module.exports = server;
