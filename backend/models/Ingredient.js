const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Ingredients = mongoose.model('Ingredients', IngredientSchema);

module.exports = Ingredients;