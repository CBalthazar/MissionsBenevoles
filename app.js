import express from "express";
import userRoutes from "./routes/user.routes.js";
import missionRoutes from "./routes/mission.routes.js";
import applicationRoutes from "./routes/application.routes.js";

import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/user", userRoutes);
app.use("/mission", missionRoutes);
app.use("/application", applicationRoutes);

app.use((err, req, res, next) => {
  const status = err.code || 500;
  const message =
    status === 500
      ? "server broke down, developpers are working to fix it"
      : err.message;
  res.status(status).json({ message: message });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(PORT, () => {
  console.log("server is up and running : http://localhost:" + PORT);
});
