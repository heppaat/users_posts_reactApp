import express from "express";
import cors from "cors";
import fs from "fs/promises";

const server = express();

server.use(cors());
server.use(express.json());

const readFile = async () => {
  try {
    const rawData = await fs.readFile(
      `${__dirname}/../database/data.json`,
      "utf-8"
    );
    const data = JSON.parse(rawData);
    return data;
  } catch (error) {
    console.error("error reading file", error);
    return null;
  }
};

server.get("/api/posts", async (req, res) => {
  const posts = await readFile();
  if (!posts) return res.sendStatus(500);

  res.json(posts);
});

server.post("/api/posts", async (req, res) => {
  const result = req.body;
  if (!result || !result.userId || !result.title || !result.body)
    return res.status(400).json({ error: "Invalid post data" });

  const posts = await readFile();
  if (!posts) return res.sendStatus(500);
  const randomNumber = Math.floor(Math.random() * (1000 - 150 + 1)) + 150;

  const newPost = { ...result, id: randomNumber };

  posts.push(newPost);

  try {
    await fs.writeFile(
      `${__dirname}/../database/data.json`,
      JSON.stringify(posts, null, 2)
    );
    res.json({ id: randomNumber });
  } catch (error) {
    console.error("Error writing file", error);
    res.sendStatus(500);
  }
});

server.listen(3001);
