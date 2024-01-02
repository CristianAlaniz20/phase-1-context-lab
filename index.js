/* Your Code Here */

//takes an array and creates an employee record obj
function createEmployeeRecord(array) { 
    
    const obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    debugger
    return obj
}

 //creates multiple employee records from an Array of Arrays
function createEmployeeRecords(arrayOfArrays) { 
    let employeeRecords = [];

    arrayOfArrays.forEach(element => {
        employeeRecords.push(createEmployeeRecord(element))
    })
    
    return employeeRecords
}

//creates values for hour and date keys of createTimeInEvent/createTimeOutInEvent obj's
function createTimeObjectVariables(dateAndTime) { 
    const dateStampArray = dateAndTime.split(" ");
    const dateVariable = dateStampArray[0];
    const hourVariable = parseInt(dateStampArray[1]);
    debugger
    return { hourVariable, dateVariable };
}

//creates obj for when an employee punches in 
function createTimeInEvent(dateStamp) { 
    const { hourVariable, dateVariable } = createTimeObjectVariables(dateStamp)
    
    const timeInObj = {
        type: "TimeIn",
        hour: hourVariable,
        date: dateVariable,
    }
    debugger
    this.timeInEvents.push(timeInObj)
    return this
}
//creates obj for when an employee punches out
function createTimeOutEvent(dateStamp) { 
    const { hourVariable, dateVariable } = createTimeObjectVariables(dateStamp)
    
    const timeOutObj = {
        type: "TimeOut",
        hour: hourVariable,
        date: dateVariable,
    }
    debugger
    this.timeOutEvents.push(timeOutObj)
    return this
}

//takes elapsed time from hoursWorkedOnDate and takes away the 0's
function elapsedTimeToHoursWorked(number) {
    const elapsedTimeToString = number.toString();
    const hoursWorkedString = elapsedTimeToString.split("").slice(0, -2).join("");
    const hoursWorked = parseInt(hoursWorkedString);
    return hoursWorked
}

//matches timeInEvent and timeOutEvent objs with a date and returns hours worked on that date
function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    debugger
    if (timeInEvent && timeOutEvent) {
        const elapsedTime = timeOutEvent.hour - timeInEvent.hour;
        const hoursWorked = elapsedTimeToHoursWorked(elapsedTime)
        return hoursWorked;
    } else {
        return "Sorry, no time in and/or time out events found for the provided date.";
    }
}
//checks hours worked on x day, and multiplies those hours by the pay rate 
function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    const wage = hoursWorked * this.payPerHour;
    //console.log(wage)
    debugger
    return wage
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 //returns the total wage for one employee 
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    debugger
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    debugger
    return payable
}

//iterates over passed in array, searches for obj with matching "firstName" field as name. 
function findEmployeeByFirstName(arrayOfObjs, name) {
    const wantedRecord = arrayOfObjs.find(element => element.firstName === name)    
    debugger
    return wantedRecord
}

//calculates payroll for all employee records
function calculatePayroll(arrayOfObjs) {
    const totalPayroll = arrayOfObjs.reduce((accumulator, element) => {
        return accumulator + allWagesFor.call(element);   
    }, 0)
    debugger
    return totalPayroll
}

