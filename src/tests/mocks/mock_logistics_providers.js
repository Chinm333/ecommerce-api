const nock = require('nock');

// Mock logistics provider
nock('https://api.logisticsprovider.com')
  .post('/v1/shipments')
  .reply(200, {
    trackingId: 'SHIP123456789',
    status: 'Created',
    estimatedDelivery: '2024-07-01',
  });
