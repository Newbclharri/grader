/**
 * sets background for each student for submission
 * that doesn't adequatley address short answer questions
 * @param {Number} threshold - min string length before background color is set
 * @param {Number} max - max number of allowed bad responses
 * @param {Number} numRowsHeader - numRowsHeader default = 1;
 */
function setBackgroundColorOnSubmit(threshold = 10, max = 0, numRowsHeader = 1) {
  //check if current sheet is a form submission
  if(isCampanita()){
    if(getAnswerKeyRow()){
      const sh = SpreadsheetApp.getActiveSheet();
      const rowStart = numRowsHeader + 1;
      const colStart = getEmailColumnNumber();
      const lastRow = sh.getLastRow();
      const numCols = sh.getLastColumn();
      const rangeHeader = sh.getRange(1,colStart,1,numCols);
      const questions = rangeHeader.getValues()[0];
      const answers = sh.getRange(getAnswerKeyRow("calviharris@dallasisd.org"),colStart,1,numCols)
        .getValues()[0];
      const range = sh.getRange(lastRow, colStart, 1, numCols)
      const rangeEmail = sh.getRange(lastRow, colStart,1,1);
      const studentResponses = range.getValues();
      const fontSize  = 12, fontColor = "white", fontWeight = "bold";

      //Iterate over all student responses in the form submission sheet
      studentResponses.forEach((response) =>{
        let countBadResponses = 0;
        response.forEach( (value,column) =>{
          const question = questions[column];
          let range = sh.getRange(lastRow, column + colStart)
          //check if the question is a short answer question
          if(isMultipleChoice(question) && value !== ""){
              if(value !== answers[column]){
                // sh.getRange(row + rowStart, column + colStart,1,numCols)
                //   .clearFormat();
                //flag response by setting background color of targeted cell
                range.setBackground("red")
                range.setFontColor(fontColor)
                range.setFontSize(fontSize)
                range.setFontWeight(fontWeight)
                countBadResponses++;
                console.log(countBadResponses)
              }else if(response === answers[column]){
                range.clearFormat();
              }    
            }
          if(isShortAnswer(question)){
            if(value.length < threshold){
              countBadResponses ++;
              sh.getRange(lastRow,colStart,1,numCols)
                .clearFormat();
              range.setBackground("red");
              range.setFontColor(fontColor)
              range.setFontSize(fontSize)
              range.setWeight(fontWeight)
            }else{
              range.clearFormat();
            }
          }
          if(countBadResponses > max){
            console.log(countBadResponses)
            rangeEmail.setBackground("red")
            .setFontColor(fontColor)
            .setFontSize(fontSize)
            .setFontWeight(fontWeight);
          }
        })
      })
    }
  }  
  
}
