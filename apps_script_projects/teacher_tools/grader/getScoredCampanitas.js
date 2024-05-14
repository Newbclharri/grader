/**
 * Does not score for accuracy.  Scores for complettion 
 * and adds each form submission as property with a Number score value to each student ID property
 * in the scoredSectionData object
 * @param {number} classPeriod - the class period to score
 * @param {Object} settings - settings object contains configurations for section, threshold, and max
 * @return {Object} scoredSectionData
 */

function getScoredCampanitas(settings = {}) {
  const ss = SpreadsheetApp.getActive();
  settings.section = settings.section || null;
  settings.period = settings.period || null;
  settings.threshold = settings.threshold || 7;
  settings.max = settings.max || 0;
  const {section, period, threshold, max} = settings;
  const scoredSectionData = period ? getStudentDataByPeriod(period) : getSectionStudentData(section);
  const sheets = ss.getSheets();
  //rename response forms before processing student data
  //to ensure all form response sheets are dated
  renameResponseSheets();   //may want to find better position for this function

  sheets.forEach(sheet =>{    
    let countShortAnswer = 0;
    if(isCampanita(sheet)){
      const sh = sheet;
      const campanita = sh.getName();
      const numRowsHeader = 1;
      const rowStart = numRowsHeader + 1;
      const colStart = getTimestampColumn(sheet);
      const numRows = sh.getLastRow() - numRowsHeader;
      const numCols = sh.getLastColumn();
      const rangeHeader = sh.getRange(1,colStart,1,numCols);
      const range = sh.getRange(rowStart, colStart, numRows, numCols);
      const questions = rangeHeader.getValues()[0];
      const allResponses = range.getValues();
      sortColumns(campanita, [2])
      questions.forEach(question =>{
        if(isShortAnswer(question))countShortAnswer++;

      })
      //from each sheet, iterate the process over data in form responses
      allResponses.forEach((student, row) =>{
        let iD;
        let currentStudent;
        let countBadResponses = 0;
        //process each student response from the form response sheet
        student.forEach((response, column)=>{
          //get id number from student email
          if(questions[column] === "Email Address"){
            if(isStuEmail(response))iD = getEmailPrefix(response);
            currentStudent = scoredSectionData[iD];
          }
          //if student data exists in object
          if(currentStudent){
            const question = questions[column];
            currentStudent[campanita] = {}
            currentStudent[campanita].score = null;
            //if no short answer questions available, assign grade of 100
            if(countShortAnswer < 1){
              currentStudent[campanita].score = 100
            //if the question is a short answer question, qualify response based on length of answer
            }else if(isShortAnswer(question)){
              if(!response || response.length < threshold){
                //length of response < than allowable, mark as a bad response
                countBadResponses ++;                
              }              
            }
            //bad reponses greater than allowed will result in a 0 score
            if(countBadResponses > max){
              currentStudent[campanita].score = 0;                                   
            }else{
              currentStudent[campanita].score = 100;
            }
          }
        })               
      })    
    }    
  }) 

  //calculate average for students in scoredScectionData
  //1 get a list of each response form name
  const campanitas = getResponseSheetNames();
  //console.log(campanitas)
  //2 sum scores of each student campanita score and divide by total number of campanitas
  for(iD in scoredSectionData){
    let student = scoredSectionData[iD];
    let score = 0, count = 0
    for(campanita of campanitas){
      if(student[campanita]){
        score += student[campanita].score;
        count ++;
      //assign null value to incomplete form responses
      }else{
        student[campanita] = {};
        student[campanita].score = null;
      }
    }
    //console.log(student.name, " ",score/campanitas.length, " count: ", count)
    student.average = score/campanitas.length
  }
  //console.log(scoredSectionData)
  return scoredSectionData;
}

function testFn1(){
  console.log(getScoredCampanitas({section: "A"}))
}