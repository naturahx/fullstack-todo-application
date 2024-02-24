import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let data = [
  {
    "title": "XYII",
    "description": "PEISNIS"
  },
  {
    "title": "X14444444445YII",
    "description": "PEI123111111111111111111111111SNIS"
  },
  {
    "title": "XY31231II",
    "description": "PEISNI123123123"
  },
];

app.post("/", (req, res) => {
  const { title, description } = req.body;
  data.push({ title, description });
  res.send("Data added successfully");
});

app.get("/", (req, res) => {
  res.json(data);
});

app.listen(3000);
