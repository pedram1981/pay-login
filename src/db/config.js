import mongoose from "mongoose";


async function connectDb(){
    try {
        mongoose.set('strictQuery', false);
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
          });
        
    } catch (error) {
        return error;
    }
}


export {
    connectDb
  }