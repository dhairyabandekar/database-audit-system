const Table = require("../models/table.model");

const getTables = async (req, res) => {
    try {
        const tables = (await Table.find());

        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tables",
            error: error.message
        });
    }
};

const updateTable = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTable = await Table.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if(!updatedTable) {
            return res.status(404).json({
                message: "Table not found",
            });
        }

        res.status(200).json({
                message: "Table updated successfully",
                table: updatedTable,
            });
    } catch (error) {
        res.status(500).json({
            messgae: "Failed to update table",
            error: error.message,
        });
    }
};

const deleteTable = async (req, res)  => {
    try {
        const { id } = req.params;

        const deletedTable = await Table.findByIdAndDelete(id);

        if(!deletedTable) {
            return res.status(404).json({
                message: "Table not found",
            });
        }

        res.status(200).json({
                message: "Table deleted successfully",
            });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete table",
            error: error.message,
        });
    }
};

module.exports = {
    getTables,
    updateTable,
    deleteTable,
};