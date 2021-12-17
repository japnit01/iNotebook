const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connecttomongo = async() =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo");
    })
}

module.exports = connecttomongo;