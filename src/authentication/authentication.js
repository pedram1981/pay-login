import jwt from 'jsonwebtoken'

//import * as employer from '../employer/employer.js'
//import * as candidate from '../candidate/candidate.js'


function createToken( data,req,res ) {
  let token=jwt.sign(data,'aslkjdlkasjdlasow');
 return token;
  }

function verifyToken(req,res){
  const token=req.headers["x-access-token"];
  let next1=true;
if(!token){
  //res.end(JSON.stringify("we need token"));
  next1=false;
  return next1;
} else {
jwt.verify(token,'aslkjdlkasjdlasow',(err,decoded)=>{
if(err){
  next1=false;
 } else {
  next1=true;
}
});
}
return next1;
}


export {
  verifyToken,
  createToken
}
