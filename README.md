# Database Audit System

A MERN stack application for managing and auditing database table metadata through a simple web-based dashboard.

The system simulates two databases, `abc` and `xyz`, with 10 tables in each database. All 20 simulated table records are stored in a single MongoDB collection and managed through a React frontend.

## Features

- View tables from multiple databases in a single dashboard
- Display database name and table name
- Rename tables through the frontend
- Add and edit table purpose
- Change table status between Active and Inactive
- Automatically detect actions performed on tables
- Save changes to MongoDB
- Delete table records
- REST API using Node.js and Express
- Responsive UI using Tailwind CSS

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- Mongoose

### Database

- MongoDB

## Project Structure

```text
database-audit-system/
│
├── client/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── table.controller.js
│   ├── models/
│   │   └── table.model.js
│   ├── routes/
│   │   └── table.routes.js
│   ├── app.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Database Structure

The application simulates two logical databases.

```text
abc
├── table_1
├── table_2
├── table_3
├── table_4
├── table_5
├── table_6
├── table_7
├── table_8
├── table_9
└── table_10

xyz
├── table_1
├── table_2
├── table_3
├── table_4
├── table_5
├── table_6
├── table_7
├── table_8
├── table_9
└── table_10
```

All 20 simulated tables are stored as documents in a single MongoDB collection.

Each document contains:

```text
dbName
tableName
tableRenamedTo
purpose
status
actionPerformed
```

## Dashboard

The application provides a single table containing:

| Column | Description |
|---|---|
| DB Name | Name of the simulated database |
| Table Name | Current table name |
| Table Renamed To | New table name |
| Purpose | Purpose of the table |
| Status | Active or Inactive |
| Action Performed | Automatically detected changes |
| Actions | Save and Delete operations |

## Audit Actions

The system automatically detects changes made to a table.

| Change | Action |
|---|---|
| Table renamed | Renamed |
| Purpose modified | Purpose Changed |
| Status modified | Status Changed |

Multiple changes are recorded together.

For example:

```text
Renamed, Status Changed
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tables` | Fetch all table records |
| PATCH | `/api/tables/:id` | Update a table record |
| DELETE | `/api/tables/:id` | Delete a table record |

## Application Flow

```text
React Frontend
      │
      │ Axios
      ↓
Express REST API
      │
      ↓
Mongoose
      │
      ↓
MongoDB
      │
      ↓
20 Table Audit Records
```

### Save Flow

```text
User edits table
      ↓
React state updated
      ↓
Changes detected
      ↓
Action displayed
      ↓
User clicks Save
      ↓
PATCH API
      ↓
MongoDB updated
```

### Delete Flow

```text
User clicks Delete
      ↓
Confirmation
      ↓
DELETE API
      ↓
MongoDB record deleted
      ↓
Record removed from UI
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/dhairyabandekar/database-audit-system.git
cd database-audit-system
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Seed the Database

The seed script creates the 20 simulated table records.

```bash
node seed.js
```

### 5. Start the Backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Install Frontend Dependencies

Open a new terminal:

```bash
cd client
npm install
```

### 7. Start the Frontend

```bash
npm run dev
```

Open the local URL provided by Vite in the terminal.

## Environment Variables

The following environment variables are required:

```text
MONGO_URI
PORT
```

Do not commit your `.env` file to GitHub.

## Future Improvements

- User authentication and authorization
- Search and filtering
- Pagination
- Detailed audit history
- User-specific audit logs
- Export audit records
- Additional table status options
- Dashboard statistics
- Activity timestamps
- Improved validation and error handling

## Author

**Dhairya Bandekar**

GitHub: https://github.com/dhairyabandekar
