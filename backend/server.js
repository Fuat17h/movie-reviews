import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

// Create server
const app = express()

//Attach middleware
app.use(cors())
app.use(express.json())  // retrieve data from request via body

// Specifying initial routes
app.use('/api/v1/movies', movies) // localhost:5000/api/v1/movies
// so every route in movies will start with /api/v1/movies

app.use('*', (req, res) => {
    res.status(404).json({error: "not found"})
});

export default app