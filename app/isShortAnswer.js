/**
 * checks if passed argument string is a short answer question
 * @param {String}
 * @return {Boolean}
 */

function isShortAnswer(string){
  if(typeof string === "string"){
    const words = string.split(" ")
    for(let i = 0; i < words.length; i++){
    let firstSegment = words[i].toLowerCase();
      if(firstSegment === "short"){
        //next line character of a string is "\n" import for identifying string contents    
        let nextSegment = words[i+1].split("\n") 
        nextSegment = nextSegment[0].toLowerCase();
        if(nextSegment === "answer:" || nextSegment === "answer"){
          return true;
        }      
      }
    }
  }
  
  
  return false;
}