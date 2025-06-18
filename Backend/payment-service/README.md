# Payment Service

This is the payment service for the e-commerce platform.

## Endpoints

### Create Payment
`POST /api/v1/payments`

#### Request Body
```json
{
    "order_id": "uuid",
    "payment_method": "CREDIT_CARD",
    "amount": 100.50,
    "status": "PENDING",
    "transaction_id": "optional-transaction-id"
}
