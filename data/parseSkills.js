var fs = require('fs');

var baseFilePath = "TRS_char_skills";
var injectFilePath = "TRS_char_alt_names";
var baseContents = fs.readFileSync(baseFilePath + ".csv", 'utf8');
var injection = fs.readFileSync(injectFilePath + ".csv", 'utf8');

var baseArr = baseContents.split("\n");
var injArr  = injection.split("\n");

if(baseArr.length !== injArr.length) {
  console.log("[ERROR] Input file size mismatch");
  process.exit(1);
}

var len = baseArr.length;
var output = "";
for(var i=1; i<len; i++) {
  var temp = {};
  var skillArr = [];
  temp.Name = injArr[i].split(',').filter(function(el) {return el.length != 0});

  var procSkillArr = baseArr[i].split(',').filter(function(el) {return el.length != 0});
  for(var j=1; j<procSkillArr.length; j+=2) {
    var tempSkillObj = {};
    tempSkillObj.skillName = procSkillArr[j];
    tempSkillObj.skillCond = procSkillArr[j+1];
    //tempSkillObj[procSkillArr[j]] = procSkillArr[j+1];
    skillArr.push(tempSkillObj);
  }
  temp.Skills = skillArr;
  output += JSON.stringify(temp);
  output += "\n";

}

fs.writeFile(baseFilePath + "_out.json", output, function(e) {
  if(e) {
    return console.log(e);
  }
  console.log("Character names injected; file output to " + baseFilePath + "_mod.json.");
})

/*
{
  "Name": [],
  "Skills": [
    { skillName: skillCondition }
  ]
}
*/