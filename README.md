# Webz API Client Implementation

This project is a **Webz.io (formerly Webhose.io) API client** built using the **NestJS** framework with **TypeScript** and **Prisma ORM** for interacting with a database.

## Requirements

Before setting up the project, make sure you have the following installed on your system:

- **Node.js** (version 14.x or later)
- **Docker** and **Docker Compose** (for setting up the database)
- **npm** (Node Package Manager)

### Additional Requirements:

- **Webz.io API Key**: You need to have a Webz.io API key to interact with their API. You can obtain it from [Webz.io](https://webz.io/).
- **Database Configuration**: Ensure that your database is properly set up. The project uses **Prisma ORM** for database management, and you need a compatible SQL database (e.g., PostgreSQL, MySQL, etc.).

## Project Setup

1. **Install Dependencies**:

   Run the following command to install the necessary dependencies:

   ```bash
   $ npm install
   ```

2. **Rename `.env.sample` to `.env`**:

   Copy the `.env.sample` file to `.env` to configure environment variables, such as your Webz.io API key and database credentials:

   ```bash
   $ cp .env.sample .env
   ```

   Update the `.env` file with your actual Webz.io API key and database connection details.

3. **Configure Database**:

   To set up the database, you can use Docker. Run the following command to start the database container:

   ```bash
   $ docker compose up --build -d
   ```

   This will start the database service in the background.

4. **Run SQL Migrations**:

   Run the following command to apply the database migrations:

   ```bash
   $ npx prisma migrate dev --name init
   ```

   This will create the necessary database tables as defined in your Prisma schema.

## Compile and Run the Project

1. **Development Mode**:

   To run the project in development mode (with live reload):

   ```bash
   $ npm run start:dev
   ```

2. **Production Mode**:

   To run the project in production mode:

   ```bash
   $ npm run start:prod
   ```

3. **Watch Mode**:

   To run the project in watch mode (automatically recompiles on file changes):

   ```bash
   $ npm run start
   ```

## Run Tests

To run the unit tests, use the following command:

```bash
$ npm run test
```
