const router = require("express").Router();
const db = require("../../models")
const firebase = require("../../firebase");

function shuffle(originalArray) {
    var array = [].concat(originalArray);
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

router.get("/", function(req, res){
    console.log(req.body);
    res.send("test route worked")
});

router.post("/", function(req, res){
    console.log(req.body);
    res.send("test route worked")
});

router.get("/decks", function(req, res){
    
    db.Deck.find({}).exec(function(err, docs){
        if(err) throw err
        
        const deckNames = docs.map(deck => deck.deckName);

        res.json(deckNames);
    });
});

router.post("/creategame", function(req, res){
  const code = firebase.generateGameCode();
  const {deckName, numPlayers, maker} = req.body;
  
  db.Deck.findOne({deckName: deckName}).lean().populate({path: "allCards", options: {lean: true}}).exec((err, docs) => {
    
    const cards = docs.allCards.map(card => {
      let trimmedCard = {}
      for(i in card){
        if(card[i] !== null){
          trimmedCard[i] = card[i];
        };
      };
      return trimmedCard
    });

    let newGame = {
      dealt: false,
      deckName: deckName,
      message: `Welcome to ${maker}'s game!`,
      active: maker,
      GM: maker,
      direction: "forward", 
      maxPlayers: numPlayers,
      players: [maker],
      allCards: cards,
      discardPile: ["cards"],
      cardPile: ["cards"].concat(shuffle(cards)),
      hands: {}
    };

    newGame.hands[maker] = ["cards"];

    firebase.firebase.database().ref().child(`games/${code}`).set(newGame, err => {
      if(err){
        res.send({status: "failure", code: "firebase error"})
      } else{
        res.send({status: "success", gameCode: code})
      };
    });
  });
});

router.post("/deckcreate", function(req, res) {
  const deck = new db.Deck(req.body.deckInfo)
  db.Deck.collection.insertOne(deck, (err, docs) => {
    if(err) throw err

    //building the cards out
    let cards = req.body.cards.map(card => new db.Card(card));
    
    //insert all the cards into the cards collection
    db.Card.insertMany(cards, function(err, insertedDocs){
      if(err) throw err;
      let name = req.body.deckInfo.deckName
          
      let ids = insertedDocs.map(card => card._id)

      db.Deck.findOneAndUpdate({deckName: name}, {$set:{ allCards: ids}}, {new: true}, function(err, doc){
        if (err) throw err

        res.send("deck entered")
      });
    });
  });
});

module.exports = router