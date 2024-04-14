/**
 * Returns data for students from a specific section
 * first case = A day Spanish II student data = 2, 3, 4 periods
 * second case = B day Spanish II student data = 6 period
 * third case = B day Spanish III student data = 7, 8 periods
 * @param {string}
 * @param {number}
 * @return {object} sectionData
 */
function getSectionStudentData(string) {
  const allStudentData = ImportExportIDNumbers.getAllStudentData();
  let pA, pB, pC;
  let sectionData = {}
  switch(string){
    case "A":
      pA = 2; pB = 3; pC = 4;
      for(iD in allStudentData){
        let student = allStudentData[iD]
        if(student.period ===  pA || student.period === pB || student.period === pC){
          sectionData[iD] = student
        }
      }
      break;
    case "B":
      pA = 6;
      for(iD in allStudentData){
        let student = allStudentData[iD]
        if(student.period ===  pA){
          sectionData[iD] = student;
        }
      }
      break;
      case "C":
        pA = 7; pB = 8
        for(iD in allStudentData){
        let student = allStudentData[iD]
        if(student.period ===  pA || student.period === pB){
          sectionData[iD] = student;
        }
      }
        break;
      default:
        sectionData = allStudentData;
  }
  //console.log(studentsADay)
  return sectionData;
}

function runGetSection(){
  console.log(getSectionStudentData("A"));
}