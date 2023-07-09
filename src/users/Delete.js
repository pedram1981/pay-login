import { MongoClient } from "mongodb";
import fs from 'fs';
import * as rabbitMessage from '../rabbitMessage/messageRabbit.js'

async function deletOneRecord(req) {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
    try {
      const database = client.db("payever");
      const userCollection = database.collection("users");
      const query = {userId:req.body.userId };
      const result = await userCollection.deleteOne(query);
      if (fs.existsSync('./src/users/avatarImage/'+req.body.userId+'.txt'))
      fs.unlinkSync('./src/users/avatarImage/'+req.body.userId+'.txt');
      rabbitMessage.sendMessage("users","Delete user : "+req.body.userId);
        return result;
       
      } catch (error) {
        await client.close();
        return -1;
      }
    }

    export {
        deletOneRecord
    }