import mongoose from "mongoose";

const buyFromMarketSchema = mongoose.Schema({
    sellername: { type: String },
    name: { type: String },
    lastname: { type: String },
    note: { type: String },
    userName: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: Number },
    price: { type: Number },
    product: { type: String },
    size: { type: String },

});

const BuyFromMarketCollection = mongoose.model('BuyFromMarketCollection', buyFromMarketSchema);


export default BuyFromMarketCollection;