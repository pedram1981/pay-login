import express from 'express';
import * as auth from '../../authentication/authentication.js'
import * as crud from '../../controller/logIn/crud.js'
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
  let result=await crud.create(req,res,data);
  if(0<result)
   res.status(200).send(JSON.stringify({result:result}));
   
    });

    router.route("/find").get(async(req,res)=>{
   
      let data=req.query.mobile;
      let result=await crud.find(req,res,data);
       res.status(200).send(JSON.stringify(result));
       
        });

 export default router;
