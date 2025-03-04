import ApplicationRepository from "../repositories/application.repository.js";

class ApplicationService {
  constructor() {
    this.repository = new ApplicationRepository();
  }

  async createApplication(idMission, idUser, state) {
    const id = Math.floor(Math.random() * 1000000).toString();
    this.repository.createApplication(id, idMission, idUser, state);
  }

  async readApplication() {
    this.repository.readApplication();
  }

  async updateApplication(id, state) {
    this.repository.updateApplication(id, state);
  }

  async deleteApplicaiton(id) {
    this.repository.deleteApplication();
  }
}

export default ApplicationService;
