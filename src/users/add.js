import express from 'express';
let router =express.Router();
import { UserModel } from './userModel.js';
import { MongoClient } from "mongodb";
import * as rabbitMessage from '../rabbitMessage/messageRabbit.js'
import * as  avatar from '../users/avatar.js'


async function insertOneRecord(req) {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
    try {
      const database = client.db("payever");
      const userCollection = database.collection("users");
      const base_64=await avatar.base64Image(req.body.userId,req.body.avatar);

      const doc = new UserModel({
      userId:req.body.userId,
      pass:req.body.pass,
      avatar:base_64,
      fileName:req.body.userId+".txt"
      })
       const result = await userCollection.insertOne(doc);
       rabbitMessage.sendMessage("users",result.insertedId);
        return result;
       
      } catch (error) {
        await client.close();
        return -1;
      }
    }

    export {
        insertOneRecord
    }