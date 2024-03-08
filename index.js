const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiBaseUrl = process.env.GHOST_SERVER_URL;
const apiKey = process.env.GHOST_API_KEY;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/published-blogs", async (req, res) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/posts/?key=${apiKey}&filter=status:published&limit=all&include=authors&order=published_at%20ASC`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    res.status(500).json({ error: "Error fetching published blogs" });
  }
});

app.get("/published-blogs-last-week", async (req, res) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/posts/?key=${apiKey}&filter=published_at:>now-7d&limit=all&include=authors&order=published_at%20ASC`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching published blogs from last week:", error);
    res.status(500).json({ error: "Error fetching published blogs from last week" });
  }
});

app.get("/blog/:idOrTitle", async (req, res) => {
  const { idOrTitle } = req.params;
  const filter = `title:~'${idOrTitle}',id:'${idOrTitle}',slug:'${idOrTitle}'`;
  const encodedFilter = encodeURIComponent(filter);
  const url = `${apiBaseUrl}/posts?key=${apiKey}&filter=${encodedFilter}&include=authors&order=published_at%20ASC`;
  try {
    const { data: blog } = await axios.get(url);
    res.json(blog);
  } catch (error) {
    console.error(`Error fetching blog with ID or title or slug '${encoded}'`);
    console.log(error);
    res.status(500).json({ error: `Error fetching blog with ID or title or slug '${encoded}'` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
