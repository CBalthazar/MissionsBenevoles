import ApplicationRepository from "../repositories/application.repository.js";

class ApplicationService {
  constructor() {
    this.repository = new ApplicationRepository();
  }

  async createApplication(idMission, idUser, state) {
    const id = Math.floor(Math.random() * 1000000).toString();
    return this.repository.createApplication(id, idMission, idUser, state);
  }

  async readApplication() {
    return this.repository.readApplication();
  }

  async updateApplication(id, state) {
    return this.repository.updateApplication(id, state);
  }

  async deleteApplicaiton(id) {
    return this.repository.deleteApplication();
  }
}

export default ApplicationService;
