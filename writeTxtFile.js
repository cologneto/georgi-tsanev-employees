const fs = require('fs');
const hoursInDay = 24;
const minInHour  = 60;
const secInMin   = 60;
const msInSec    = 1000;
const numberOfEmp = 20;
const numberOfProj = 3;
const zeroString = "0"
const separatorDash = "-"
const separatorSlash = "/"
let fileName = 'employees1.txt'

class RowData {
    constructor(empId, projectId, dateFrom, dateTo) {
        this.empId = empId
        this.projectId = projectId
        this.dateFrom = dateFrom
        this.dateTo = dateTo
    }
}

const returnFormatedDate = (date, dateSeparator) => {
    date = new Date(date)
    const fullYear = date.getFullYear() + ""
    let dayOfMonth = date.getDate() + ""
    let month = date.getMonth() + ""

    if(month.length < 2){
        month = zeroString + month
    }

    if (dayOfMonth.length < 2) {
        dayOfMonth = zeroString + dayOfMonth
    }

    if(dateSeparator === separatorDash) {
        return dayOfMonth + dateSeparator + month + dateSeparator + fullYear
    }

    if(dateSeparator === separatorSlash) {
        return month + dateSeparator + dayOfMonth + dateSeparator + fullYear
    }
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateDates = (daysBack) => {
    const date = new Date();

    return new Date(date.getTime() - (daysBack * hoursInDay * minInHour * secInMin * msInSec)).toLocaleDateString()
}

const generateEmployeesArr = (separator) => {
    let arr = [];

    for (let i = 1; i <= numberOfEmp; i++) {
        const dateFrom = returnFormatedDate(generateDates(getRandomInt(150, 200)), separator)
        const dateTo   = returnFormatedDate(generateDates(getRandomInt(100, 150)), separator)

        arr[arr.length] = new RowData(i, getRandomInt(1, numberOfProj), dateFrom, dateTo)
    }

    return arr
}

const writeToTxtFile = (array) => {
    const file = fs.createWriteStream(fileName)
    file.on('error', function(err) { /* error handling */ })
    array.forEach(function(v) { file.write(v.empId + ', ' + v.projectId + ', ' + v.dateFrom + ', ' + v.dateTo + '\n')})
    file.end();
}

const arr = generateEmployeesArr(separatorDash)
writeToTxtFile(arr)