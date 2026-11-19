require("dotenv").config();
const mongoose = require("mongoose");
const connect = require("./db");
const User = require("../models/user.model");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");

const studentEmail = process.env.DEMO_EMAIL || "demo.student@example.com";
const studentPassword = process.env.DEMO_PASSWORD || "CollegeDemo#2026";
const teacherEmail = process.env.DEMO_TEACHER_EMAIL || "demo.teacher@example.com";
const teacherPassword = process.env.DEMO_TEACHER_PASSWORD || "TeacherDemo#2026";

async function seedDemoStudent() {
    try {
        await connect();

        await User.updateOne(
            { email: studentEmail },
            { $set: { name: "Demo Student", email: studentEmail, password: studentPassword, role: "STUDENT" } },
            { upsert: true }
        );

        await Student.updateOne(
            { email: studentEmail },
            {
                $set: {
                    srNo: "DEMO-001",
                    name: "Demo Student",
                    email: studentEmail,
                    password: studentPassword,
                    classNo: "10",
                    rollNo: "DEMO-001",
                    fatherName: "Demo Parent",
                    motherName: "Demo Parent",
                    address: "Local test record",
                    dateofBirth: "2000-01-01",
                    adharcardNo: "TEST-ONLY",
                    contactNo: "0000000000",
                    emergencyNo: "0000000000",
                    admissionDate: "2026-01-01",
                    academicYear: "2026-2027",
                    gender: "Other"
                }
            },
            { upsert: true }
        );

        await Teacher.updateOne(
            { email: teacherEmail },
            {
                $set: {
                    name: "Demo Teacher",
                    email: teacherEmail,
                    password: teacherPassword,
                    id: "DEMO-T001",
                    class: "10",
                    salary: "Demo",
                    contactNo: "0000000000",
                    address: "Demo record - not a real address",
                    subject: "Mathematics"
                }
            },
            { upsert: true }
        );

        console.log("Demo student and teacher accounts are ready.");
        console.log(`Student email: ${studentEmail}`);
        console.log(`Student password: ${studentPassword}`);
        console.log(`Teacher email: ${teacherEmail}`);
        console.log(`Teacher password: ${teacherPassword}`);
    } catch (err) {
        console.error("Could not seed the demo student:", err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedDemoStudent();
