const express = require('express');
const app = express();
const port = 8888;
var url = require('url');
var mongo = require('mongodb');
var monk = require('monk');
var charDb = monk('localhost:27017/characters');

//app.get('/api/stats', (req, res) => res.send('Stat request received'));
app.get('/api/stats', function(req, res) {
  var id_char=req.query.id_char;
  var id_game=req.query.id_game;
  var subCat=req.query.subCat;
  characters = charDb.get(id_game + "_growths");
  characters.findOne({"Name" : id_char}, function (err, doc) {
    console.log("[DEBUG] Searching for character " + id_char + " in game " + id_game + "...");
    if(err) return "Error";
    //return doc;
    //res.send(doc);
    res.json(doc);
  });
  //res.send('Stat request received');
});

app.listen(port, () => console.log('Server listening on port 8888...'));
