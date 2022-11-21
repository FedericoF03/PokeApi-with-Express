import express from 'express'

const Router = express.Router()
let locals = {title: 'Fav'}
Router.get('/Fav', (req, res) => res.render('fav', locals) )

export default Router