//import * as db from '../../db/Entryopration.js'
import * as db from '../../db/crudCommand.js'
import mysql from 'mysql2'


/*async function create(req,res,data){
const timeNow = new Date;
let sql ='DELETE FROM vadirahmat_db.logIn WHERE  mobile =?'
 let delet = [data.mobile];
let query = mysql.format(sql, delet);
if(0<=await db.delet(req,res,query)){
 sql ='INSERT INTO vadirahmat_db.logIn('
 +'mobile'
 +',cod'
 +',ip'
 +',dt'
 +',houre'
 +',minute'
 +',replication) VALUES'
 +'(?,?,?,NOW(),?,?,?);'
let inserts = [data.mobile
  ,generateRandom()
  ,data.ip
  ,parseInt(timeNow.getHours())
  ,parseInt(timeNow.getMinutes())
  ,0
  ];
query = mysql.format(sql, inserts);
return await db.insert(req,res,query);
}
else
 return -1;
}*/

function generateRandom(){
 return Math.floor(1000+(9999-1000)*Math.random());
}

async function create(req,res,data){
  
  const timeNow = new Date;
  let sql = `CALL loginCode_insert(?,?,?,?,?,?)`;
  let parameters = [data.mobile
    ,generateRandom()
    ,data.ip
    ,parseInt(timeNow.getHours())
    ,parseInt(timeNow.getMinutes())
    ,0
    ];
   let query = mysql.format(sql, parameters);
  let result= await db.Command(req,res,query);
  return result;
  }
 
  async function find(req,res,mobile){
  

    let sql = `CALL loginCode_Mobile(?)`;
    let parameters = [mobile];
     let query = mysql.format(sql, parameters);
    let result= await db.Command(req,res,query);
    return result[0][0];
    }
   
  
export {
  create,
  find
}