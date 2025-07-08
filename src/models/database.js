const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
})

async function getTypes() {
  const conn = await pool.getConnection()
  try {
    const types = await conn.query('SELECT id, name FROM types ORDER BY name')
    return types
  } catch (error) {
    console.error('Error fetching types:', error.message)
    throw new Error('Failed to fetch ticket types')
  } finally {
    conn.release()
  }
}

async function createTicket(typeId, email, message) {
  const conn = await pool.getConnection()
  try {
    const types = await conn.query('SELECT id FROM types WHERE id = ?', [typeId])
    if (types.length === 0) {
      throw new Error('Invalid ticket type')
    }
    
    const result = await conn.query(
      'INSERT INTO tickets (type_id, email, message) VALUES (?, ?, ?)', 
      [typeId, email, message]
    )
    return result
  } catch (error) {
    console.error('Error creating ticket:', error.message)
    throw new Error('Failed to create ticket')
  } finally {
    conn.release()
  }
}

async function getTickets() {
  const conn = await pool.getConnection()
  try {
    const tickets = await conn.query(`
      SELECT t.id, ty.name as type, t.email, t.message, t.created_at 
      FROM tickets t 
      JOIN types ty ON t.type_id = ty.id 
      ORDER BY t.id DESC
    `)
    return tickets
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw new Error('Failed to fetch tickets')
  } finally {
    conn.release()
  }
}

process.on('SIGINT', async () => {
  console.log('Shutting down database connections...')
  await pool.end()
  process.exit(0)
})

module.exports = {
  getTypes,
  createTicket,
  getTickets
} 