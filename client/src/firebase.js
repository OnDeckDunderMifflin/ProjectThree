import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDPwMmbvrCll1xgRRMjMAUFgwUA6_b_c14",
    authDomain: "on-deck-1595d.firebaseapp.com",
    databaseURL: "https://on-deck-1595d.firebaseio.com",
    storageBucket: "on-deck-1595d.appspot.com",
};

firebase.initializeApp(config);

var playersRef;
var handRef;
var gameRef;
var playersOnDisconnect = [];

function findGame(code, cb){
  if(code.length < 5){
    cb({status: "failed", code: "game code too short"});
    return;
  }
  firebase.database().ref().child('games').child(code).once('value', snap => {
    const game = snap.val()
    if(!game){
      cb({status: "failed", code: "No game found with that password"})
    } else if(Object.keys(game.players).length < game.maxPlayers){
      cb({status: "success", name: game.name})
    } else{
      cb({status: "failed", code: "game is full"});
    }
  });
};

function connectToGame(code, player, cb){
  playersRef = firebase.database().ref().child(`games/${code}/players`);
  handRef = firebase.database().ref().child(`games/${code}/hands/${player}`);
  gameRef = firebase.database().ref().child(`games/${code}`)
  gameRef.onDisconnect().set(null)

  playersRef.once('value', snap => {
    const playersInGame = snap.val()
    if(playersInGame.indexOf(player) === -1){
      playersInGame.push(player);
      playersRef.set(playersInGame);
    }
  })
  .then(() => {
    handRef.once('value', snap => {
      if(!snap.val()){
        handRef.set(["cards"])
      }
    })
  })
  .then(() => {
    gameRef.on('value', snap => {
      gameRef.onDisconnect().cancel();

      const game = snap.val()

      playersOnDisconnect = game.players.filter(playerName => playerName !== player)

      game.players = playersOnDisconnect

      gameRef.onDisconnect().set(playersOnDisconnect.length < 1 ? null : game)

      cb(snap.val())
    });
  });
};

function leaveGame(code, player){
  playersRef.once('value', snap => {
    let players = snap.val();
    if(players.length < 2 ){
      gameRef.off()
      firebase.database().ref().child(`games/${code}`).remove()
      
    }else{
     gameRef.off()
     const delIndex = players.indexOf(player)
      if(delIndex !== -1){
        players.splice(delIndex, 1)
        playersRef.set(players)
      }
    }
  });
}



export default firebase;

export {findGame}
export {connectToGame}
export {leaveGame}
