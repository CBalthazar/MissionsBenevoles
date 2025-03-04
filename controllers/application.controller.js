import ApplicationService from "../services/application.service.js";
import UserService from "../services/user.service.js";
import {
  IncompleteReqException,
  RoleException,
} from "../errors/server.exceptions.js";

class ApplicationController {
  constructor() {
    this.applicationService = new ApplicationService();
    this.userService = new UserService();
  }

  async createApplication(req, res, next) {
    try {
      if (!req.body?.idUser || !req.body.idMission)
        throw new IncompleteReqException("Bad Request");
      const { idUser, idMission } = req.body;
      const state = req.body.state || null;
      const applicants = await this.userService.readUser({
        mail: req.userMail,
      });

      if (applicants[0].isAssociation) {
        throw new RoleException("Associations cannot apply to missions ");
      }
      let application = await this.applicationService.createApplication(
        idMission.toString(),
        idUser.toString(),
        state
      );
      res.status(201).json(application);
    } catch (err) {
      next(err);
    }
  }

  async readApplication(req, res, next) {
    let id = req.params.id;
    try {
      let application = await this.applicationService.readApplication(id);
      res.status(200).json(application);
    } catch (err) {
      next(err);
    }
  }

  async updateApplication(req, res, next) {
    if (!req.body?.state)
      throw new IncompleteReqException("missing state change");
    const id = req.params.id;
    const state = req.body.state;

    try {
      const updatingUsers = await this.userService.readUser({
        mail: req.userMail,
      });
      if (!updatingUsers[0].isAssociation) {
        throw new RoleException(
          "Volunteers aren't allowed to change application state"
        );
      }

      let application = await this.applicationService.updateApplication(
        id,
        state
      );
      res.status(200).json(application);
    } catch (err) {
      next(err);
    }
  }

  async deleteApplication(req, res, next) {
    let id = req.params.id;
    try {
      this.applicationService.deleteApplication(id);
      res.status(200).json({ message: "application deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export default ApplicationController;
