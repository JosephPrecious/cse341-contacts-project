const express = require("express");
const mongodb = require("./data/database");
const swaggerDocs = require("./swagger");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// IMPORTANT: routes first
const contactsRoutes = require("./routes/contacts");
app.use("/contacts", contactsRoutes);

app.get("/", (req, res) => {
  res.send("Contacts API");
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});

// Swagger LAST (important for stability)
swaggerDocs(app);