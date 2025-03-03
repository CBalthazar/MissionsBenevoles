import UserRepository from "../repositories/user.repository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  createUser(fullname, mail, password, isAssociation) {
    // gerer id et password
    let id = "maisnonincr";
    return this.repository.createUser(
      id,
      fullname,
      mail,
      password,
      isAssociation
    );
  }

  async readUser(cond) {
    this.repository.readUser(cond);
  }

  async updateUser(id, modifications) {
    this.repository.updateUser(id, modifications);
  }

  async deleteUser(id) {
    this.repository.deleteUser(id);
  }
}

export default UserService;
