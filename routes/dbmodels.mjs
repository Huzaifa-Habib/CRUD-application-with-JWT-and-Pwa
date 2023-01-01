import mongoose from "mongoose"


let productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    createdOn: { type: Date, default: Date.now }
});
export const myProductModel = mongoose.model('MyProducts', productSchema);

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
});
export const userModel = mongoose.model('Users', userSchema);
