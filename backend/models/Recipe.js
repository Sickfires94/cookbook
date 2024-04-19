const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients:  { type: mongoose.SchemaTypes.ObjectId, ref: 'Ingredients' },

});

const Recipes = mongoose.model('Recipes', RecipeSchema);

module.exports = Recipes;