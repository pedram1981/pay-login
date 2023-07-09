import express from 'express';
import * as auth from '../../authentication/authentication.js'
import * as db from '../../db/Entryopration.js'
import * as add from '../../controller/users/add.js'
import { check, validationResult } from 'express-validator'
import soap from 'soap';

let router =express.Router();

/*router.use(function (req,res,next) {
    if(auth.verifyToken(req,res)){
      const errors = validationResult(req);
     if (!errors.isEmpty()) 
      return res.status(422).json({ errors: errors.array() });
     else
      next();
    }else
     res.send(JSON.stringify({error:"we need token"}));
  });*/
  //-------------------------------------------------------
router.route("/GetGroups").get(async(req,res)=>{// نام و کد گروها
   await GetGroups(res);
 });
async function GetGroups(res) {
        var url = 'https://137.tabriz.ir:8237/service/citizen/CitizenService.asmx?wsdl';
        var args = {key: 'Ta0r309d0dtabriz'};
      
     soap.createClient(url, {},async function(err, client) {
          
            await client.GetGroups(args,function(err, result) {
              let r= JSON.parse(result.GetGroupsResult);
                res.status(200).send(JSON.stringify(r));
             });
        });
    }

    router.route("/GetSubGroup").get(async(req,res)=>{// نام و کد زیر گروها
        await GetSubGroup(res,req);
      });
     async function GetSubGroup(res,req) {
        let id=req.query.groupid;
             var url = 'https://137.tabriz.ir:8237/service/citizen/CitizenService.asmx?wsdl';
             var args = {groupid:id
                ,key: 'Ta0r309d0dtabriz'};
           
          soap.createClient(url, {},async function(err, client) {
               
                 await client.GetSubGroup(args,function(err, result) {
                   let r= JSON.parse(result.GetSubGroupResult);
                     res.status(200).send(JSON.stringify(r));
                  });
             });
         }
         //-----------------------------------------------------------

    router.route("/GetRegions").get(async(req,res)=>{// نام و کد مناطق
        await GetRegions(res);
      });
    async function GetRegions(res) {
        var url = 'https://137.tabriz.ir:8237/service/citizen/CitizenService.asmx?wsdl';
        var args = {key: 'Ta0r309d0dtabriz'};
      
     soap.createClient(url, {},async function(err, client) {
          
            await client.GetRegions(args,function(err, result) {
              let r= JSON.parse(result.GetRegionsResult);
              res.status(200).send(JSON.stringify(r));
             });
        });
    }

    router.route("/GetAreas").get(async(req,res)=>{// شماره ناحیه
        await GetAreas(req,res);
      });
    async function GetAreas(req,res) {
        let id=req.query.region;
        var url = 'https://137.tabriz.ir:8237/service/citizen/CitizenService.asmx?wsdl';
        var args = {region:id,
            key: 'Ta0r309d0dtabriz'};
      
     soap.createClient(url, {},async function(err, client) {
          
            await client.GetAreas(args,function(err, result) {
              let r= JSON.parse(result.GetAreasResult);
              res.status(200).send(JSON.stringify(r));
             });
        });
    }

    router.route("/GetSectors").get(async(req,res)=>{// شماره محله
        await GetSectors(req,res);
      });
    async function GetSectors(req,res) {
        let idRegion=req.query.region;
        let idArea=req.query.area;
        var url = 'https://137.tabriz.ir:8237/service/citizen/CitizenService.asmx?wsdl';
        var args = {region:idRegion,
            area:idArea,
            key: 'Ta0r309d0dtabriz'};
      
     soap.createClient(url, {},async function(err, client) {
          await client.GetSectors(args,function(err, result) {
              let r= JSON.parse(result.GetSectorsResult);
              res.status(200).send(JSON.stringify(r));
             });
        });
    }
    //----------------------------------------------------------------
    router.route("/AddMessage").post(async(req,res)=>{
   
        let data=req.body;
       await AddMessage(req,res,data);
         
          });

          async function AddMessage(req,res,data) {
            let url = 'https://137.tabriz.ir:8237/service/citizen/CitizenService.asmx?wsdl';
            let args = {  messagesNote:data.messagesNote,
                 address:data.address,
                 region:data.region,
                 area:data.area,
                 sectorId:data.sectorId,
                 mobile:data.mobile,
                 tel:data.tel,
                 email:data.email,
                 citname:data.citname,
                 citusername:data.citusername,
                 gender:data.gender,
                 geom:data.geom,
                key: 'Ta0r309d0dtabriz'};
          
         soap.createClient(url, {},async function(err, client) {
              await client.AddMessage(args,function(err, result) {
                  let darkhastNumber= result.AddMessageResult.long[0];
                  let peygiryNumber= result.AddMessageResult.long[1];
                  res.status(200).send(JSON.stringify({darkhastNumber:darkhastNumber,peygiryNumber:peygiryNumber}));
                 });
            });
        }

        router.route("/AddMessageWithGroup").post(async(req,res)=>{
   
            let data=req.body;
           await AddMessageWithGroup(req,res,data);
             
              });
    
              async function AddMessageWithGroup(req,res,data) {
                  let url = 'https://137.tabriz.ir:8237/service/citizen/CitizenService.asmx?wsdl';
                  let args = {  messagesNote:data.messagesNote,
                     address:data.address,
                     region:data.region,
                     area:data.area,
                     sectorId:data.sectorId,
                     mobile:data.mobile,
                     tel:data.tel,
                     email:data.email,
                     citname:data.citname,
                     citusername:data.citusername,
                     gender:data.gender,
                     geom:data.geom,
                     groupid:data.groupid,
                     subgroupid:data.subgroupid,
                    key: 'Ta0r309d0dtabriz'};
              
             soap.createClient(url, {},async function(err, client) {
                  await client.AddMessageWithGroup(args,function(err, result) {
                      let darkhastNumber= result.AddMessageWithGroupResult.long[0];
                      let peygiryNumber= result.AddMessageWithGroupResult.long[1];
                      res.status(200).send(JSON.stringify({darkhastNumber:darkhastNumber,peygiryNumber:peygiryNumber}));
                     });
                });
            }

            router.route("/TrackingMessage").get(async(req,res)=>{// شماره محله
                await TrackingMessage(req,res);
              });
            async function TrackingMessage(req,res) {
                let trakingId=parseInt(req.query.peygiryNumber);
                let idArea=req.query.area;
                var url = 'https://137.tabriz.ir:8237/service/citizen/CitizenService.asmx?wsdl';
                var args = {trakingId:trakingId,
                    key: 'Ta0r309d0dtabriz'};
              
             soap.createClient(url, {},async function(err, client) {
                  await client.TrackingMessage(args,function(err, result) {
                    try {
                        let r= JSON.parse(result.TrackingMessage);
                        res.status(200).send(JSON.stringify(r));  
                    } catch (error) {
                        res.status(514).send(JSON.stringify({error:"در حال ثبت"}));  
                    }
                      
                     });
                });
            }

    //-------------------------------------------------------------------


 export default router;
