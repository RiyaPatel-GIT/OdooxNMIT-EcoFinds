const { Pool } = require("pg");
require('dotenv').config({ quiet: true });
const DB_PASSWORD=process.env.DB_PASSWORD;
const DB_PORT=process.env.DB_PORT;


  const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
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
