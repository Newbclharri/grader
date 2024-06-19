/**
 * inserts a column at position 1
 * that counts number of submissions
 * in the active sheet
 */
function insertCountSubmissionsColumn(options) {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getActiveSheet();
  //check if sheet is a form submission
  if (isCampanita(sh)){
    const position = getTimestampColumn(sh);
    const headerRow = 1;
    const colStart = 1;
    const range = sh.getRange(headerRow, colStart);
    const columnHeader = range.getValue();   
    //check if TimestampColumn is the first column
    if (position < 2){      
      sh.insertColumnBefore(position);
      range.setValue(generateCountFormulaString(options));
      range.setFontWeight('bold');
      range.setFontSize(20);
      range.setHorizontalAlignment("center");
      sh.autoResizeColumn(1);
    }else if(position > 1){ 
      //if column was added, but there's no formula string, add formula string     
      if(!columnHeader){
        range.setValue(generateCountFormulaString(options));
        range.setFontWeight('bold');
        range.setFontSize(20);
        range.setHorizontalAlignment("center");
        sh.autoResizeColumn(1);
      }
    }
  }  
}

/**
 * generates a formula string that counts number of submissions
 * in a form response sheet
 * @param {Object} options -options: {phrase: {String}, numStudents: {Number}, period: {String}}
 * @return {String} formulaString
 */

function generateCountFormulaString(options){
  options = handleOptions(options);
  const {phrase, numStudents, period} = options;
  const formulaString = `=concatenate("${phrase}",char(10),${numStudents} - countif(G:G,"${period}"))`;
  
  return formulaString;
}

/**
 * Set default property values in options object
 * @param {Object} options
 * @return {Object} options
 */

function handleOptions(options = {}) {
  console.log("Options before processing: ", options)
  const propNames = ["phrase", "numStudents", "period"];
  const propValues = ["Esperando a", 28, "segundo (2nd)"];
  //Loop through propNames array
  for(let i = 0; i < propNames.length; i++){
    let name = propNames[i];
    let value = propValues[i]
    //if property in the options obj doesn't exist, set default
    if(!options[name]){
      options[name] = value;
    }
  }

  // console.log("Options after processing:", options)
  return options
}

// function testInsertColumn(){
//   insertCountSubmissionsColumn({numStudents: 27, period: "séptimo periodo"})
// }
