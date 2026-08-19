import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalTables, setOriginalTables] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tables`);

      setTables(response.data);
      setOriginalTables(response.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleChange = (id, field, value) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table._id === id
          ? {
            ...table,
            [field]: value,
          }
          : table
      )
    );
  };

  const getActions = (originalTable, currentTable) => {
    if (!originalTable) return [];

    const actions = [];

    if (originalTable.tableRenamedTo !== currentTable.tableRenamedTo) {
      actions.push("Renamed");
    }

    if (originalTable.purpose !== currentTable.purpose) {
      actions.push("Purpose Changed");
    }

    if (originalTable.status !== currentTable.status) {
      actions.push("Status Changed");
    }

    return actions;
  };

  const handleSave = async (table) => {
    try {
      const originalTable = originalTables.find(
        (item) => item._id === table._id
      );

      const actions = getActions(originalTable, table);

      const updatedData = {
        tableRenamedTo: table.tableRenamedTo,
        purpose: table.purpose,
        status: table.status,
        actionPerformed: actions,
      };

      const response = await axios.patch(
        `${API_URL}/api/tables/${table._id}`,
        updatedData
      );

      setTables((prevTables) =>
        prevTables.map((item) =>
          item._id === table._id ? response.data.table : item
        )
      );

      setOriginalTables((prevTables) =>
        prevTables.map((item) =>
          item._id === table._id ? response.data.table : item
        )
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Changes saved successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error saving table:", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Unable to save the changes. Please try again.",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Table?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/api/tables/${id}`);

      setTables((prevTables) =>
        prevTables.filter((table) => table._id !== id)
      );

      setOriginalTables((prevTables) =>
        prevTables.filter((table) => table._id !== id)
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Table has been deleted successfully.",
        confirmButtonColor: "#111827",
      });
    } catch (error) {
      console.error("Error deleting table:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Unable to delete the table. Please try again.",
        confirmButtonColor: "#111827",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 md:px-12 py-8">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.2em] text-gray-400 mb-2">
              DATABASE MANAGEMENT
            </p>

            <h1 className="text-3xl font-bold">
              Database Audit System
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Manage table metadata, status and audit activities.
            </p>
          </div>

          {/* Record Count */}
          <div className="border border-gray-700 rounded-xl px-7 py-4 text-center">
            <p className="text-2xl font-bold">{tables.length}</p>

            <p className="text-xs text-gray-400 mt-1">
              Total Tables
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Table Audit Records
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Review and update database table information.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    DB Name
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Table Name
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Renamed To
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Purpose
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action Performed
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-3"></div>

                        <p className="text-sm text-gray-500">
                          Loading audit records...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : tables.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-16 text-center text-sm text-gray-500"
                    >
                      No audit records found.
                    </td>
                  </tr>
                ) : (
                  tables.map((table) => {
                    const originalTable = originalTables.find(
                      (item) => item._id === table._id
                    );

                    const actions = getActions(
                      originalTable,
                      table
                    );

                    return (
                      <tr
                        key={table._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* DB Name */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
                            {table.dbName}
                          </span>
                        </td>

                        {/* Table Name */}
                        <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                          {table.tableName}
                        </td>

                        {/* Renamed To */}
                        <td className="px-5 py-4">
                          <input
                            type="text"
                            value={table.tableRenamedTo}
                            placeholder="New table name"
                            onChange={(e) =>
                              handleChange(
                                table._id,
                                "tableRenamedTo",
                                e.target.value
                              )
                            }
                            className="w-full min-w-[160px] px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                          />
                        </td>

                        {/* Purpose */}
                        <td className="px-5 py-4">
                          <input
                            type="text"
                            value={table.purpose}
                            placeholder="Table purpose"
                            onChange={(e) =>
                              handleChange(
                                table._id,
                                "purpose",
                                e.target.value
                              )
                            }
                            className="w-full min-w-[200px] px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                          />
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <select
                            value={table.status}
                            onChange={(e) =>
                              handleChange(
                                table._id,
                                "status",
                                e.target.value
                              )
                            }
                            className={`px-3 py-2 text-sm font-medium border rounded-lg outline-none ${table.status === "active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                              }`}
                          >
                            <option value="active">
                              Active
                            </option>

                            <option value="inactive">
                              Inactive
                            </option>
                          </select>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-2">
                            {actions.length > 0 ? (
                              actions.map((action) => (
                                <span
                                  key={action}
                                  className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-semibold"
                                >
                                  {action}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">
                                No changes
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Buttons */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSave(table)}
                              className="px-3 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-700 transition"
                            >
                              Save
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(table._id)
                              }
                              className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;