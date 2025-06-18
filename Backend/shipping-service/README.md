# Shipping Service

This microservice handles order shipments, tracking, and shipping partner management for the e-commerce platform.

## Features

- **Shipments:** Create, update, retrieve, and list shipments.
- **Shipment Audit Logs:** Automatically record shipment status changes.
- **Shipping Partners:** Manage shipping partner details.
- **Health Check:** Endpoint to verify service status.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following content:
PORT=5003 POSTGRES_URI=postgres://postgres:e-commerce2025@localhost:5432/ShippingServiceDB
4. Ensure PostgreSQL is running and the `ShippingServiceDB` database exists.
5. Start the service:
- For development: `npm run dev`
- For production: `npm start`

## API Endpoints

### Shipments

- **POST /api/v1/shipments**: Create a new shipment.
- **GET /api/v1/shipments/:id**: Retrieve a shipment by ID.
- **PATCH /api/v1/shipments/:id/status**: Update shipment status.
- **GET /api/v1/shipments**: List shipments with optional filters.

### Shipping Partners

- **POST /api/v1/partners**: Create a new shipping partner.
- **GET /api/v1/partners**: List shipping partners.

## License

MIT License.
