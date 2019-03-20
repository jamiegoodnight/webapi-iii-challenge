const express = require("express");

const db = require("../data/helpers/postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "posts could not be retrieved" });
    });
});

// GET a post object with the specified id ----------

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "the post with the specified id could not be found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "this post could not be retrieved" });
    });
});

// POST will create a post object ----------

router.post("/", (req, res) => {
  const newPost = req.body;

  if (newPost.user_id && newPost.text) {
    db.insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "there was an error saving your post" });
      });
  } else {
    res
      .status(400)
      .json({ message: "please provide a title and contents for your post" });
  }
});

// DELETE will remove a post object with the specified id ----------

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(post => {
      if (post) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "the post with the specified id could not be found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "this post could not be deleted" });
    });
});

// PUT updates a post object with the specified id ----------

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (updates.title || updates.contents) {
    db.update(id, updates)
      .then(updates => {
        if (updates) {
          res.status(200).json(updates);
        } else {
          res.status(404).json({
            message: "the post with the specified id could not be found"
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "the post information could not be modified" });
      });
  } else {
    res
      .status(400)
      .json({ message: "please provide a title and contents for this post" });
  }
});

module.exports = router;
