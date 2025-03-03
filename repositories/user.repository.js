import pool from "../database/config.js";
import { objectToSQL } from "../tools/tools.js";
import { DBException } from "../errors/database.exceptions.js";
class UserRepository {
  async createUser(id, fullname, mail, password, isAssociation = false) {
    let conn;
    try {
      conn = await pool.getConnection();
      const user = await conn.query(
        "INSERT INTO Users values (?, ?, ?, ?, ?) RETURNING (id, fullname, mail)",
        [id, fullname, mail, password, isAssociation]
      );
      return user;
    } catch (err) {
      console.log(err);
      throw new DBException(400, "could not create user");
    } finally {
      if (conn) conn.release();
    }
  }

  async readUser(cond) {
    let conn;
    try {
      conn = await pool.getConnection();
      const conditions = objectToSQL(cond);
      const user = await conn.query(`SELECT * FROM Users WHERE ${conditions}`);
      return user;
    } catch (err) {
      console.log(err);
      throw new DBException(400, "error while fetching informations");
    } finally {
      if (conn) conn.release();
    }
  }

  async updateUser(id, modified) {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = Object.entries(modified)
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join(", ");
      const result = await conn.query(`UPDATE Users SET ${sql} WHERE id=?`, [
        id,
      ]);
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      // to change later when i want to keep my users data >:)
      conn.query("DELETE FROM Users WHERE id=?", [id]);
      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default UserRepository;
