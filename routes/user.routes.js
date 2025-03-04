import UserController from "../controllers/user.controller.js";
import { authToken } from "../middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();
const controller = new UserController();

// signin
router.post("/signin", (req, res, next) => {
  controller.createUser(req, res, next);
});
// login
router.post("/login", (req, res, next) => {
  controller.loginUser(req, res, next);
});
// logout
router.post("/logout", (req, res, next) => {
  controller.logoutUser(req, res, next);
});

// get info
router.get("/:id", authToken, (req, res, next) => {
  controller.readUser(req, res, next);
});

// modify info
router.put("/:id", authToken, (req, res, next) => {
  controller.updateUser(req, res, next);
});

// delete user
router.delete("/:id", authToken, (req, res, next) => {
  controller.deleteUser(req, res, next);
});

export default router;
