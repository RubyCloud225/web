const request = require('supertest');
const express = require('express');
const app = require('./server'); // Assuming server.js exports the app

describe('POST /api/contact', () => {
  it('should send email and respond with success true', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should handle email sending failure gracefully', async () => {
    // To simulate failure, we can mock nodemailer or send invalid data
    // Here, we send invalid data to cause failure
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: '',
        email: 'invalid-email',
        message: '',
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  });
});
