import ApplicationRepository from "../repositories/application.repository.js";

class ApplicationService {
  constructor() {
    this.repository = new ApplicationRepository();
  }

  async createApplication() {
    this.repository.createApplication();
  }

  async readApplication() {
    this.repository.readApplication();
  }

  async updateApplication() {
    this.repository.updateApplication();
  }

  async deleteApplicaiton() {
    this.repository.deleteApplication();
  }
}

export default ApplicationService;
