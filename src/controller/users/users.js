import express from 'express';
import * as auth from '../../authentication/authentication.js'
import * as db from '../../db/Entryopration.js'
import * as add from '../../controller/users/add.js'
import { check, validationResult } from 'express-validator'
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
  
router.route("/create").post(async(req,res)=>{
   
  let data=req.body;
  let result=await add.create(req,res,data);
  if(0<result)
   res.status(200).send(JSON.stringify({result:result}));
   
    });

 export default router;
