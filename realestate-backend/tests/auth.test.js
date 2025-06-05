const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('API RealEstate backend fonctionne !');
});

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/RealEstate-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('API Backend', () => {
  it('GET / doit répondre avec un message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('API RealEstate backend fonctionne');
  });

  describe('Authentification', () => {
    const testUser = { name: 'Test', email: 'test@ex.com', password: '123456' };

    it('POST /api/auth/signup crée un utilisateur', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send(testUser);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', testUser.email);
    });

    it('POST /api/auth/signup refuse un email déjà utilisé', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send(testUser);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email déjà utilisé');
    });

    it('POST /api/auth/login fonctionne avec les bons identifiants', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', testUser.email);
    });

    it('POST /api/auth/login échoue avec un mauvais mot de passe', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: 'wrongpass' });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Email ou mot de passe incorrect');
    });
  });
}); 