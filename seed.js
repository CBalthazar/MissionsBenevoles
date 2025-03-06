import "dotenv/config";
import pool from "./config/db.js";

const sql_tables = `
USE MissionsBenevoles;

DROP TABLE IF EXISTS Candidatures;
DROP TABLE IF EXISTS Missions;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id varchar(50) PRIMARY KEY,
  fullname varchar(50) NOT NULL,
  mail varchar(50) NOT NULL UNIQUE,
  password varchar(100) NOT NULL,
  isAssociation boolean NOT NULL DEFAULT false
);

CREATE TABLE Missions (
  id varchar(50) PRIMARY KEY,
  title varchar(50) NOT NULL,
  associationId varchar(50) NOT NULL,
  description text,
  foreign key (associationId) references Users(id)
);

CREATE TABLE Candidatures (
  id varchar(50) PRIMARY KEY,
  idMissions varchar(50) NOT NULL,
  idUser varchar(50) NOT NULL,
  state varchar(50) DEFAULT NULL,
  foreign key (idMissions) references Missions(id),
  foreign key (idUser) references Users(id)
);`;

async function seed_db() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(sql_tables);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

seed_db().then(() => {
  pool.end();
});
