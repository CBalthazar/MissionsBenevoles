import { createPool } from "mariadb";
import "dotenv/config";

const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  connectionLimit: 5,
});

const sql_tables = `
USE ${process.env.DATABASE};

DROP TABLE IF EXISTS Candidatures;
DROP TABLE IF EXISTS  Missions;
DROP TABLE  IF EXISTS Users;
-- create
CREATE TABLE Users (
  id varchar(50) PRIMARY KEY,
  fullname varchar(50) NOT NULL,
  mail varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  isAssossiation boolean NOT NULL DEFAULT false
);
CREATE TABLE Missions (
  id varchar(50) PRIMARY KEY,
  title varchar(50) NOT NULL,
  assossiationId varchar(50) NOT NULL,
  description text,
  foreign key (assossiationId) references Users(id)
);
CREATE TABLE Candidatures (
  id varchar(50) PRIMARY KEY,
  idMissions varchar(50) NOT NULL,
  idUser varchar(50) NOT NULL,
  state varchar(50) DEFAULT NULL,
  foreign key (idMissions) references Missions(id),
  foreign key (idUser) references Users(id)
);
-- insert
INSERT INTO Users VALUES ("0001", 'Clark Sales', 'Clark@mail.fr', "<hashed_password>", false);
INSERT INTO Users VALUES ("0002", 'Dave Accounting', "DA@outlook.com", "<hashed_password>", false);
INSERT INTO Users VALUES ("0003", 'Ava Sales', 'Ava.Sales@notsd.sfdf', "<hashed_password>", true);
`;

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
