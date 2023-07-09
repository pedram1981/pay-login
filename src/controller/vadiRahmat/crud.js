import * as db from '../../db/crudCommand.js'
import mysql from 'mysql2'
 
async function find(req,res){
 let sql = `CALL vadirahmat_search(?,?,?,?,?,?,?)`;
 let parameters = [req.query.Fst_name,req.query.Lst_name,req.query.F_name,req.query.M_name,req.query.from,req.query.to,req.query.fst_lst];
  let query = mysql.format(sql, parameters);
  let result= await db.Command(req,res,query);
   return result[0][0];
}

   export {
            find
          }

