const mongoose = require("mongoose");
const db = require("../models");
const instance = process.argv[2];
let proceed;
let decks = 0;
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/onDeck_DB");

var newUser = new db.User();
newUser.username = "OnDeck";
newUser.lowerCase = "ondeck";
newUser.password = newUser.generateHash("12345");
newUser.createdDecks = [];

const deckSeed = [
  {
    deckName: "USSR jest",
    numCards: 6,
    numFields: 1,
    createBy: "onDeck",
    handSize: 1,
    allCards: []
  },
  {
    deckName: "Classic Deck",
    numCards: 52,
    numFields: 2,
    createdBy: "onDeck",
    handSize: 5,
    allCards: []
  },
  {
    deckName: "Uno",
    numCards: 108,
    numFields: 1,
    createdBy: "onDeck",
    handSize: 7,
    allCards: []
  }
  ];

let cardSeed = [
  {
    fromDeck: "USSR jest",
    "fieldInfo0": "Loaded barrel",
    "fieldInfo1": null,
    "fieldInfo2": null,
    "fieldInfo3": null,
    "fieldInfo4": null,
    "fieldInfo5": null
  },
  {
    fromDeck: "USSR jest",
    "fieldInfo0": "Loaded barrel",
    "fieldInfo1": null,
    "fieldInfo2": null,
    "fieldInfo3": null,
    "fieldInfo4": null,
    "fieldInfo5": null
  },
  {
    fromDeck: "USSR jest",
    "fieldInfo0": "Loaded barrel",
    "fieldInfo1": null,
    "fieldInfo2": null,
    "fieldInfo3": null,
    "fieldInfo4": null,
    "fieldInfo5": null
  },
  {
    fromDeck: "USSR jest",
    "fieldInfo0": "Loaded barrel",
    "fieldInfo1": null,
    "fieldInfo2": null,
    "fieldInfo3": null,
    "fieldInfo4": null,
    "fieldInfo5": null
  },
  {
    fromDeck: "USSR jest",
    "fieldInfo0": "Loaded barrel",
    "fieldInfo1": null,
    "fieldInfo2": null,
    "fieldInfo3": null,
    "fieldInfo4": null,
    "fieldInfo5": null
  },
  {
    fromDeck: "USSR jest",
    "fieldInfo0": "NOT Loaded barrel",
    "fieldInfo1": null,
    "fieldInfo2": null,
    "fieldInfo3": null,
    "fieldInfo4": null,
    "fieldInfo5": null
  }
];

const makeClassicDeck = () => {
  const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  for(var i=0; i < suits.length; i++){
    for(var k=0; k < values.length; k++){
      cardSeed.push({
        fromDeck: "Classic Deck",
        "fieldInfo0": values[k],
        "fieldInfo1": suits[i],
        "fieldInfo2": null,
        "fieldInfo3": null,
        "fieldInfo4": null,
        "fieldInfo5": null,
        "bgColor": "white"
      })
    };
  };
};

const makeUnoDeck = () => {
  const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Skip', 'Reverse', 'Draw Two'];
  const colors = ['red', 'blue', 'green', 'yellow'];

  for(var i=0; i < colors.length; i++){
    for(var k=0; k < values.length; k++){
      let card = {
        fromDeck: "Uno",
        "fieldInfo0": values[k],
        "fieldInfo1": null,
        "fieldInfo2": null,
        "fieldInfo3": null,
        "fieldInfo4": null,
        "fieldInfo5": null,
        "bgColor": colors[i]
      };
      if(!(values[k] === '0')){
        cardSeed.push(card);
      }
      cardSeed.push(card);
    }
    let wild = {        
      fromDeck: "Uno",
      "fieldInfo0": "wild",
      "fieldInfo1": null,
      "fieldInfo2": null,
      "fieldInfo3": null,
      "fieldInfo4": null,
      "fieldInfo5": null,
      "bgColor": "white"
    }

    let draw4 = {
      fromDeck: "Uno",
      "fieldInfo0": "Draw Four",
      "fieldInfo1": null,
      "fieldInfo2": null,
      "fieldInfo3": null,
      "fieldInfo4": null,
      "fieldInfo5": null,
      "bgColor": "white"
    };

    cardSeed.push(wild);
    cardSeed.push(draw4);
  };
};

makeUnoDeck();
makeClassicDeck();

db.Deck

  //delete deck collection
  .remove({})

  //then delete cards collection
  .then(db.Card.remove({})

  //then delete the User collection
  .then(db.User.remove({})

  //then insert the seed user
  .then(() => db.User.collection.insertOne(newUser))

  //then insert the seed deck
  .then(userData => db.Deck.collection.insertMany(deckSeed)

  //then...
  .then(deckData => {

    //create array of ids of inserted decks
    let deckIds = Object.keys(deckData.insertedIds).map(key => deckData.insertedIds[key])

    //update the seed user so that the inserted deck belongs to him
    db.User.findOneAndUpdate({_id: userData.insertedId}, {$set:{createdDecks: deckIds} }, {new: true}, function(err, doc){
      if(err) throw err
    });

    //fill cards array with instances of db.Card based on the info in cardSeed
    let cards = cardSeed.map(card => new db.Card(card));
    
    //insert all the cards into the cards collection
    db.Card.insertMany(cards, function(err, insertedDocs){
      if(err) throw err;
      
      //seperate _ids of cards into arrays based on the fromDeck property and put them in an object
      let ids = {
        "Uno": insertedDocs.filter(element => element.fromDeck === "Uno").map(element => element._id),
        "Classic Deck": insertedDocs.filter(element => element.fromDeck === "Classic Deck").map(element => element._id),
        "USSR jest": insertedDocs.filter(element => element.fromDeck === "USSR jest").map(element => element._id)
      }

      //find the deck that the cards belong to and set the deck's allCards property to the ids array
      for(var i=0; i < deckData.ops.length; i++){
        let name = deckData.ops[i].deckName

        db.Deck.findOneAndUpdate({deckName: name}, {$set:{ allCards: ids[name] }}, {new: true}, function(err, doc){

          if (err) {
            console.log(err);

          } else {
            
            console.log(`       ${name} seeded successfully`);
            decks++
            if(decks === deckData.ops.length){
              console.log("closing connection")
              mongoose.connection.close();
            }
          };
        });
      }
    });
  })
)));