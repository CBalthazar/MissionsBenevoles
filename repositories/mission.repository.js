import pool from "../config/db.js";
import { DBException } from "../errors/database.exceptions.js";

class MissionRepository {
  async createMission(id, title, description, associationId) {
    let conn;
    try {
      conn = await pool.getConnection();
      const mission = conn.query(
        "INSERT INTO Missions VALUES (?,?,?,?) RETURNING *",
        [id, title, associationId, description]
      );
      return mission;
    } catch (err) {
      console.error(err);
      throw new DBException(500, "unexpected issue while posting mission");
    } finally {
      if (conn) conn.release();
    }
  }

  async readMission() {
    let conn;
    try {
      conn = await pool.getConnection();
      const missions = await conn.query("SELECT * FROM Missions");
      return missions;
    } catch (err) {
      throw new DBException(500, "unexpected issue while retrieving missions");
    } finally {
      if (conn) conn.release();
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
      throw new DBException(500, "unexpected issue while updatin mission");
    } finally {
      if (conn) conn.release();
    }
  }

  async deleteMission(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      conn.query("DELETE * FROM Missions WHERE id=?", [id]);
      return true;
    } catch (err) {
      throw new DBException(500, "unexpected issue while deleting mission");
    } finally {
      if (conn) conn.release();
    }
  }
}

export default MissionRepository;
