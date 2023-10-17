const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;

const uri = "mongodb+srv://Safae:Safae123@atlascluster.mdi8uzj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to the MongoDB server");
  } catch (err) {
    console.log(err);
  }
}

connectToDB();

app.use(express.json());


async function createDatabaseAndCollection() {
  try {
    const db = client.db("basedonnee");

    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === "projects"
    );
    if (!collectionExists) {
      await db.createCollection("projects");
      console.log("Collection 'projects' created");
    }

    const tasksCollectionExists = collections.some(
      (collection) => collection.name === "tasks"
    );
    if (!tasksCollectionExists) {
      await db.createCollection("tasks");
      console.log("Collection 'tasks' created");
    }

    console.log("Successfully created the database and collections.");
  } catch (err) {
    console.error(err);
  }
}

createDatabaseAndCollection();


app.post("/projects", async (req, res) => {
  try {
    const db = client.db("basedonnee");
    const projects = db.collection("projects");
    const { label, description,  startingDate, endingDate } = req.body;
    const result = await projects.insertOne({ label, description, startingDate, endingDate });
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/tasks", async (req, res) => {
  try {
    const db = client.db("basedonnee");
    const tasks = db.collection("tasks");
    const { label, description, starting_date, ending_date, selectedProject } = req.body;
    const result = await tasks.insertOne({ label, description, starting_date, ending_date, selectedProject });
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/projects", async (_, res) => {
  try {
    const db = client.db("basedonnee");
    const projects = db.collection("projects");
    const result = await projects.find({}, { projection: { _id: 0 } }).toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/tasks", async (_, res) => {
  try {
    const db = client.db("basedonnee");
    const tasks = db.collection("tasks");
    const result = await tasks.find({}, { projection: { _id: 0 } }).toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
