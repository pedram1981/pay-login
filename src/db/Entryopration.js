
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config();

const pool  = mysql.createPool({
    connectionLimit :process.env.connectionLimit,
    host            :process.env.host_,
    port            :process.env.port_,
    user            :process.env.user,
    password        :process.env.password,
    database        :process.env.database
  });

  

//var sql = "SELECT * FROM ?? WHERE ?? = ?";
//var inserts = ['users', 'id', userId];
//sql = mysql.format(sql, inserts);

async function insert(req,res,query){
    let connection =await pool.getConnection();
    await connection.beginTransaction();
    let queryResult=null;
    
    try {
        queryResult = await connection.query(query);
        await connection.commit();     
    } catch (error) {
        await connection.rollback();
        connection.release();
        res.status(422).send(JSON.stringify({error:error.message}));  
        return -1;
        
        
    }
    
    connection.release();
   
    return queryResult[0].insertId;
   }

    async function delet(req,res,query){
        let connection =await pool.getConnection();
        let queryResult=null;
        queryResult = await connection.query(query);
        connection.release();
        return queryResult[0].affectedRows;
     }

     async function update(req,res,query){
        let connection =await pool.getConnection();
        await connection.beginTransaction();
        let queryResult=null;
        
        try {
            queryResult = await connection.query(query);
            await connection.commit();     
        } catch (error) {
            await connection.rollback();
            connection.release();
            res.status(422).send(JSON.stringify({error:error.message}));  
            return -1; 
        }
        
        connection.release();
       
        return queryResult[0].changedRows;
       
        }  

export {
    insert,
    delet,
    update
  }