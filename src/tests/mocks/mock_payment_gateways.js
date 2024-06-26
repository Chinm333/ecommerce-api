const nock = require('nock');

// Mock Stripe
nock('https://api.stripe.com')
    .post('/v1/charges')
    .reply(200, {
        id: 'ch_1GqIC8FNZd6p1XkYXiu5kmoG',
        amount: 1000,
        currency: 'usd',
        status: 'succeeded',
        source: {
            id: 'card_1GqIC7FNZd6p1XkYDSvFZzgh',
            object: 'card',
            brand: 'Visa',
            last4: '4242',
        },
    });

// Mock PayPal
nock('https://api.paypal.com')
    .post('/v1/payments/payment')
    .reply(200, {
        id: 'PAY-1234567890ABCDEFGHIJKLMN',
        intent: 'sale',
        state: 'approved',
        payer: {
            payment_method: 'paypal',
        },
        transactions: [{
            amount: {
                total: '10.00',
                currency: 'USD',
            },
            description: 'This is the payment transaction description.',
        }],
    });
