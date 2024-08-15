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

server.listen(3001);
