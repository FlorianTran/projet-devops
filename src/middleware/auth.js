const basicAuth = require('basic-auth')

function requireAuth(req, res, next) {
  const user = basicAuth(req)
  if (!user || user.name !== process.env.ADMIN_USER || user.pass !== process.env.ADMIN_PASSWORD) {
    res.set('WWW-Authenticate', 'Basic')
    return res.status(401).send('Auth required')
  }
  next()
}

module.exports = {
  requireAuth
} 