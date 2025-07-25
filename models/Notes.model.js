import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:[true,"title is required"]
    },
    content:{
type:String,
required:[true,"content is required"]
    }
},{timestamps:true})


export const Note = mongoose.model('Note',NotesSchema)