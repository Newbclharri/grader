/**
 * returns the date for the specified day of the current week
 * @param {number} day - day default is a number representing the day of the week
 * between 0 and 6 where 0 is sunday and 6 is saturday
 * @param {string}
 * @return {string} formattedDate
 */
function getDateforDayOfTheCurrentWeek(day = new Date().getDay()) {
  const weekdays = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const MILLI_SECS_IN_A_DAY = 24 * 60 * 60 * 1000;
  const timeZone = "CST";
  let date = new Date();

  try{
    const dayNumber = typeof day === "number" ? day : weekdays.indexOf(day.toLowerCase())
    const numDaysDifference = Math.abs(date.getDay() - dayNumber)

    //get date of the current week for specifed day parameter
    //the target date of the week is the difference between today and the specified day
    let targetDate = date;

    //specifed day is in the future
    if(dayNumber > date.getDay()){
      targetDate = new Date(date.getTime() + (numDaysDifference * MILLI_SECS_IN_A_DAY))

    //specified day is current day or in the past
    }else{
      targetDate = new Date(date.getTime() - (numDaysDifference * MILLI_SECS_IN_A_DAY))
    }
    //formate the date to string using 3 letter month abbreviation two digit day
    //and four digit year
    const formattedDate = Utilities.formatDate(targetDate,timeZone,'MMM. dd, yyyy');
    console.log(formattedDate)
    return formattedDate

  }catch(err){
    console.log(err)
  }

}
