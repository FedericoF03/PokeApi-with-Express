import express from 'express'

const Router = express.Router()

Router 
.get('/Fav', (req, res) => {
res.render('fav')
})

export default Router