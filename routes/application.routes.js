import ApplicationController from "../controllers/application.controller.js";
import express from "express";

const router = express.Router();
const controller = new ApplicationController();

// signin
router.post("/signin", (req, res, next) => {
  controller.createapplication(req, res, next);
});
// login
router.post("/", (req, res, next) => {
  controller.readapplication(req, res, next);
});
// get info
router.get("/", (req, res, next) => {
  controller.readapplication(req, res, next);
});
// modify info
router.put("/", (req, res, next) => {
  controller.updateapplication(req, res, next);
});
// delete application
router.delete("/", (req, res, next) => {
  controller.deleteapplication(req, res, next);
});

export default router;
