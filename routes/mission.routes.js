import MissionController from "../controllers/mission.controller.js";
import { authToken } from "../middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();
const controller = new MissionController();

// create Mission
router.post("/", authToken, (req, res, next) => {
  controller.createMission(req, res, next);
});
// get info
router.get("/", authToken, (req, res, next) => {
  controller.readMission(req, res, next);
});
// modify info
router.put("/", authToken, (req, res, next) => {
  controller.updateMission(req, res, next);
});
// delete Mission
router.delete("/", authToken, (req, res, next) => {
  controller.deleteMission(req, res, next);
});

export default router;
