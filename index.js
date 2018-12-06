const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

// First, we will establish the connection to the mongo server
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

// It's time to connect to the database in our mongo server
connect.then((db) => {

    // Once the conection is established, we need to indicate that state
    console.log('Connected correctly to server');

    // Now, we create new dish with the dishSchema that we've beed created in "dishes.js"
    // which will return a promise.
    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish + "\n\nTAN is here\n");

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test' }
        }, {
            new: true
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
        
        return db.collection('dishes').drop();
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    });
});