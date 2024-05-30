/**
 * A Google Apps Script simple trigger
 * that initializes the variable declarations
 * and invokes the included functions
 * when a sheet in this Spreadsheet is edited
 */
function onEdit(e) {
  try{
    const sheet = e.source.getActiveSheet();
    const row = e.range.rowStart;
    const column = e.range.columnStart
    checkMultipleChoiceOnEdit(e, sheet, row, column);
    checkShortAnswerOnEdit(e, sheet, row, column);
    checkRowReponses(sheet, row)
  }catch(err){
    console.log("onEdit: ", err)
  }
}

/**
 * checks for an edited cell response.
 * if the edited response is correct
 * flagged formatted is cleared
 * @param {Object} e
 * @param {Object} sheet
 * @param {Number} row
 * @param {Number} column
 */
function checkMultipleChoiceOnEdit(e,sheet, row, column, color = "red"){
  if(isCampanita(sheet)){
    const rowQuestion = 1; //headerRow
    const question = sheet
      .getRange(rowQuestion,column)
      .getValue();
    if(isMultipleChoice(question)){
      const answer = sheet
        .getRange(getAnswerKeyRow("calviharris@dallasisd.org"),column)
        .getValue();
      if(e.range.getValue() === answer){
        sheet.getRange(row,column).clearFormat();
      }
    }    
  }
}

/**
 * checks for an updated, correct short answer resposne
 * if the short answer response meet the criteria
 * flagged formatting for the corresponding cell is removed
 * @param {Object} e
 * @param {Object} sheet
 * @param {Number} row
 * @param {Number} column
 * @ param {Number} threshold
 */
function checkShortAnswerOnEdit(e, sheet, row, column, threshold = 10){
  if(isCampanita(sheet)){
    const rowQuestion = 1; //headerRow
    const question = sheet.getRange(rowQuestion,column)
      .getValue();
    if(isShortAnswer(question)){
      const response = e.range.getValue();
      if(response && response.length >= threshold){
        sheet.getRange(row, column).clearFormat();
      }
    }
  }

}


/**
 * checks edited submission row to verify if all multiple choice
 * and short answer questions meet criteria
 * and removes flagged formatting of the corresponding student email address cell
 * @param {Object} sheet
 * @param {Number} row
 * @param {Number} threshold
 * @param {Number} max
 */
function checkRowReponses(sheet, row, threshold = 7, max = 0){
  const rowQuestions = 1;
  const colStart = 1;
  let countBadResponses = 0;
  const responses = sheet.getRange(row,colStart,1,sheet.getLastColumn())
    .getValues()[0];
  const questions = sheet.getRange(rowQuestions,colStart,1,sheet.getLastColumn())
    .getValues()[0];
  responses.forEach((response,column) =>{
    if(isCampanita(sheet)){
      const question = questions[column]
      if(isMultipleChoice(question)){
        const answers = sheet.getRange(getAnswerKeyRow("calviharris@dallasisd.org"),colStart,1,sheet.getLastColumn())
          .getValues()[0]
        let answer = answers[column]
        if(response !== answer){
          countBadResponses++;
        }    
      }
      if(isShortAnswer(question)){
        if(response && response.length < threshold){
          countBadResponses++;
        }
      }
    }
  })
  if(countBadResponses <= max){
    sheet.getRange(row,3).clearFormat();
  }
}
