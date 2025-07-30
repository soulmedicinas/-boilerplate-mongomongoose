require('dotenv').config();
const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = function(done) {
  const chaiTea = new Person({name: "Chai Tea", age: 35, favoriteFoods: ["tortillas", "goat cheese", "papaya"]});

  chaiTea.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const arrayOfPeople = [
  {name: "Calla", age: 94, favoriteFoods: ["black cod"]},
  {name: "Di", age: 51, favoriteFoods: ["snow peas"]},
  {name: "Zoey", age: 33, favoriteFoods: ["milk chocolate"]}
  ];

const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.error(err);
    done(null, people)
    });
};

const findPeopleByName = function (personName, done) {
  Person.find({name : personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = function (food, done) {
  Person.findOne({favoriteFoods : food }, function (err, food) {
    if(err) return console.log(err);
    done(null, food);
  });
};

const findPersonById = function (personId, done) {
  Person.findById (personId, (err, data) => {
    if (err) return done(err); // Pass the error to the callback
    done(null, data); // Pass the found data to the callback
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson) //pass the new person to the callback function
    })
  })
};

const findAndUpdate = function (personName, done) {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, newDoc) => {
    if (err) return console.log(err);
    done(null, newDoc); //pass the updated document too the callback
  });
};

const removeById = function (personId, done) {
  Person.findByIdAndRemove(personId, function (err, removedDoc) {
    if (err) return console.log(err);
    done(null, removedDoc);
  }
 );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove( {name: nameToRemove}, (err, response) => {
    if (err) console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
 const foodToSearch = "burrito";
  Person.find( {favoriteFoods: foodToSearch} )
        .sort( {name: 1} )
        .limit(2)
        .select( {age:0} )
        .exec((err, people) => {
          if (err) return done(err);
          done(null, people);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
