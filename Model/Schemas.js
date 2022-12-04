import './Connection.js'
import { Schema, model } from 'mongoose'

export const PokeSchema = new Schema({
    abilities: [{ability: {name: String}, is_hidden: Boolean}],
    height: Number,
    weight: Number,
    id: {type: String, unique: true, required:true},
    moves: [ { move: { name: String } } ],
    name: {type: String, unique: true, required:true, lowercase: true},
    sprites: {
        front_default: {type: String, default: null}, 
        back_default: {type: String, default: null},
    },
    stats: [ { base_stat: Number, stat: { name: String}}],
    types: [ { _type: { name: String }}],
    id_chain: [{ name: { type: String, lowercase: true } 
    }]
});

export const Pokemon = model('Pokemon', PokeSchema)

const detailPokemonSchema = new Schema({
    id: {type: String, unique: true, required:true},
    name: {type: String, unique: true, required:true, lowercase: true},
    rate: Number ,
    description: String,
    varierities: [{ is_default: Boolean, pokemon: {
        name: {type: String, lowercase: true}
    }}],
    habitat: { name: String },
    legendary: Boolean,
    mythical: Boolean
});

export const DetailPokemon = model('DetailPokemon', detailPokemonSchema)
