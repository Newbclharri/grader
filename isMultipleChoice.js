/**
 * checks if passed argument string is a multiple choice question
 * @param {String} string
 * @return {Boolean}
 */

function isMultipleChoice(string){
  if(typeof string === "string"){
    const words = string.split(" ")
    for(let i = 0; i < words.length; i++){
    let firstSegment = words[i].toLowerCase();
      if(firstSegment === "multiple"){
        //next line character of a string is "\n" import for identifying string contents    
        let nextSegment = words[i+1].split("\n") 
        nextSegment = nextSegment[0].toLowerCase();
        if(nextSegment === "choice:" || nextSegment === "choice"){
          return true;
        }      
      }
    }
  }
  
  
  return false;
}