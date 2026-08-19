const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
    {
        dbName: {
            type: String,
            required: true,
        },

        tableName: {
            type: String,
            required: true,
        },

        tableRenamedTo: {
            type: String,
            default: "",
        },

        purpose: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        actionPerformed: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Tables", tableSchema);