import mongoose from "mongoose";

const ContactDetail = new mongoose.Schema({
    subject : String,
    email : String,
    message : String,
    date : Date
});

export const Contact = mongoose.model("contact",ContactDetail);