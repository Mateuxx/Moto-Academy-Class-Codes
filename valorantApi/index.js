const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world express");
});

app.post("/agents", async (req, res) => {
  try {
    const { name, fetchByUuid } = req.body;
    const response = await axios.get("https://valorant-api.com/v1/agents");

    // return res.json (response)
    const agents = (response.data.data) || [];

    console.log(response.data)

    if (!name) return res.json({ count: agents.length, agents });

    const matches = agents.filter(
      (a) =>
        a.displayName &&
        a.displayName.toLowerCase().includes(name.toLowerCase())
    );

    if (matches.length === 0) {
      return res.status(404).json({ message: "Agent not found" });
    }

    if (matches.length === 1 && fetchByUuid) {
      const uuid = matches[0].uuid;
      try {
        const fullResp = await axios.get(
          `https://valorant-api.com/v1/agents/${uuid}`
        );
        return res.json(fullResp.data);
      } catch (err) {
        return res
          .status(502)
          .json({
            message: "Failed to fetch agent by UUID",
            detail: err.message,
          });
      }
    }

    // return res.json({ count: matches.length, matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", detail: err.message });
  }
});

app.post("/cardFull", async (req, res) => {
  const { name } = req.body;
  req.query;
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
