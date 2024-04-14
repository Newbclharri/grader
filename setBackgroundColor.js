
/**
 * sets background color for each student form submission
 * after manual execution
 * that doesn't adequatley address short answer questions
 * @param {Number} threshold - minimun string length before background color is set
 * @param {Number} max - max number of allowed bad responses
 */
function setBackgroundColor(sheet, threshold = 10, max = 0, checkMC = true) {
  //check if the sheet object is a form submission sheet
  if(isCampanita(sheet)){
    const sh = typeof sheet === "object" ? sheet : SpreadsheetApp.getActiveSheet();
    const numRowsHeader = 1;
    const rowStart = numRowsHeader + 1;
    const colStart = getEmailColumnNumber();
    const numRows = sh.getLastRow() - numRowsHeader;
    const numCols = sh.getLastColumn();
    const rangeHeader = sh.getRange(1,colStart,1,numCols);
    const questions = rangeHeader.getValues()[0];
    let answers;
    if(checkMC){
      answers = sh.getRange(getAnswerKeyRow(sh,"calviharris@dallasisd.org"),colStart,1,numCols)
              .getValues()[0];
    }
    const range = sh.getRange(rowStart, colStart, numRows, numCols);
    const allResponses = range.getValues();
    //error handling attempt to ensure threshold value is a number
    threshold = typeof sheet === "number" ? sheet : threshold
    const fontSize  = 12, fontColor = "white", fontWeight = "bold";

    //Iterate over submission responses
    allResponses.forEach((student, row) =>{
      let countBadResponses = 0;
      student.forEach((response, column)=>{
        const question = questions[column];
        if(checkMC){
          if(isMultipleChoice(question)){
            if(response !== answers[column]){
              // sh.getRange(row + rowStart, column + colStart,1,numCols)
              //   .clearFormat();
              //flag response by setting background color of targeted cell
              sh.getRange(row + rowStart, column + colStart,1,1)
                .setBackground("red")
                .setFontColor(fontColor)
                .setFontWeight(fontWeight)
              countBadResponses++;
            }else if(response === answers[column]){
              sh.getRange(row + rowStart, column + colStart)
                .clearFormat();
            }    
          }          
        }
        //check if the string value is a short answer question
        if(isShortAnswer(question)){       
          if(!(response) || response.length < threshold){
            countBadResponses ++;
              // sh.getRange(row + rowStart, column + colStart,1,numCols)
              //   .clearFormat();
            //flag response by setting background color of targeted cell
            sh.getRange(row + rowStart, column + colStart,1,1)
              .setBackground("red")
              .setFontColor(fontColor)
              .setFontWeight(fontWeight)
          } else{
            sh.getRange(row + rowStart, column + colStart,1,1)
              .clearFormat();
          }                    
        }
      })
      //flag email address if too many bad responses
      if(countBadResponses > max){
        sh.getRange(row + rowStart, colStart)
              .setBackground("red")
              .setFontSize(fontSize)
              .setFontColor(fontColor)
              .setFontWeight(fontWeight)        
      }else{
        sh.getRange(row + rowStart, colStart)
          .clearFormat();
      }
    })

  }
}

function run(){
  setBackgroundColor(7);
}