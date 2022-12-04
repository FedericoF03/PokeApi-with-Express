import express from "express";
import {
  DetailController,
  PokemonController,
} from "../Controllers/PokemonControllers.js";
import geType from "../Model/TypesController.js";
import fetch from "node-fetch";

const Router = express.Router();

Router.get("/PokemonAdd", async (req, res) => {
  let locals = {
    types: await geType(),
    title: "Poke-add",
  };
  res.render("Add", locals);
})
  .use(express.urlencoded({ extended: true }))
  .post("/PokemonAdd", async (req, res) => {
    let getCountApi = await fetch("https://pokeapi.co/api/v2/pokemon?limit=0&offset=0"),
      {count} = await getCountApi.json(),
      getTheLastPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=0&offset=${count - 1}`),
      {results} = await getTheLastPokemon.json(),
      getCount = await fetch(results[0].url),
      {id} = await getCount.json(),
      countDb = await PokemonController.countController();
      count = countDb + parseInt(id);
    let { body } = req,
      { types, evoChainName, ability, abilities, moves, varierities } = body;

    const filterArray = (element) => {
        return typeof element === "string"
          ? [element.trim() !== "" && element]
          : [...element.filter((el) => el !== "")] 
    }

    body = {
      ...body,
      types:filterArray(types),
      evoChainName:filterArray(evoChainName),
      ability:filterArray(ability),
      abilities:filterArray(abilities),
      moves:filterArray(moves),
      varierities:filterArray(varierities),
    };
    console.log(body)
    try {
      let pokemon = await PokemonController.saveOneController({ body, count });
      let detail = await DetailController.saveOneController({ body, count });
      let locals = {
        body,
        pokemon,
        detail,
        title: "Poke-add",
      };
      return res.render("great", locals);
    } catch (error) {
      let locals = {
        code: error.code,
        keyValue: JSON.stringify(error.keyValue),
        message: "Error for duplicate key",
      };
      return res.render("404", locals);
    } 
  });

export default Router;
