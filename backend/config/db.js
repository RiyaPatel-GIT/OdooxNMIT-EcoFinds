const { Pool } = require("pg");
require('dotenv').config({ quiet: true });
const DB_PASSWORD="2345";
const DB_PORT=5432;


  const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: DB_PASSWORD,
  port: DB_PORT,
});

console.log("db connected successfully")
//  const fetchData  = async() => {
//   try{
//     const res = await pool.query("select * from users")
//   console.log("response",res)
//   }catch(error){
// console.log("SOME ERROR FOR DB CONNECTION", error)
//   }

// }

// fetchData(); 

module.exports = pool;
