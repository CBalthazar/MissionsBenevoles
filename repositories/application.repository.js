import pool from "../database/config.js";

class ApplicationRepository {
  async createApplication(id, idMissions, idUser, state = null) {
    let conn;
    try {
      conn = await pool.getConnection();
      let candidature = conn.query(
        "INSERT INTO Candidatures VALUES (?,?,?,?) RETURNING *",
        [id, idMissions, idUser, state]
      );
      return candidature;
    } catch (err) {
      throw err;
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
      throw err;
    }
  }

  async updateApplication(id, state = false) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        `UPDATE Candidature SET state=? WHERE id=?`,
        [state, id]
      );
      return result;
    } catch (err) {
      throw err;
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
      throw err;
    }
  }
}

export default ApplicationRepository;
