function objectToSQL(cond) {
  let sql = [];
  for (let key in cond) {
    sql.push(`${key}=${cond[key]}`);
  }
  return sql.join(" AND ");
}

export { objectToSQL };
