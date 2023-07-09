import express from 'express';
import * as auth from '../../authentication/authentication.js'
import * as db from '../../db/crudCommand.js'
import { check, validationResult } from 'express-validator'
import mysql from 'mysql2'
let router =express.Router();

router.use(function (req,res,next) {
    if(auth.verifyToken(req,res)){
      const errors = validationResult(req);
     if (!errors.isEmpty()) 
      return res.status(422).json({ errors: errors.array() });
     else
      next();
    }else
     res.send(JSON.stringify({error:"we need token"}));
  });
  

    router.route("/find").get(async(req,res)=>{
   
      let data=req.query.line;
      let result=await find(req,res,data);
       res.status(200).send(JSON.stringify({"Data":result}));
       
        });

        async function find(req,res,mobile){
          let sql = `CALL bus_idKhat(?,?)`;
            let parameters = [req.query.line,req.query.statuse];
             let query = mysql.format(sql, parameters);
            let result= await db.Command(req,res,query);
            return result[0][0];
            }

 export default router;
