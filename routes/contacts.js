const express = require("express");
const mongodb = require("../data/database");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

// GET ALL
router.get("/", async (req, res) => {
  const db = mongodb.getDb();

  const contacts = await db.collection("contacts").find();

  contacts.toArray().then((result) => {
    res.status(200).json(result);
  });
});

// GET ONE
router.get("/:id", async (req, res) => {
  const db = mongodb.getDb();
  const contactId = new ObjectId(req.params.id);

  const result = await db
    .collection("contacts")
    .find({ _id: contactId });

  result.toArray().then((contacts) => {
    res.status(200).json(contacts[0]);
  });
});

module.exports = router;