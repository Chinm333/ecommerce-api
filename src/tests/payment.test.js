const request = require('supertest');
const app = require('../../index.js');
require('./mocks/mock_payment_gateways.js'); 
require('./mocks/mock_logistics_providers.js');

describe('Payment API', () => {
    it('should create a new payment with Stripe', async () => {
        const response = await request(app)
            .post('/api/payment/createPayment')
            .send({
                orderId: '1234567890',
                userId: 'user123',
                totalAmount: 1000,
                paymentMethod: 'Stripe',
            });

        expect(response.status).toBe(201);
        expect(response.body.data.paymentId).toBeDefined();
        expect(response.body.data.status).toBe('Completed');
    });

    it('should create a new payment with PayPal', async () => {
        const response = await request(app)
            .post('/api/payment/createPayment')
            .send({
                orderId: '1234567890',
                userId: 'user123',
                totalAmount: 1000,
                paymentMethod: 'PayPal',
                paymentId: 'payment123',
                status: 'Pending',
            });

        expect(response.status).toBe(201);
        expect(response.body.data.paymentId).toBeDefined();
        expect(response.body.data.status).toBe('Completed');
    });

    it('should get payments with pagination', async () => {
        const response = await request(app)
            .get('/api/payment/getPayment?page=1&limit=10');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.pagination).toBeDefined();
    });

    it('should update a payment', async () => {
        const response = await request(app)
            .put('/api/payment/updatePayment/d9fa95e4') // Replace with the actual payment ID from DB
            .send({
                status: 'Completed',
                paymentMethod: 'PayPal',
            });
        expect(response.status).toBe(200);
        expect(response.body.data.status).toBe('Completed');
    });

    it('should delete a payment', async () => {
        const response = await request(app)
            .delete('/api/payment/deletePayment/d9fa95e4'); // Replace with the actual payment ID from DB

        expect(response.status).toBe(200);
    });
});
