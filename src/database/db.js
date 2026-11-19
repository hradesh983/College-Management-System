const mongoose = require("mongoose")
const connect = ()=>{
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/college_management";
    return mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(()=>{
        console.log("DB CONNECTED");
    })
}

module.exports = connect;