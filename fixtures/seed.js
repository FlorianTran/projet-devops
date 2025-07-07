require('dotenv').config()
const mariadb = require('mariadb')
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 1
})
async function seed() {
  const conn = await pool.getConnection()
  try {
    console.log('Creating tables...')
    await conn.query('DROP TABLE IF EXISTS tickets')
    await conn.query('DROP TABLE IF EXISTS types')
    await conn.query('CREATE TABLE types (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(32) NOT NULL)')
    await conn.query('CREATE TABLE tickets (id INT PRIMARY KEY AUTO_INCREMENT, type_id INT, email VARCHAR(128), message TEXT, FOREIGN KEY (type_id) REFERENCES types(id))')
    
    console.log('Inserting types...')
    await conn.query('INSERT INTO types (name) VALUES ("bug"), ("question"), ("suggestion")')
    
    console.log('Inserting sample ticket...')
    const types = await conn.query('SELECT id FROM types WHERE name = "bug"')
    if (types.length > 0) {
      await conn.query('INSERT INTO tickets (type_id, email, message) VALUES (?, "test@example.com", "A bug report")', [types[0].id])
    }
    
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error.message)
    process.exit(1)
  } finally {
    conn.release()
    process.exit(0)
  }
}
seed() 