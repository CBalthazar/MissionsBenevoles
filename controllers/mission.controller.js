import MissionService from "../services/mission.service.js";

class MissionController {
  constructor() {
    this.service = new MissionService();
  }

  async createMission(req, res, next) {
    if (!req.body?.title || !req.body.description || !req.body.associationId) {
      res.status(400).json({ message: "Error : Bad Request Body" });
    }
    const { title, description, associationId } = req.body;
    try {
      let mission = this.service.createMission(
        title,
        description,
        associationId
      );
      res.status(201).json(mission);
    } catch (err) {
      next(err);
    }
  }

  async readMission(req, res, next) {
    let id = req.params.id;
    try {
      let aission = await this.service.readMission(id);
      res.status(200).json(aission);
    } catch (err) {
      next(err);
    }
  }

  async updateMission(req, res, next) {
    let id = req.params.id;
    let modifications = req.body;
    try {
      let aission = await this.service.updateMission(id, modifications);
      res.status(200).json(aission);
    } catch (err) {
      next(err);
    }
  }

  async deleteMission(req, res, next) {
    let id = req.params.id;
    try {
      this.service.deleteMission(id);
      res.status(200).json({ message: "aission deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export default MissionController;
