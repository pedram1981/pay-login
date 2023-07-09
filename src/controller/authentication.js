
import jwt from 'jsonwebtoken'

function verifyToken(req,res){
  const token=req.headers["x-access-token"];
  let next=true;
if(!token){
  res.end(JSON.stringify("we need token"));
} else {
jwt.verify(token,'aslkjdlkasjdlasow',(err,decoded)=>{
if(err){
  next=false;
 } else {
  next=true;
}
});
}
return next;
}



export {
  verifyToken
}