import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { createDbConnection } from "./db.js";
import { add, getById, getPaginated } from "./monument.js";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const { dbPath } = config;
const db = createDbConnection(dbPath);

app.get("/", (req, res) => {
  res.send("Coloso API");
});

app.post("/monument", async (req, res) => {
  try {
    const { body: monument } = req;
    console.log(monument);
    const row = await add(db, monument);
    res.json(row);
  } catch (err) {
    console.log(err);
  }
});

app.get("/monument/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const monument = await getById(db, id);
  res.json(monument);
});

app.get("/monument/page/:pgNum", async (req, res) => {
  const { pgNum } = req.params;
  const page = await getPaginated(db, pgNum, 50);
  res.json(page);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
