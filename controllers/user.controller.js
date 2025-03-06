import UserService from "../services/user.service.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  async createUser(req, res, next) {
    if (!req.body?.fullname || !req.body.mail || !req.body.password) {
      res.status(400).json({ message: "Error : Bad Request Body" });
    }
    const { fullname, mail, password } = req.body;
    const isAssociation = req.body.isAssociation || false;
    try {
      const hashedPassword = await argon2.hash(password);
      let user = await this.service.createUser(
        fullname,
        mail,
        hashedPassword,
        isAssociation
      );
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async loginUser(req, res, next) {
    if (!req.body.password || !req.body.mail) {
      res.status(400).json({ message: "password and mail required" });
    }
    const { mail, password } = req.body;

    let users;
    try {
      users = await this.service.readUser({ mail: mail });

      if (!users[0] || !(await argon2.verify(users[0].password, password))) {
        return res.status(401).json({ message: "Identifiants incorrects" });
      }

      const token = jwt.sign(
        { mail: users[0].mail },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });

      const { id, fullname } = users[0];
      res.status(200).json({ id, fullname, mail });
    } catch (err) {
      console.log("error while logging");
    }
  }

  async logoutUser(req, res, next) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0),
    });

    res.status(200).json({ message: "Déconnexion réussie" });
  }

  async readUser(req, res, next) {
    let id = req.params.id;
    try {
      let user = await this.service.readUser({ id: id });
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateUser(req, res, next) {
    let id = req.params.id;
    let modifications = req.body;
    try {
      let user = await this.service.updateUser(id, modifications);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    let id = req.params.id;
    try {
      this.service.deleteUser(id);
      res.status(200).json({ message: "user deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
