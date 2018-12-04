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
    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    // function createDish(dishName, dishDescription) {
    //     return Dishes({
    //         name: dishName,
    //         description: dishDescription
    //     });
    // };
    // newDish = createDish('Uthappizza', 'test');

    // // The save() method will cause the dish value to be saved and return a promise
    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({});
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        .then(() => {

            return mongoose.connection.close();
        })
        .catch((err) => {
            
            console.log(err);
        });
});