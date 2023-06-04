import mongoose from "mongoose";



const orderSchema = mongoose.Schema({
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