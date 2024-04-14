/**
 * checks if the passed argument string is a student email
 * @param {String}
 * @return {Boolean}
 */
function isStuEmail(string){
  
  if(typeof string === "string"){
    if(string.includes("@")){
      const index = string.indexOf("@");
      const domain = string.substring(index + 1)
      const target = "dallasisd.org"
      if(domain === target){
        string = getEmailPrefix(string)
        if(Number.isInteger(parseInt(string))) return true
      }
    }
  }
  return false;
}

