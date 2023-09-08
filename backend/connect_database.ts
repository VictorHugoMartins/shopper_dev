import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "./config/enviroment_variables";

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

connection.connect((error: any) => {
  if (error) throw error;
  console.log('Connected to MySQL database!');
});

export default connection;