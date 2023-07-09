import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './src/controller/userApi.js';
import { rateLimit } from 'express-rate-limit';
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });


const app=express();
const port=process.env.port || 5002;
const limiter=rateLimit({
  windowMs:process.env.windowMs,
  max:process.env.max
})
app.use(limiter);
app.use(express.json());

app.use(cors({
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'GET, POST,  PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept,x-access-token',
  'Access-Control-Allow-Credentials':true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//---------------------------------------

app.use("/api",api);


//---------------------------------------

 
 app.listen(port,err=>{
  if(err){
    return console.log("Error",err);
  }
  console.log('Listening on port:'+port);
  });
