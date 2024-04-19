const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: { type: Boolean, default: false },
    recipes: { type: mongoose.SchemaTypes.ObjectId, ref: 'Recipes' },
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;