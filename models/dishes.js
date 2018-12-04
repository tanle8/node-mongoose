const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// First, we create the schema we want here
const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

// With given "dishSchema", we construct the model from this schema
var Dishes = mongoose.model('Dish', dishSchema);

// It's time to export the module from this file here
module.exports = Dishes;