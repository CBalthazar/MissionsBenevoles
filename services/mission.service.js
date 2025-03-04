import MissionRepository from "../repositories/mission.repository.js";

class MissionService {
  constructor() {
    this.repository = new MissionRepository();
  }

  async createMission(title, description, associationId) {
    const id = Math.floor(Math.random() * 1000000).toString();
    return this.repository.createMission(id, title, description, associationId);
  }

  async readMission() {
    return this.repository.readMission();
  }

  async updateMission(id, change) {
    return this.repository.updateMission(id, change);
  }

  async deleteMission(id) {
    return this.repository.deleteMission(id);
  }
}

export default MissionService;
