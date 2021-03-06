const express = require('express');
const app = express();
const port = 8888;
var url = require('url');
var mongo = require('mongodb');
var monk = require('monk');
var charDb = monk('localhost:27017/characters');

//app.get('/api/stats', (req, res) => res.send('Stat request received'));
app.get('/api/stats', function(req, res) {
  // Need to separate out these handlers.

  // Lower-case character handling
  var id_char=req.query.id_char;
  id_char = id_char.toLowerCase();
  id_char = id_char.substring(0,1).toUpperCase() + id_char.slice(1,id_char.length);

  var id_game=req.query.id_game;
  // may as well lowercase this
  var query_type=req.query.query_type.toLowerCase();
  var characters="1";

  // Set collection name based on command parameters
  console.log("[DEBUG] query_type=" + query_type);
  if(query_type === "growths")
    characters = charDb.get(id_game + "_growths");
  if(query_type === "bases")
    characters = charDb.get(id_game + "_bases");
  // oh god what a hacky implementation. i'll fix this...definitely a better way to do it
  if(characters === "1")
    return;

  // at least re-using this block
  characters.findOne({"Name" : {$in: [id_char]} }, function (err, doc) {
    console.log("[DEBUG] Searching for character " + id_char + " in game " + id_game + "...");
    if(err) return "Error";
    //return doc;
    //res.send(doc);
    console.log(query_type + " : " + doc);
    res.json(doc);
  });
});

app.get('/api/skills', function(req, res) {
  // URL params: id_game, id_char/id_skill, id_type
  var id_game=req.query.id_game;
  var id_type=req.query.id_type;

  if(id_type.toLowerCase() === "char") {
    // Lower-case character handling
    var id_char=req.query.id_char;
    id_char = id_char.toLowerCase();
    id_char = id_char.substring(0,1).toUpperCase() + id_char.slice(1,id_char.length);   
  }

  characters = charDb.get(id_game + "_skills");
  characters.findOne({"Name" : {$in: [id_char]} }, function (err, doc) {
    console.log("[DEBUG] Searching for character " + id_char + " in game " + id_game + "...");
    if(err) return "Error";
    //return doc;
    //res.send(doc);
    res.json(doc);
  });
  //res.send('Stat request received');
});

app.listen(port, () => console.log('Server listening on port 8888...'));
