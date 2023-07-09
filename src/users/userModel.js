import mongoose from "mongoose";


const userSchema=mongoose.Schema({
    userId:{
        type:String,
        unique: true,
        required:[true,'Please add correct format']
    },
    pass:{
        type:String
    },
    avatar:{
        type:Buffer
    },
    fileName:{
        type:String
    }
}
)

const UserModel = mongoose.model('Users', userSchema)
export { UserModel }

