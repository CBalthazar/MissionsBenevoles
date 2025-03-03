import UserRepository from "../repositories/user.repository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  createUser(fullname, mail, password, isAssociation) {
    let id = Math.floor(Math.random() * 1000000).toString();
    return this.repository.createUser(
      id,
      fullname,
      mail,
      password,
      isAssociation
    );
  }

  readUser(cond) {
    return this.repository.readUser(cond);
  }

  async updateUser(id, modifications) {
    return this.repository.updateUser(id, modifications);
  }

  async deleteUser(id) {
    return this.repository.deleteUser(id);
  }
}

export default UserService;
