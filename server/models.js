import mongoose from "mongoose";



const postSchema = mongoose.Schema({
    userName: { type: String },
    password: { type: String },
    email: { type: String },
    address: { type: String },
    age: { type: Number },
    phone: { type: Number }
});

const PostMessage = mongoose.model('PostMessage', postSchema);


export default PostMessage;