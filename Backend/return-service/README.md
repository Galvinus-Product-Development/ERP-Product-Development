# Return Service Microservice

This microservice handles returns and refunds for our e-commerce platform.

## Features

- **Return Requests:** Create, update, retrieve, and list return requests.
- **Refunds:** Create and list refunds for return requests.
- **Audit Logging:** Track status changes for return requests.
- **Validation:** Request data is validated using `express-validator`.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following variables:
PORT=5002 POSTGRES_URI=postgres://postgres:e-commerce2025@localhost:5432/ReturnServiceDB
4. Ensure PostgreSQL is running and the `ReturnServiceDB` database exists.
5. Start the service:
- Development: `npm run dev`
- Production: `npm start`

## API Endpoints

### Return Requests

- **POST /api/v1/returns**  
Create a new return request.

- **GET /api/v1/returns/:id**  
Retrieve a return request by ID.

- **PATCH /api/v1/returns/:id/status**  
Update the status of a return request.

- **GET /api/v1/returns**  
List return requests with optional filters.

### Refunds

- **POST /api/v1/refunds**  
Create a refund for a return request.

- **GET /api/v1/refunds**  
List refunds with optional filters.

## Testing

Place your tests in the `/tests` directory.

## License

MIT License.
