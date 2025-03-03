import MissionController from "../controllers/mission.controller.js";
import express from "express";

const router = express.Router();
const controller = new MissionController();

// signin
router.post("/signin", (req, res, next) => {
  controller.createMission(req, res, next);
});
// login
router.post("/", (req, res, next) => {
  controller.readMission(req, res, next);
});
// get info
router.get("/", (req, res, next) => {
  controller.readMission(req, res, next);
});
// modify info
router.put("/", (req, res, next) => {
  controller.updateMission(req, res, next);
});
// delete Mission
router.delete("/", (req, res, next) => {
  controller.deleteMission(req, res, next);
});

export default router;
