const Users = require("../models/User");
const Ingredients = require("../models/Ingredient");
const Recipes = require("../models/Recipe");
var express = require("express");
const jwt = require("jsonwebtoken")
var router = express.Router();



router.post("/get/all", async (req, res) => {
    try {
        const recipes = await Recipes.find({})
        if (!recipes) return res.status(404).json({ msg: "RECIPES NOT FOUND" })
        res.status(200).json({ msg: "RECIPES FOUND", data: recipes })
    }
    catch (error) {
        console.error(error);
    }
});

router.post("/add", async (req, res) => {

    try{
    //if(!req.user.admin) return res.status(401).json({msg: "NOT AUTHORIZED"})

    const {name, description, ingredients} = res.body
    const recipe = new Recipes({name, description, ingredients});
    await recipe.save();
    return res.status(200).json(recipe);
    }

    catch (e){
        console.error(e)
    }

});

router.post("/get/user/", async (req, res) => {
    try {
        const recipes = await Users.find({email: req.user.email}).recipes
        if (!recipes) return res.status(404).json({ msg: "RECIPES NOT FOUND" })
        res.status(200).json({ msg: "RECIPES FOUND", data: recipes })
    }
    catch (error) {
        console.error(error);
    }
});

router.post("/get/id/", async (req, res) => {
    try{
        const { id } = req.body;
        const recipe = await Recipes.findOne({_id: id})
        if (!recipe) return res.status(404).json({msg: "RECIPE NOT FOUND"})

        return res.status(200).json({msg: "RECIPE FOUND", data: recipe})
    }
    catch (error) {
        console.error(error);
    }
});

router.post("/update/id/", async (req, res) => {
    try{
        if(!req.user.admin) return res.status(401).json({msg: "NOT AUTHORIZED"})
        

        const {id, name, description, ingredients} = req.body;
        const recipe = await Recipes.findOne({_id: id});

        if (name !== undefined){
            recipe.name = name;
        }

        if(ingredients !== undefined){
            recipe.ingredients = ingredients;
        }

        if (description != undefined){
            recipe.description = description;
        }
        
        await recipe.save()
        res.status(200).json({ msg: "RECIPE UPDATED" });

    } catch (error) {
      console.error(error);
    }
});






module.exports = router