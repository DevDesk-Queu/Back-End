const supertest = require('supertest')
const server = require('./server.js')

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
                .get('/api/users/2/tickets')
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
})