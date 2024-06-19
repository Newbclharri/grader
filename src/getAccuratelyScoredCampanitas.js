/**
 * Scores for accuracy and adds each form submission as property with a Number score value to each student ID property
 * in the preStudentData object
 * @param {Object} settings - settings object contains configurations 
 * for section, threshold, max, valueMC, valueSA
 * @return {Object} preStudentData
 */

function getAccuratelyScoredCampanitas(settings = {}) {
  const ss = SpreadsheetApp.getActive();
  settings.section = settings.section || null;
  console.log("Section from getAccuratelyScoredCampanitas: ",settings, settings.section);
  settings.period = settings.period || null;
  settings.threshold = settings.threshold || 7;
  settings.max = settings.max || 0;
  settings.valueMC = settings.valueMC || 20;
  settings.valueSA = settings.valueSA || 10;
  const {section, period, threshold, max, valueMC, valueSA} = settings

  renameResponseSheets();   //may want to find better position for this function
  const responseFormNames = getResponseSheetNames();
  const preStudentData = Number.isInteger(period) ? 
    getStudentDataByPeriod(period) : getSectionStudentData(section);
  const processedStudentData = {};
  const sheets = ss.getSheets();
  let emails;
 responseFormNames.forEach(formName =>{
  for(let id in preStudentData){
    preStudentData[id][formName] = {
      submitted: "",
      onTime: null,
      count: 0,
      score: null
      }
    processedStudentData[id] = preStudentData[id];
  }

 })
 

  sheets.forEach(sheet =>{
    if(isCampanita(sheet)){
      const sh = sheet;
      const campanita = sh.getName();
      const numRowsHeader = 1;
      const rowStart = numRowsHeader + 1;
      const timestampColumn = getTimestampColumn(sheet)
      const colStart = timestampColumn;
      const numRows = sh.getLastRow() - numRowsHeader;
      const numCols = sh.getLastColumn();
      const rangeHeader = sh.getRange(1,colStart,1,numCols);
      const range = sh.getRange(rowStart, colStart, numRows, numCols);
      const questions = rangeHeader.getValues()[0];
      const answers = sh.getRange(getAnswerKeyRow(sheet, "calviharris@dallasisd.org"), colStart, 1, numCols)
        .getValues()[0];
      const allResponses = range.getValues();

      sortColumns(campanita, [timestampColumn]);

      //from each sheet, iterate the process over data in form responses
      allResponses.forEach((student, row) =>{
        //timestamp cell is first array element
        const date = student[0];
        const submitted = formatDate(date);
        //compare date of submission to due date (name of form response sheet)
        const onTime = new Date(submitted) <= new Date(campanita)
        let iD;
        let currentStudent;
        let totalPoints = 0, score = 0, countMC = 0, countSA = 0;
        //process each student response from the form response sheet
        student.forEach((response, column)=>{
          if(questions[column] === "Email Address"){
            if(isStuEmail(response)){
              iD = getEmailPrefix(response);
            }
            currentStudent = processedStudentData[iD];
          }
          if(currentStudent){
            const question = questions[column];
            currentStudent[campanita].submitted = submitted;
            currentStudent[campanita].onTime = onTime; 
                       
            if(isMultipleChoice(question) && response != ""){
              totalPoints += valueMC;
              if(response === answers[column]){
                score += valueMC
              }    
            }
            if(isShortAnswer(question)){
              totalPoints += valueSA
              if(response && response.length >= threshold){
                score += valueSA;                
              }              
            }
            if(totalPoints){
              currentStudent[campanita].score = Math.round((score / totalPoints) * 100);
            }else{
              currentStudent[campanita].score = 100;
            }
          }
        })
      })    
    }    
  })

  //calculate average form response score for each student
  //1 get a list of all form response sheets in the active Spreadsheet
  const campanitas = getResponseSheetNames();
  for(iD in processedStudentData){
    let student = processedStudentData[iD];
    let score = 0; 
    for(let campanita of campanitas){
      if(student[campanita]){
        score += student[campanita].score
      //assign null value to student data with missing form response sheets
      }else{
        student[campanita] = {};
        student[campanita].score = null;
      }
    }
    student.average = Math.round(score / campanitas.length)
  }


  
    responseFormNames.forEach(formName =>{
      console.log(typeof ss.getSheetByName(formName))
      console.log(typeof ss.getSheetByName("Mar/04/2024"))
      console.log(formName)
      const formResponseSheet = ss.getSheetByName(formName);
      const emailColumn = getColumnNumber(formName,"Email Address");
      const numRowsHeader = 1
      const rowStart = 1 + numRowsHeader;
      const numRows = formResponseSheet.getLastRow() - numRowsHeader;
      emails = formResponseSheet
        .getRange(rowStart,emailColumn,numRows)
        .getValues();
      emails.forEach(email =>{
        //send email string
        const emailString = email[0]
        if(isStuEmail(emailString)){
          const studentId = getEmailPrefix(emailString);
          if(processedStudentData[studentId]) processedStudentData[studentId][formName].count++; 
        }
      })    
    })
  

  return processedStudentData;
}

function testGetScoredData(){
  const data = getAccuratelyScoredCampanitas({period: "C"})
  const property = "Mar/06/2024";
  console.log("Scored Data: ", data);
  // for(let key in data){

  //   if(data[key][property]) console.log(property, ": ",data[key][property])
  // }
}