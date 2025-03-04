import pool from "../database/config.js";
import { DBException } from "../errors/database.exceptions.js";
class ApplicationRepository {
  async createApplication(id, idMissions, idUser, state = null) {
    let conn;
    try {
      conn = await pool.getConnection();

      console.log(idMissions);
      let candidature = await conn.query(
        "INSERT INTO Candidatures VALUES (?,?,?,?) RETURNING *",
        [id, idMissions, idUser, state]
      );
      return candidature;
    } catch (err) {
      console.error(err);
      throw new DBException(500, "unplanned error whil changing appplications");
    } finally {
      if (conn) conn.release();
    }
  }

  async readApplication(id = false) {
    let conn;
    try {
      conn = await pool.getConnection();
      if (!id) {
        return await conn.query("SELECT * FROM Candidatures");
      } else {
        return await conn.query("SELECT * FROM Candidatures WHERE id=?", [id]);
      }
    } catch (err) {
      console.error(err);
      throw new DBException(
        500,
        "unplanned error whil retrieving appplications"
      );
    } finally {
      if (conn) conn.release();
    }
  }

  async updateApplication(id, state = false) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(`UPDATE Candidatures SET state=? WHERE id=?`, [
        state,
        id,
      ]);
      return await conn.query("SELECT * FROM Candidatures WHERE id=?", [id]);
    } catch (err) {
      console.error(err);
      throw new DBException(500, "unplanned error whil changing appplications");
    } finally {
      if (conn) conn.release();
    }
  }

  async deleteApplication(conditions) {
    let conn;
    const sql = Object.entries(conditions)
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join(" AND ");
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE * FROM Candidatures WHERE ?", ["(" + sql + ")"]);
    } catch (err) {
      console.error(err);
      throw new DBException(
        500,
        "unplanned error while deleting appplications"
      );
    } finally {
      if (conn) conn.release();
    }
  }
}

export default ApplicationRepository;
