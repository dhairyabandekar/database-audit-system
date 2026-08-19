const express = require("express");
const cors = require("cors");

const tableRoutes = require("./routes/table.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "DB audit system api running"
    });
});

app.use("/api/tables", tableRoutes);


module.exports = app;