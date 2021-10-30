// implement your server here
// require your posts router and connect it here
const express = require("express")
const server = express()
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')


const postsRouter = require('./posts/posts-router')

//middleware
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

//routes ---- don't put . in front of / on route directory
server.use('/api/posts', postsRouter)

//get home
server.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'API is running: Wow what a nice Blog',
        Date: new Date().toLocaleDateString(),
    })
})



module.exports = server