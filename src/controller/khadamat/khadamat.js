import express from 'express';
import cors from 'cors';
import * as auth from '../../authentication/authentication.js'
import { check, validationResult } from 'express-validator'
import request from 'request';
import axios from 'axios';
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
  
 /*router.get("/cr",async(req,res)=>{
    let id1=req.query.id1;
    
     let p1=await db.insertCommand(req,res);
     let p2=p1;
     
  //let id2=req.query["id2"];
    });*/
   


    
 router.route("/nosazi").get(async(req,res)=>{
  var data = JSON.stringify({
    "UserName": "sohrab",
    "Password": "09144116522"
  });
  
  var config = {
    method: 'post',
  maxBodyLength: Infinity,
    url: 'https://srvapi.tabriz.ir/api/login',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(async function (response) {
    //console.log(JSON.stringify(response.data));
    let data=response.data;
    let apiToken=data.api_Token;
            await getDataNosazi(req,res,apiToken);
  })
  .catch(function (error) {
    console.log(error);
  });

 });

    
async function getDataNosazi(req,res,apiKey) {
  let FicheType=req.query.FicheType;
    let region=req.query.region;
    let area=req.query.area;
    let block=req.query.block;
    let country=req.query.country;
    let building=req.query.building;
    let apartment=req.query.apartment;
    let guild=req.query.guild;
  var data = JSON.stringify({
    "FicheType": parseInt(FicheType),
    "region":region,
    "area": area,
    "block":block,
    "country":country,
    "building":building,
    "apartment":apartment,
    "guild":guild
  });
  
  var config = {
    method: 'post',
  maxBodyLength: Infinity,
    url: 'https://srvapi.tabriz.ir/api/tabrizli/CalculateFish',
    headers: { 
      'Authorization': 'Basic '+apiKey, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(async function (response) {
      let data=response.data;
      if(data.msg.Status==1){
       res.status(200).send(JSON.stringify(data.payload));
      } else{
        res.status(514).send(JSON.stringify({error:msg.Msg}));
      }

  })
  .catch(function (error) {
    res.status(512).send(JSON.stringify({error:error.message}));
  });
}


 export default router;
