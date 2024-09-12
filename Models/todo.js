import { model, Schema } from "mongoose";


const todoSchema = new Schema({
    title:{
        type:String,
        required:true,
        minLength:[3,'Title should be more than 🍃 leter'],
    },

    status:{
        type:String,
        enum:['Todo','In_Prograss','Completed'],
        dafault:'Todo'
    },

    userId:{
        type: Schema.Types.ObjectId,
        ref:'user'
    }
})

export const todoModel = model('todo',todoSchema)