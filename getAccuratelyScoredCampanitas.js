/**
 * Scores for accuracy and adds each form submission as property with a Number score value to each student ID property
 * in the scoredSectionData object
 * @param {Object} settings - settings object contains configurations 
 * for section, threshold, max, valueMC, valueSA
 * @return {Object} scoredSectionData
 */

function getAccuratelyScoredCampanitas(settings = {}) {
  const ss = SpreadsheetApp.getActive();
  settings.section = settings.section || null;
  settings.period = settings.period || null;
  settings.threshold = settings.threshold || 7;
  settings.max = settings.max || 0;
  settings.valueMC = settings.valueMC || 20;
  settings.valueSA = settings.valueSA || 10;
  const {section, period, threshold, max, valueMC, valueSA} = settings
  const scoredSectionData = Number.isInteger(period) ? getStudentDataByPeriod(period) : getSectionStudentData(section);
  const sheets = ss.getSheets();
  //rename response forms before processing student data
  //to ensure
  renameResponseSheets();   //may want to find better position for this function

  sheets.forEach(sheet =>{
    if(isCampanita(sheet)){
      const sh = sheet;
      const campanita = sh.getName();
      const numRowsHeader = 1;
      const rowStart = numRowsHeader + 1;
      const colStart = 2;
      const numRows = sh.getLastRow() - numRowsHeader;
      const numCols = sh.getLastColumn();
      const rangeHeader = sh.getRange(1,colStart,1,numCols);
      const range = sh.getRange(rowStart, colStart, numRows, numCols);
      const questions = rangeHeader.getValues()[0];
      const answers = sh.getRange(getAnswerKeyRow(sheet, "calviharris@dallasisd.org"), colStart, 1, numCols)
        .getValues()[0];
      const allResponses = range.getValues();
      sortColumns(campanita, [2])
      //from each sheet, iterate the process over data in form responses
      allResponses.forEach((student, row) =>{
        let iD;
        let currentStudent;
        let countMC = 0, countSA = 0, countDeductMC = 0, countDeductSA = 0;
        let totalPoints = 0, score = 0;
        //process each student response from the form response sheet
        student.forEach((response, column)=>{
          if(questions[column] === "Email Address"){
            if(isStuEmail(response))iD = getEmailPrefix(response);
            currentStudent = scoredSectionData[iD];
          }
          if(currentStudent){
            const question = questions[column];
            if(isMultipleChoice(question)){
              countMC++;
              totalPoints += valueMC;
              if(response === answers[column]){
                score += valueMC
              }    
            }
            if(isShortAnswer(question)){
              countSA++;
              totalPoints += valueSA
              if(response && response.length >= threshold){
                score += valueSA;                
              }              
            }
            if(totalPoints){
              currentStudent[campanita] = Math.round((score / totalPoints) * 100);
            }else{
              currentStudent[campanita] = 100;
            }
          }
        })               
      })    
    }    
  })

  //calculate average form response score for each student
  //1 get a list of all form response sheets in the active Spreadsheet
  const campanitas = getResponseSheetNames();
  for(iD in scoredSectionData){
    let student = scoredSectionData[iD];
    let score = 0; 
    for(let campanita of campanitas){
      if(student[campanita]){
        score += student[campanita]
      //assign null value to student data with missing form response sheets
      }else{
        student[campanita] = null
      }
    }
    student.average = Math.round(score / campanitas.length)
  }

  return scoredSectionData;
}

function testGetScoredData(){
  const data = getAccuratelyScoredCampanitas({period: "A"})
  const property = "Mar/06/2024"
  console.log("Scored Data: ", data);

  // for(let key in data){

  //   if(data[key][property]) console.log(property, ": ",data[key][property])
  // }
}