# Crypto Tracker

This project is a full-stack application that tracks cryptocurrency data. It consists of a React frontend and a Node.js backend.

## Getting Started

Follow the steps below to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Clone the project
### Setup in local system
1) Create a .env file:

Navigate to the root directory of the project and create a .env file. Copy the contents of the .env_example file into the newly created .env file.
cp .env_example .env

## Install dependencies for the frontend and backend:
# Install frontend dependencies
cd public
npm install

# Install backend dependencies
cd ../server
npm install

## Start Mongod server
Ensure MongoDB is running on your local machine. You can start MongoDB using the following command in terminal:
-> mongod
## Start the Node.js backend:
Open a new terminal, navigate to the server folder, and start the Node.js server using following command.
npm start
## Start the React frontend:
Navigate to the public folder and start the React development server.
npm start

