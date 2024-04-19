const Users = require("../models/User");
const Ingredients = require("../models/Ingredient");
const Recipes = require("../models/Recipe");
var express = require("express");
const jwt = require("jsonwebtoken")
var router = express.Router();




router.post("/get", async (req, res) => {
    try {
        const ingredients = await Ingredients.find({})
        if (!ingredients) return res.json({ msg: "INGREDIENTS NOT FOUND" })
        res.json({ msg: "INGREDIENTS FOUND", data: ingredients })
    }
    catch (error) {
        console.error(error);
    }
});



router.post("/add", async (req, res) => {

    try{

    const {name, description} = req.body
    const ingredient = new Ingredients({name, description});
    await ingredient.save();
    return res.status(200).json(ingredient);
    }

    catch (error){
        console.error(error)
    }

});





module.exports = router