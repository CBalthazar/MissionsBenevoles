import MissionRepository from "../repositories/mission.repository.js";

class MissionService {
  constructor() {
    this.repository = new MissionRepository();
  }

  async createMission() {
    this.repository.createMission();
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
