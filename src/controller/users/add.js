import * as db from '../../db/Entryopration.js'
import mysql from 'mysql2'


async function create(req,res,data){
const sql ='INSERT INTO vadirahmat_db.wallet('
 +'userName'
 +',value'
 +',pardakhti'
 +',daryafti'
 +',faal'
 +',replication'
 +',transactionTb'
 +',date'
+')'
+'VALUES'
+'(?,?,?,?,?,?,?,NOW());'
const inserts = [data.userName
  ,parseInt(data.value)
  ,parseInt(data.pardakhti)
  ,parseInt(data.daryafti)
  ,1
  ,0
  ,data.transactionTb
  ];
let query = mysql.format(sql, inserts);
return db.insert(req,res,query);
}

export {
  create
}