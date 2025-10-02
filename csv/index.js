import fs from "fs";
import parse from "csv-parser";
import express from "express";
// import axios from "axios";

const app = express();
const port = 9090;
app.use(express.json());

async function getnameCsv(name) {
  const result = [];

  // return new Promise (r)
  //uso de promisses i need to study that
  fs.createReadStream("example.csv")
    .pipe(parse())
    .on("data", (row) => {
      result.push(row);
    })
    .on("end", () => {
      return result

    });
  console.log(result);
  // return result;
}

app.get("/name", async (req, res) => {
  const { name } = req.body;
  console.log("name: ", name);
  const result = await getnameCsv(name);
  console.log(result)
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
