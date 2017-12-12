var fs = require('fs');

var baseFilePath = "TRS_growths";
var injectFilePath = "TRS_char_alt_names";
var baseContents = fs.readFileSync(baseFilePath + ".json", 'utf8');
var injection = fs.readFileSync(injectFilePath + ".csv", 'utf8');

var baseArr = baseContents.split("\n");
var injArr  = injection.split("\n");

if(baseArr.length !== injArr.length) {
  console.log("[ERROR] Input file size mismatch");
  process.exit(1);
}

var len = baseArr.length;
var output = "";
for(var i=0; i<len; i++) {
  if (i === 0)
    continue;

  var temp;
  try {
    temp = JSON.parse(baseArr[i]);
  } catch(e) { 
    console.log(baseArr[i]);
  }
  temp.Name = injArr[i].split(',').filter(function(el) {return el.length != 0});
  output += JSON.stringify(temp);
  output += "\n";
}

fs.writeFile(baseFilePath + "_mod.json", output, function(e) {
  if(e) {
    return console.log(e);
  }
  console.log("Character names injected; file output to " + baseFilePath + "_mod.json.");
})