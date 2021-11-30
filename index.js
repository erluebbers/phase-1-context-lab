/* Your Code Here */

function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
    let employeeRecord = {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    }
    return employeeRecord
  }
  
  
  function createEmployeeRecords (array) {  
    let employeeRecords = []
    array.forEach(employee => {
      employeeRecords.push(createEmployeeRecord(employee))
    })
    return employeeRecords
  }

  function createTimeInEvent (date) {
    let timeIn = {
      type: "TimeIn",
      hour: parseInt(date.slice(11)),
      date: date.slice(0, 10)
    }
    this.timeInEvents.push(timeIn)
    return this
  }

  createTimeInEvent.call(employeeRecord, date)

  function createTimeOutEvent (date) {
    let timeOut = {
      type: "TimeOut",
      hour: parseInt(date.slice(11)),
      date: date.slice(0, 10)
    }
    this.timeOutEvents.push(timeOut)
    return this
  }

  createTimeOutEvent.call(employeeRecord, date)

  
  function hoursWorkedOnDate (date) {
    let start
    let end
    for (const obj of this.timeInEvents) {
      if (obj.date === date) {
        start = obj.hour
      }
    }
    for (const obj of this.timeOutEvents) {
      if (obj.date === date) {
        end = obj.hour
      }
    }
    return (end - start)/100
  }

  hoursWorkedOnDate.call(employeeRecord, date)
  
  function wagesEarnedOnDate (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
  }

  wagesEarnedOnDate.call(employeeRecord, date)

  function allWagesFor () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
  }

  allWagesFor.call(employeeRecord)

  function findEmployeeByFirstName (array, nameString) {
    array.forEach(employee => {
        if(employee.firstName === nameString) {
            return employee
        }
    })
  }

  function calculatePayroll (array) {
    return array.reduce((runningTotal, employeeRecord) => {
      return runningTotal + allWagesFor(employeeRecord)
    }, 0)
  }

  calculatePayroll.call(employeeRecords)


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }