
import mysql from 'mysql2/promise'

const pool  = mysql.createPool({
    connectionLimit :process.env.connectionLimit,
    host            :process.env.host_,
    port            :process.env.port_,
    user            :process.env.user,
    password        :process.env.password,
    database        :process.env.database
  });

  


async function Command(req,res,query){
    let connection =await pool.getConnection();
    
    let queryResult=null;
    
        queryResult = await connection.query(query);
       connection.release();
   
    return queryResult;
   
    }

export {
    Command,
}