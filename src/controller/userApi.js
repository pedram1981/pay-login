import express from 'express';
import { check, validationResult } from 'express-validator'
let router =express.Router();
import * as add from "../users/add.js"
import * as del from "../users/Delete.js"
import * as find from "../users/find.js"
import * as auth from "../controller/authentication.js"

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
  
 
router.route("/users").post(async(req,res)=>{
     const result=await add.insertOneRecord(req);
     if(result!=-1)
      res.status(200).send(JSON.stringify(result.insertedId));
    else 
      res.status(503).send(JSON.stringify('ERROR SAVE DATA'));

});

router.route("/user/:userId").get(async(req,res)=>{
        const result = await find.findUser(req);
        if(result!=-1)
         res.status(200).send(JSON.stringify(result));
         else 
         res.status(503).send(JSON.stringify('ERROR SHOW DATA'));
   
       
        });

router.route("/users").delete(async(req,res)=>{
          const result=await  del.deletOneRecord(req);
          if(result!=-1)
           res.status(200).send(JSON.stringify(result.insertedId));
         else 
           res.status(503).send(JSON.stringify('ERROR DELETE DATA'));
     
     });

 export default router;
