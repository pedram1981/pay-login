import fs from 'fs';
import axios from "axios";

//var url = 'https://assets.website-files.com/601bb571b7f353ca5b3eb81c/60b1142b1d936e57b81ab062_Mark.png';

async function base64Image(fileName,url){
const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  fs.writeFileSync('./src/users/avatarImage/'+fileName+'.txt',Buffer.from(response.data, "base64"));
  return Buffer.from(response.data, "base64");
}
  
export {
    base64Image
}