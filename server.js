const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {MongoClient} = require('mongodb');
const mongoURL = "mongodb://127.0.0.1:27017"

let db;

MongoClient.connect(mongoURL, {useUnifiedTopology: true}, (err, client) =>{
  if (! err) {
    console.log("connect to mongo db .. ")
    db = client.db("workshopExample")
    console.log("connection successful")
  }
  else{
      console.log(err);
  }
})

app.get("/",(_, res)=>{
  res.send('this server is on live!');
})

app.post('/data', bodyParser.json(), (req, res) => {
  const age = parseInt(req.body.age);
  const score = parseInt(req.body.score);
  const school = req.body.school;


  //data validation 
  if (age < 0 || score < 0){
    res.status(400);
    res.send('Invalid data');
  }

  db.collection("testData").insertOne({
    age: age,
    score: score,
    school: school
  })

  res.send(`collected test data successfully:\n
   age: ${age}, score: ${score}, school: ${school}`);
});

app.listen(3000, () => console.log('Server started'));