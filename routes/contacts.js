const express = require("express");
const mongodb = require("../data/database");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", async (req, res) => {
  const db = mongodb.getDb();
  const contacts = await db.collection("contacts").find().toArray();

  res.status(200).json(contacts);
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", async (req, res) => {
  const db = mongodb.getDb();
  const contactId = new ObjectId(req.params.id);

  const result = await db
    .collection("contacts")
    .findOne({ _id: contactId });

  res.status(200).json(result);
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post("/", async (req, res) => {
  try {
    console.log("🔥 POST HIT");
    console.log("BODY:", req.body);

    const db = mongodb.getDb();

    const newContact = req.body;

    const response = await db.collection("contacts").insertOne(newContact);

    res.status(201).json({ id: response.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
});
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       204:
 *         description: Updated
 */
router.put("/:id", async (req, res) => {
  const db = mongodb.getDb();
  const contactId = new ObjectId(req.params.id);

  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  await db.collection("contacts").replaceOne(
    { _id: contactId },
    updatedContact
  );

  res.status(204).send();
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", async (req, res) => {
  const db = mongodb.getDb();
  const contactId = new ObjectId(req.params.id);

  await db.collection("contacts").deleteOne({ _id: contactId });

  res.status(200).send();
});

module.exports = router;