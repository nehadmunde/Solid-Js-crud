const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const web = require("./router/web");
const port = process.env.PORT || 9001;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectDB(DATABASE_URL);

app.use("/solid-js", web);

app.listen(port, () => {
  console.log(`App listning at port http://localhost:${port}`);
});
