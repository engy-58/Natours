# Natours RESTful API

Natours is an educational Node.js RESTful API project for a travel/tour booking platform, built as part of Jonas Schmedtmann’s Node.js course.

## Features

- CRUD operations for tours and users
- File-based data persistence (JSON)
- Modular controllers and routes
- Express middleware for logging, error handling, and request timing
- Environment configuration with dotenv

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/engy-58/Natours.git
   cd Natours
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   npm start
   ```

4. The API will run on `http://localhost:3000` (or the port specified in `config.env`).

## API Endpoints

- `GET /api/v1/tours` – Get all tours
- `POST /api/v1/tours` – Create a new tour
- `GET /api/v1/tours/:id` – Get a tour by ID
- `PATCH /api/v1/tours/:id` – Update a tour
- `DELETE /api/v1/tours/:id` – Delete a tour

- `GET /api/v1/users` – Get all users
- `POST /api/v1/users` – Create a new user
- `GET /api/v1/users/:id` – Get a user by ID
- `PATCH /api/v1/users/:id` – Update a user
- `DELETE /api/v1/users/:id` – Delete a user

## Project Structure

- `controllers/` – Route handler logic
- `routes/` – API route definitions
- `dev-data/` – JSON data files
- `public/` – Static assets
- `app.js` – Express app setup
- `server.js` – Server entry point
