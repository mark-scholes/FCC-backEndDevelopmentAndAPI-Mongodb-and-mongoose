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

//set up the query handler for findById 
const findPersonById = (personId, done) => {
  Person.findById(personId, done, (err, data)=> {
     err ? done(err) : done(null,data)
  })
};


// created a function to handle requests to edit existing docs. This uses the previous findPersonById method to firt get the doc and then updates it once the change has been made
async function findEditThenSave  (personId, done)  {
  const foodToAdd = "hamburger";
  await Person.findById(personId, (err, data) => {
    err && console.log(err)
    data.favoriteFoods.push(foodToAdd);

    data.save((err, updatedDoc) => {
      err ? done(err) : done(null, updatedDoc)
    })
  })
};

//function that uses the findOneAndUpdate method to update a document based on the search for a specific name to ammend the age. 
async function findAndUpdate (personName, done) {
  const ageToSet = 20;
  await Person.findOneAndUpdate({name: personName}, {age: ageToSet}, (err, data)=> {
    err ? done(err) : done(null, data)
  }) 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data)=> {
    err ? done(err) : done(null, data)
  })
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
