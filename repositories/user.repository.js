import { createPool } from "mariadb";
import "dotenv/config"; // to remove

console.log(process.env.PASSWORD);
class UserRepository {
  constructor() {
    this.pool = createPool({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      connectionLimit: 5,
    });
  }

  async createUser(id, fullname, mail, password, isAssociation = null) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query(
        "INSERT INTO Users values (?, ?, ?, ?, ?) RETURNING *",
        [id, fullname, mail, password, isAssociation]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }
}

// to remove
const repo = new UserRepository();
const result = repo.createUser("1", "ada", "ada@mail.fr", "password", true);
const result2 = repo.createUser(2, "ada", "ada@mail.fr", "password", true);
// const result3 = repo.createUser("3", "ada", "ada@mail.fr", "password");
console.log(await result);
console.log(await result2);
console.log(await result3);
