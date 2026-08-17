# GrowthGuard 🌱

GrowthGuard is a full-stack pediatric health tracking application designed to help parents and caregivers organize a child's medical information and developmental milestones in one place.

Originally developed as a software engineering capstone project, GrowthGuard is now being actively modernized as a full-stack portfolio application. The project uses a consolidated repository containing both the React client and Node.js/Express API.

## Features

GrowthGuard currently supports:

- User profile creation, viewing, and editing
- Child profile creation, viewing, and editing
- Medical record tracking for children
- Developmental milestone tracking
- RESTful API endpoints for users, children, medical records, and milestones
- MongoDB-backed data persistence

## Tech Stack

### Client

- React 19
- React Router
- Axios
- JavaScript
- HTML5
- CSS3
- Create React App / React Scripts

### Server

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Architecture

GrowthGuard uses a client/server architecture:

```text
React Client
     |
     | HTTP / Axios
     v
Express REST API
     |
     | Mongoose
     v
MongoDB
```

The React client handles the user interface and application navigation. It communicates with the Express API, which manages application routes and MongoDB persistence through Mongoose.

## Project Structure

```text
GrowthGuard/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   ├── components/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Before running GrowthGuard locally, make sure you have:

- Node.js
- npm
- Access to a MongoDB database

### 1. Clone the Repository

```bash
git clone https://github.com/msgem0523/GrowthGuard.git
cd GrowthGuard
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Install Server Dependencies

From the repository root:

```bash
cd server
npm install
```

## Environment Configuration

The server requires a MongoDB connection string.

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
```

An optional server port can also be configured:

```env
PORT=5000
```

If `PORT` is not provided, the server defaults to port `5000`.

> Never commit `.env` files or database credentials to source control.

## Running GrowthGuard Locally

The client and server currently run as separate development processes.

### Start the Client

From `client/`:

```bash
npm start
```

### Start the Server

From `server/`:

```bash
node server.js
```

The API defaults to:

```text
http://localhost:5000
```

Development scripts and tooling are being reviewed as part of the ongoing GrowthGuard modernization work.

## API Resources

The server currently exposes API routes for:

```text
/api/users
/api/children
/api/medical-records
/api/milestones
```

## Current Modernization

GrowthGuard is undergoing an active modernization and portfolio upgrade focused on:

- Repository organization
- Development tooling
- Dependency cleanup
- Documentation
- Developer experience
- Application maintainability
- Future deployment readiness

The modernization work is tracked through GitHub issues and pull requests.

## Author

**TeMecha Griffin**

Software Engineer | U.S. Air Force Veteran

[LinkedIn](https://www.linkedin.com/in/temecha-griffin/) • [GitHub](https://github.com/msgem0523)
