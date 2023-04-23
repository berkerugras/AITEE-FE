import mongoose from "mongoose";

const postSchema = mongoose.Schema({
username: String,
password: String,
address: String,
age: Number,
phone: Number
});

const PostMessage = mongoose.model('PostMessage', postSchema);


export default PostMessage;