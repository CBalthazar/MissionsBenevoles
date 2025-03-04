import MissionRepository from "../repositories/mission.repository.js";

class MissionService {
  constructor() {
    this.repository = new MissionRepository();
  }

  async createMission(title, description, associationId) {
    const id = Math.floor(Math.random() * 1000000).toString();
    this.repository.createMission(id, title, description, associationId);
  }

  async readMission() {
    this.repository.readMission();
  }

  async updateMission() {
    this.repository.updateMission();
  }

  async deleteMission() {
    this.repository.deleteMission();
  }
}

export default MissionService;
