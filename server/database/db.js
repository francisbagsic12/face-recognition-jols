import mysql from "mysql2/promise";

let connection;

const connectToDB = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "jolnhs_info_db",
    });
  }
  return connection;
};
export default connectToDB;
