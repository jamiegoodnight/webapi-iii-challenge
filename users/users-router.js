const express = require("express");

const db = require("../data/helpers/userDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "users could not be retrieved" });
    });
});

// GET a user object with the specified id ----------

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "the user with the specified id could not be found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "this user could not be retrieved" });
    });
});

// POST will create a user object ----------

router.post("/", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    db.insert(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "there was an error saving your user" });
      });
  } else {
    res.status(400).json({ message: "please provide a name for your user" });
  }
});

// DELETE will remove a user object with the specified id ----------

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "the user with the specified id could not be found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "this user could not be deleted" });
    });
});

// PUT updates a user object with the specified id ----------

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (updates.name) {
    db.update(id, updates)
      .then(updates => {
        if (updates) {
          res.status(200).json(updates);
        } else {
          res.status(404).json({
            message: "the user with the specified id could not be found"
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "the user information could not be modified" });
      });
  } else {
    res.status(400).json({ message: "please provide a name for this user" });
  }
});

// GET posts made by a user object with a specified id ----------

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  db.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "the user's posts could not be retrieved" });
    });
});

module.exports = router;
