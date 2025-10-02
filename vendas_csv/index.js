import fs from "fs";
import parse from "csv-parser";
import express from "express";
// import axios from "axios";

const app = express();
const port = 9090;
app.use(express.json());
const result = [];

function readCsv(file = "product.csv") {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(file)
      .pipe(parse())
      .on("data", (row) => rows.push(row))
      .on("end", () => {
        console.table(rows);
        resolve(rows);
      })
      .on("error", reject);
  });
}

async function getnameCsv(name) {
  const rows = await readCsv();
  if (!name) return rows;
  const q = String(name).toLowerCase();
  return rows.filter((r) =>
    Object.values(r).some((v) => String(v).toLowerCase().includes(q))
  );
}

app.get("/totalSales", async (req, res) => {
    try {
        const { name } = req.query; 
        const products = await getnameCsv(name);

        const total = products.reduce((sum, p) => {
            const key =
                Object.keys(p).find(
                    (k) => k.toLowerCase() === "precounitario"
                ) || null;
            const val = key ? Number(p[key]) : 0;
            return sum + (isNaN(val) ? 0 : val);
        }, 0);

        res.json({ products, total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});	

app.get("/salesByProduct", async (req, res) => {
  const { name } = req.body;
  const productResult = await getnameCsv(name);
  console.log(productResult);

  let sum = 0;
  const test = productResult.map(function (element) {
    sum += element.Quantidade;
  });
  console.log(Text)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
