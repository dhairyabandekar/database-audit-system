const express = require("express");

const { getTables,
        updateTable,
        deleteTable
} = require("../controllers/table.controller");

const router = express.Router();

router.get("/", getTables);
router.patch("/:id", updateTable);
router.delete("/:id", deleteTable);

module.exports = router;