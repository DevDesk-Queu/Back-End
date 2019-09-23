const supertest = require('supertest')
const server = require('./server.js')
const db = require('../data/dbConfig.js')
require('jest-chain')

describe('the server', () => {
    describe('GET /', () => {
        it('should be the testing env', () => {
            expect(process.env.DB_ENV).toBe('testing')
        })
        it('should return a status of 200', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
            })
        })
        it('should return the correct type', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.type).toBe('text/html')
                })
        })
    })
    describe('GET /users', () => {
        it('should return a list of users', () => {
            return supertest(server)
                .get('/api/users')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toBe('application/json')
                    expect(res.body.length).toBeGreaterThanOrEqual(4)
                })
        })
    })
    describe('GET /users/:id', () => {
        it('should return a singular user', () => {
            return supertest(server)
                .get('/api/users/2')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toBe('application/json')
                    expect.objectContaining({
                        id: expect(2),
                        fullName: expect('Light Yagami'),
                        email: expect('ly@test.com'),
                        role: 'admin'
                    })
                })
        })
    })
    describe('GET /users/:id/tickets', () => {
        it('should return all tickets for a given user', () => {
            return supertest(server)
                .get('/api/users/3/tickets')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toBe('application/json')
                    expect(res.body.length).toBeGreaterThanOrEqual(1)
                })
        })
    })
    describe('GET /tickets', () => {
        it('should return a list of tickets', () => {
            return supertest(server)
                .get('/api/tickets')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toBe('application/json')
                    expect(res.body.length).toBeGreaterThanOrEqual(13)
                })
        })
    })
    describe('GET /tickets/:id/comments', () => {
        it('should return a list of comments for a given ticket', () => {
            return supertest(server)
                .get('/api/tickets/5/comments')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toBe('application/json')
                    expect(res.body.length).toBeGreaterThanOrEqual(2)
                })
        })
    })
    describe('GET /comments', () => {
        it('should return a list of comments', () => {
            return supertest(server)
                .get('/api/comments')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.type).toBe('application/json')
                    expect(res.body.length).toBeGreaterThanOrEqual(28)
                })
        })
    })
    describe('POST /api/auth/register', () => {
        beforeEach( () => {
            db('users').truncate()
        })
        it('should return a newly created user', () => {
            return supertest(server)
                .post('/api/auth/register')
                    .send({
                        fullName: 'Macie',
                        role: "user",
                        email: 'macie@test.com',
                        password: 'test'
                    })
                    .then(res => {
                        expect(res.status).toBe(500)
                        expect(res.type).toBe('application/json')
                        expect.objectContaining({
                            fullName: expect('Macie'),
                            role: expect('user'),
                            email: expect('macie@test.com'),
                            password: expect('test')
                        })
                    })
        })
    })
    describe('POST /api/auth/login', () => {
        it('should log user into database and return a new token', () => {
            return supertest(server)
                .post('/api/auth/login')
                    .send({
                        email: 'ly@test.com',
                        password: 'test'
                    })
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(res.type).toBe('application/json')
                        expect.objectContaining({
                            token: expect.any(String)
                        })
                    })
        })
    })
    describe('POST /api/users/:id/tickets', () => {
        it('should add a new ticket to a given user', () => {
            return supertest(server)
                .post('/api/users/1/tickets')
                    .send({
                        title: 'this is a test',
                        description: 'this is a test',
                        category: 'this is a test',
                        user_id: 'this is a test'
                    })
                    .then(res => {
                        expect(res.status).toBe(201)
                        expect.objectContaining({
                            id: expect.any(Number),
                            description: expect.any(String),
                            user_id: expect.any(Number)
                        })
                    })
        })
    })
    describe('POST /api/tickets', () => {
        it('should add a new ticket to the database', () => {
            return supertest(server)
                .post('/api/tickets')
                    .send({
                        title: 'this is a test',
                        description: 'this is a test',
                        category: 'this is a test',
                        user_id: 'this is a test'
                    })
                    .then(res => {
                        expect(res.status).toBe(201)
                        expect.objectContaining({
                            id: expect.any(Number),
                            description: expect.any(String),
                            user_id: expect.any(Number)
                        })
                    })
        })
    })
    describe('POST /api/tickets/:id/comments', () => {
        it('should add a comment to a given ticket', () => {
            return supertest(server)
                .post('/api/tickets/3/comments')
                    .send({
                        comment: 'this is a test',
                        user_id: 2,
                        ticket_id: 12,
                    })
                    .then(res => {
                        expect(res.status).toBe(201)
                        expect.objectContaining({
                            comment: expect.any(String),
                            user_id: expect.any(Number),
                            ticket_id: expect.any(Number)
                        })
                    })
        })
    })
    describe('PUT /api/users/:id', () => {
        xit('should update a given user', () => {
            return supertest(server)
                .put('/api/users/1')
                    .send({
                        fullName: 'Devilman Crybaby',
                        role: 'user'
                    })
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect.objectContaining({
                            count: expect.any(Number).toBeGreaterThanOrEqual(1),
                        })
                    })
        })
    })
})