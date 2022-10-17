require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//create a personal Schema Prototype
let personSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  age :  Number,
  favoriteFoods : [String]
})

//create a Personal model using the personSchema protoype 
let Person = mongoose.model('Person', personSchema)


//set up the create part of our CRUD. A new person is created using the model if the save method is ran with a callback which returns an err if there is one or returns the data. The mongoose documentation has now moved to an async await model rather than what FCC require for this exercise
const createAndSavePerson = (done) => {
  let ggg = new Person({
    name: "GGG",
    age: 40,
    favoriteFoods: ["Chicken", "Oatmeal", "Eggs"]
  })

  ggg.save((err, data) => {
    err ? done(err) : done(null, data)     
  });
};


// used the .create method to combine a createPerson function and the .save() functions. 
 const createManyPeople =  (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, done, (err, data)=> {
      err ? done(err) : done(null, data)
    });  
};
// find doc but name key using .find() callback function is also passed to handle response for the exercise 
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, done, (err,data) => {
    err ? done(err) : done(null,data)
})
};

//find doc that contains a specific item in the favoriteFoods array 
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err,data) => {
    err ? done(err) : done(null,data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data)=> {
    err ? done(err) : done(null,data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
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
