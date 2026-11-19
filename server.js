require("dotenv").config();
const app = require("./src/app")
const connect = require("./src/database/db")

const port = process.env.PORT ||5500

async function start() {
    try {
        await connect();
        app.listen(port,()=>{
            console.log(`SERVER CONNECTED on port ${port}`);
        });
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exitCode = 1;
    }
}

start();