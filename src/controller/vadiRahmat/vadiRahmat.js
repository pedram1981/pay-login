import express from 'express';
import * as auth from '../../authentication/authentication.js'
import * as crud from './crud.js'
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
  
    
  router.route("/find").get(async(req,res)=>{
   
    let result=await crud.find(req,res);
     res.status(200).send(JSON.stringify(result));
     
      });

      

 export default router;
