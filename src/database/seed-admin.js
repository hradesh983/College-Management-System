require("dotenv").config();
const mongoose = require("mongoose");
const connect = require("./db");
const User = require("../models/user.model");

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

async function seedAdmin() {
    if (!email || !password) {
        console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.");
        process.exitCode = 1;
        return;
    }

    try {
        await connect();
        await User.updateOne(
            { email },
            { $set: { name: "Demo Administrator", email, password, role: "HEAD" } },
            { upsert: true }
        );
        console.log(`Admin account is ready for ${email}.`);
    } catch (err) {
        console.error("Could not seed the admin account:", err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedAdmin();
