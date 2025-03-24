require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
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

const createManyPeople = (arrayOfPeople, done) => {
  Person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food }, function (err, data) {
    if(err) return console.log(err);
    done(null, food);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err); // Pass the error to the callback
    done(null, data); // Pass the found data to the callback
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Use .findById() to find a person by _id
  Person.findById(personId, (err, person) => {
    if (err) return done(err); // Pass the error to the callback

    // Add "hamburger" to the person's favoriteFoods array
    person.favoriteFoods.push(foodToAdd);

    // Save the updated person
    person.save((err, updatedPerson) => {
      if (err) return done(err); // Pass the error to the callback
      done(null, updatedPerson); // Pass the updated person to the callback
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, (err, updatedDoc) => {
  if (err) return done(err);
  done(null, updatedDoc); // Pass the updated person to the callback
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
  if (err) return done(err);
  done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
