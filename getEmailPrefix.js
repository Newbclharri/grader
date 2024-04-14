/**
 * Returns the username of an email address
 * @param {String} email
 * @return {String} prefix
 */
function getEmailPrefix(email) {
  const symbolPosition = email.indexOf("@");
  //process string to retrieve email username
  let prefix = email.slice(0, symbolPosition);
  return prefix;
  }
