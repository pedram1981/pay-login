import express from 'express';
let router =express.Router();
import { MongoClient } from "mongodb";

async function findUser(req){
    try {
        const uri = process.env.MONGO_URI;
        const client = new MongoClient(uri);
        const database = client.db("payever");
        const userCollection = database.collection("users");
       
        const query = {userId:req.params.userId };
        const result = await userCollection.findOne(query);
        return result;
        } catch (error) {
            await client.close();
            res.status(503).send(JSON.stringify(error));
            return -1;
    
        }
}

export {
    findUser
}