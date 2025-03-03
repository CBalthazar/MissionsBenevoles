import { createPool } from "mariadb";

const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  connectionLimit: 5,
});

const sql_tables = `
USE ${process.env.DATABASE}

-- create
CREATE TABLE Users (
  id string PRIMARY KEY,
  fullname string NOT NULL,
  mail string NOT NULL,
  password string NOT NULL,
  isAssossiation boolean NOT NULL DEFAULT false
);

CREATE TABLE Missions (
  id string PRIMARY KEY,
  title string NOT NULL,
  description text, 
  assossiationId string NOT NULL,
  foreign key (assossiationId) references Users(id)
);

CREATE TABLE Candidatures (
  id string PRIMARY KEY,
  idMissions string NOT NULL,
  idUser string NOT NULL,
  state string DEFAULT NULL,
  foreign key (idMissions) references Missions(id)
  foreign key (idUser) references Missions(id)
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
