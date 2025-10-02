const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world express");
});

app.post("/card", async (req, res) => {
  const { name } = req.body;
  const response = await axios.get(
    `https://api.scryfall.com/cards/named?fuzzy=${name}`
  );
  res.send(response.data);
});

app.post("/cardFull", async (req, res) => {
  const { name } = req.body;
  const response = await axios.get(
    `https://api.scryfall.com/cards/named?fuzzy=${name}`
  );
  const data = response.data;
//   console.log(cardData);
  //   const info = {
  //     name: cardData.name,
  //     mana: cardData.mana_cost,
  //   };

  res.json(data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
