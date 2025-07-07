require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

const ticketRoutes = require('./routes/tickets')
app.use('/', ticketRoutes)

app.listen(process.env.PORT || 3000) 