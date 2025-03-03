import ApplicationService from "../services/application.service.js";

class ApplicationController {
  constructor() {
    this.service = new ApplicationService();
  }

  async createApplication(req, res, next) {
    let fullname, mail, password, isAssociation;
    try {
      ({ fullname, mail, password, isAssociation } = req.body);
    } catch (err) {
      console.error(err);
      next(new IncompleteReqException(400));
    }
    try {
      let application = this.service.createApplication(
        fullname,
        mail,
        password,
        isAssociation
      );
      res.status(201).json(application);
    } catch (err) {
      next(err);
    }
  }

  async readApplication(req, res, next) {
    let id = req.params.id;
    try {
      let application = await this.service.readApplication(id);
      res.status(200).json(application);
    } catch (err) {
      next(err);
    }
  }

  async updateApplication(req, res, next) {
    let id = req.params.id;
    let modifications = req.body;
    try {
      let application = await this.service.updateApplication(id, modifications);
      res.status(200).json(application);
    } catch (err) {
      next(err);
    }
  }

  async deleteApplication(req, res, next) {
    let id = req.params.id;
    try {
      this.service.deleteApplication(id);
      res.status(200).json({ message: "application deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export default ApplicationController;
