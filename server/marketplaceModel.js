import mongoose from "mongoose";

const marketschema = mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    note: { type: String },
    userName: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: Number },
    price: { type: Number },
    listing_price: { type: Number },
    age: { type: Number },
    product: { type: String },
    size: { type: String }
});

const marketCollection = mongoose.model('marketCollection', marketschema);


export default marketCollection;