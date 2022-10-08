import fetch from 'node-fetch';
import {fileURLToPath} from 'url';
import path from 'path'
import express from 'express'
const Router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
Router
     .get('/pokedex', (req, res) => {
        res.set('Content-Type', 'text/html')
        
        res.sendFile('Pokedex.html', { root: path.join(__dirname, '../Public/Views')})
     })

export default Router 