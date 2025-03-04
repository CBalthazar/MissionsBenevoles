import MissionService from "../services/mission.service.js";
import UserService from "../services/user.service.js";
import { RoleException } from "../errors/server.exceptions.js";

class MissionController {
  constructor() {
    this.missionService = new MissionService();
    this.userService = new UserService();
  }

  async createMission(req, res, next) {
    if (!req.body?.title) {
      res.status(400).json({ message: "Error : Bad Request Body" });
    }
    const { title } = req.body;
    const description = req.body.description || "";
    try {
      const postingUsers = await this.userService.readUser({
        mail: req.userMail,
      });
      if (!postingUsers[0].isAssociation) {
        throw new RoleException(
          "you cannot add missions as you are not an association"
        );
      }
      let mission = this.missionService.createMission(
        title,
        description,
        postingUsers[0].id
      );
      res.status(201).json(mission);
    } catch (err) {
      if (err instanceof RoleException) console.log(err);
      next(err);
    }
  }

  async readMission(req, res, next) {
    try {
      let mission = await this.missionService.readMission();
      res.status(200).json(mission);
    } catch (err) {
      next(err);
    }
  }

  async updateMission(req, res, next) {
    let id = req.params.id;
    let modifications = req.body;
    try {
      const updatingUsers = this.userService.readUser({ mail: req.userMail });
      if (!updatingUsers[0].isAssociation) {
        throw new RoleException();
      }

      let mission = await this.missionService.updateMission(id, modifications);
      res.status(200).json(mission);
    } catch (err) {
      next(err);
    }
  }

  async deleteMission(req, res, next) {
    let id = req.params.id;
    try {
      this.missionService.deleteMission(id);
      res.status(200).json({ message: "mission deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export default MissionController;
