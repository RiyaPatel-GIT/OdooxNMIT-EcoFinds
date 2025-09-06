const { Pool } = require("pg");
require('dotenv').config({ quiet: true });


  const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "2345",
  port: 5432,
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
