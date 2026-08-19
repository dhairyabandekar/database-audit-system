const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Table = require("./models/table.model");

const seedData = [];

for(let i = 1; i <=10; i++) {
    seedData.push({
        dbName: "abc",
        tableName: `table_${i}`,
        tableRenamedTo: "",
        purpose: `Purpose of abc table_${i}`,
        status: "active",
        actionPerformed: [],
    });

    seedData.push({
        dbName: "xyz",
        tableName: `table_${i}`,
        tableRenamedTo: "",
        purpose: `Purpose of xyz table_${i}`,
        status: "active",
        actionPerformed: [],
    });
}

const seedDatabase = async () => {
    try {
        await connectDB();
        await Table.deleteMany();
        await Table.insertMany(seedData);

        console.log("20 tables inserted successfully");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error.message);
        process.exit(1);
    }
};

seedDatabase();