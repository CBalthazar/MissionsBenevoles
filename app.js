import express from "express";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.status(404).send("not yet implemented");
});

app.listen(PORT, () => {
  console.log("server is up and running : http://localhost:" + PORT);
});
