const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
})

async function getTypes() {
  const conn = await pool.getConnection()
  try {
    return await conn.query('SELECT id, name FROM types')
  } finally {
    conn.release()
  }
}

async function createTicket(typeId, email, message) {
  const conn = await pool.getConnection()
  try {
    return await conn.query('INSERT INTO tickets (type_id, email, message) VALUES (?, ?, ?)', [typeId, email, message])
  } finally {
    conn.release()
  }
}

async function getTickets() {
  const conn = await pool.getConnection()
  try {
    return await conn.query('SELECT t.id, ty.name as type, t.email, t.message FROM tickets t JOIN types ty ON t.type_id = ty.id')
  } finally {
    conn.release()
  }
}

module.exports = {
  getTypes,
  createTicket,
  getTickets
} 