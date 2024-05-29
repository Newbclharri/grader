function isTemplate() {
  const ss = SpreadsheetApp.getActive();
  const ssName = ss.getName();
  const target = "template - las campanitas";
  const responseForms = getResponseForms();

  if(ssName.toLowerCase() === target || responseForms.length === 0){
    return true;
  }
  return false;
}

function testIsTemplate(){
  console.log(isTemplate())
}
