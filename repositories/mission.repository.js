import pool from "../database/config.js";

class MissionRepository {
  async createMission(id, title, assossiationId, description = "") {
    let conn;
    try {
      conn = await pool.getConnection();
      const mission = conn.query(
        "INSERT INTO Missions VALUES (?,?,?,?) RETURNING *",
        [id, title, description, assossiationId]
      );
      return mission;
    } catch (err) {
      throw err;
    }
  }

  async readMissions() {
    let conn;
    try {
      conn = await pool.getConnection();
      const missions = await conn.query("SELECT * FROM Missions");
      return missions;
    } catch (err) {
      throw err;
    }
  }

  async updateMission(id, modified) {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = Object.entries(modified)
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join(", ");
      const result = await conn.query(
        `UPDATE Missions SET ${sql} WHERE id=? AND NOT EXISTS (SELECT * FROM Candidatures WHERE id=?)`,
        [id, id]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  async deleteMissions(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      conn.query("DELETE * FROM Missions WHERE id=?", [id]);
      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default MissionRepository;
