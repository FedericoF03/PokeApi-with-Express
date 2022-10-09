import {fileURLToPath} from 'url';
import path from 'path'
import express from 'express'
import getAllPoke  from '../Controllers/datapoke.js';

const Router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    
Router
     .get('/pokedex', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.sendFile('Pokedex.html', { root: path.join(__dirname, '../Public/Views')})
     })
     .get('/getPokes', async (req, res) => {
        let data = await getAllPoke()
        res.json(data)
     })
export default Router 