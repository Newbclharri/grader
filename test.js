function testcreatStatSheet(){
  createStatSheet({section: "A", threshold: 10 , max: 0, accuracy: true});
}

function test(settings){
  console.log("Settings before processing: ", settings)
  const propNames = ["section", "threshold", "count"];
  const propValues = [null, 7, 1];

  for(let i = 0; i < propNames.length; i++){
    let name = propNames[i];
    let value = propValues[i]
    if(!settings[name]){
      settings[name] = value;
    }
  }

  console.log("Setting after processing:", settings)
}

function getInfo(settings = {}){
  settings.group = settings.group || "A";
  settings.period = settings.period || 2;
  console.log(settings)
}

function runGetInfo(){
  getInfo({group: "B"})
}