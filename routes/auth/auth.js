const router = require("express").Router();
const db = require("../../models");
var ObjectId = require('mongoose').Types.ObjectId;
const crypto = require("crypto");


router.post("/", function(req, res){
  let token = req.cookies.token

  db.Session.collection.findOne({token: token}, (mongoErr, response) => {
    if(response){
      res.status(200).send("success")
    }else{
      res.status(200).send("failure")
    }
  })
})

router.post("/onstart", function(req, res){
  let token = req.cookies.token

  db.Session.collection.findOne({token: token}, (mongoErr, session) => {
    if(session){
      let id = session.user_id
      db.User.collection.findOne({'_id': new ObjectId(id)}, (userErr, user) => {
        if(userErr){
          console.log("error", userErr);
          return res.status(500).send();
        }
        res.status(200).send({status: "success", user: user.username})
      })
    }else{
      res.status(200).send({status: "failure"})
    }
  })
})

router.post("/signup", function(req, res){
  let token;

  const userInfo = {
    username: req.body.username,
    lowerCase: req.body.username.toLowerCase(),
    password: req.body.password
  }

  //insert new user to DB
  db.User.collection.insertOne(new db.User(userInfo), (err, savedUser) => {
    if(err){
      return res.send({status: "failed", code: err.code})
    }

    //generate session token
    crypto.randomBytes(32, (err, buffer) =>{
      if(err){
        console.log(err)
        return res.status(500).send()
      }else{
        token = buffer.toString('hex')
        const session = {
          token: token,
          user_id: savedUser.ops[0]._id
        }

        //insert new session into session DB
        db.Session.collection.insertOne(new db.Session(session), (err, newSession) => {
          if(err){
            return res.status(500).send()
          }
          //set browser cookie 
          res.cookie("token", token)
          return res.status(200).send({status: "success", user: savedUser.ops[0].username})
        })
      }
    })
  })
});

router.post("/login", function(req, res){
  let pass = req.body.password;
  let user = req.body.username;
  let responseObj = {status: "", user: null}
  db.User.collection.findOne({lowerCase: user, password: pass}, (err, response) => {
    if(err){
      console.log(err);
      return res.status(500).send()
    }
    if(response){
      //delete any session DB entries associated with user
      db.Session.collection.deleteMany({"user_id": response._id.toString()}, (delErr, delResponse) => {
        if(delErr){
          console.log(delErr);
          return res.status(500).send()
        }
        res.clearCookie("token");
        res.clearCookie("undefined");

        //set new token cookie and write new session into DB
        crypto.randomBytes(32, (err, buffer) =>{
          if(err){
            console.log(err)
            return res.status(500).send()
          }else{
            token = buffer.toString('hex')
            const session = {
              token: token,
              user_id: response._id
            }
    
            //insert new session into session DB
            db.Session.collection.insertOne(new db.Session(session), (err, newSession) => {
              if(err){
                return res.status(500).send()
              }
              //set browser cookie 
              res.cookie("token", token)

              responseObj.status = "success";
              responseObj.user = response.username;
              
              return res.status(200).send(responseObj)
            })
          }
        })
      })
    }else{
      responseObj.status = "failed";
      res.send(responseObj);
    }
  })
})

router.post("/logout", function(req, res){
  let token = req.cookies.token;

  db.Session.collection.deleteOne({token: token}, (err, response) => {
    if(err){
      console.log(err);
      return res.status(500).send()
    }
    if(response.deletedCount === 1){
      res.clearCookie("token");
      return res.status(200).send("success");
    }else{
      res.status(500).send();
    }
    
  })
})

module.exports = router