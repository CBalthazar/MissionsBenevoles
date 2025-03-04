import ApplicationController from "../controllers/application.controller.js";
import express from "express";

const router = express.Router();
const controller = new ApplicationController();

// create Application
router.post("/", (req, res, next) => {
  controller.createApplication(req, res, next);
});
// get info
router.get("/", (req, res, next) => {
  controller.readApplication(req, res, next);
});
// modify info
router.put("/", (req, res, next) => {
  controller.updateApplication(req, res, next);
});
// delete application
router.delete("/", (req, res, next) => {
  controller.deleteApplication(req, res, next);
});

export default router;
