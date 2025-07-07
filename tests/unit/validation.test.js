const request = require('supertest')
const express = require('express')
const basicAuth = require('basic-auth')
const app = express()
app.use(express.json())
app.post('/', (req, res) => {
  const { type_id, email, message } = req.body
  if (!type_id || !email || !message) return res.status(400).send('Invalid')
  res.status(201).send('OK')
})
app.get('/tickets', (req, res) => {
  const user = basicAuth(req)
  if (!user || user.name !== 'admin' || user.pass !== 'pass') return res.status(401).set('WWW-Authenticate', 'Basic').send('Auth required')
  res.status(200).send('OK')
})
describe('Ticket validation', () => {
  it('rejects missing fields', async () => {
    await request(app).post('/').send({}).expect(400)
    await request(app).post('/').send({ type_id: 1, email: '', message: 'msg' }).expect(400)
  })
  it('accepts valid ticket', async () => {
    await request(app).post('/').send({ type_id: 1, email: 'a@b.com', message: 'msg' }).expect(201)
  })
})
describe('/tickets access', () => {
  it('rejects no auth', async () => {
    await request(app).get('/tickets').expect(401)
  })
  it('rejects wrong auth', async () => {
    await request(app).get('/tickets').auth('admin', 'wrong').expect(401)
  })
  it('accepts correct auth', async () => {
    await request(app).get('/tickets').auth('admin', 'pass').expect(200)
  })
}) 