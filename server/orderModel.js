import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    note: { type: String },
    userName: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: Number },
    price: { type: Number },
    age: { type: Number },
    product: { type: String },
    size: { type: String }
});

const OrderCollection = mongoose.model('OrderCollection', orderSchema);


export default OrderCollection;