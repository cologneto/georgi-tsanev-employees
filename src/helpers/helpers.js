import RowData from './../models/rowData'
import ResultData from './../models/resultData'

const separatorDash = "-"
const separatorSlash = "/"
const dateFormat1 = "dd-mm-yyyy"
const dateFormat2 = "mm/dd/yyyy"
const nullStr = "NULL"
const dateFromStr = 'dateFrom'

// convert milliseconds to days
const millisToDays = (millis) => {
    return (millis / (60*60*24*1000)).toFixed();
}

// create a result row
const daysTogether = (rowX, rowY) => {
    const startX = rowX.dateFrom
    const startY = rowY.dateFrom
    const endX = rowX.dateTo
    const endY = rowY.dateTo
    const emplXID = rowX.empID
    const emplYID = rowY.empID
    const projID = rowX.projectID
    let startDate;
    let endDate;

    if(startX <= startY) {
        startDate = startY
    } else {
        startDate = startX
    }

    if(endX <= endY) {
        endDate = endX
    } else {
        endDate = endY
    }

    return new ResultData(emplXID, emplYID, projID, millisToDays(endDate - startDate))
}

const nullToTodayDate = (separator) => {
    const today = new Date()
    const yyyy = today.getFullYear()
    let dd = today.getDate()
    let mm = today.getMonth() + 1

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if(separator === "-") {
        return dd + separator + mm + separator + yyyy;
    } else {
        return mm + separator + dd + separator + yyyy
    }
}

//converting string to date with given format
const stringToDate = (date, format, delimiter) => {
    const formatLowerCase = format.toLowerCase()
    const formatItems = formatLowerCase.split(delimiter)
    const dateItems = date.split(delimiter)
    const monthIndex = formatItems.indexOf("mm")
    const dayIndex = formatItems.indexOf("dd")
    const yearIndex = formatItems.indexOf("yyyy")
    let month = parseInt(dateItems[monthIndex])

    month -= 1;

    return new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
}

// sorting array by given property
const dynamicSort = (property) => {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a,b) => {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// creates an array for each project in the text file
const makeArraysForEachProject = (dataTable) => {
    // pop the last element, because of the empty last row in the generated file

    if(dataTable[dataTable.length - 1].dateFrom === undefined){
        dataTable.pop()
    }

    dataTable.forEach((v) => {
        let separator;

        if(v.dateFrom.indexOf(separatorDash) === -1) {
            separator = separatorSlash
        } else {
            separator = separatorDash
        }

        if(v.dateTo.toUpperCase() === nullStr) {
            v.dateTo = nullToTodayDate(separator)
        }

        if(separator === separatorDash) {
            v.dateTo   = new Date(stringToDate(v.dateTo,dateFormat1, separatorDash))
            v.dateFrom = new Date(stringToDate(v.dateFrom,dateFormat1, separatorDash))
        } else {
            v.dateFrom = new Date(stringToDate(v.dateFrom,dateFormat2, separatorSlash))
            v.dateTo   = new Date(stringToDate(v.dateTo,dateFormat2, separatorSlash))
        }
    })
    const projectIDArr = dataTable.map((v) => v.projectID)
    const unique = [... new Set(projectIDArr)]

    // sorting the table by date
    dataTable.sort(dynamicSort(dateFromStr))
    let arrOfArr = []
    unique.forEach((el) => {
        arrOfArr.push(dataTable.filter((v) => v.projectID === el))
    })

    return arrOfArr
}

// creates array from file
const makeArrayFromLines = (lines) => {
    const dataTable = lines.map((l) => {
        const line = l.split(', ')

        return new RowData(line[0], line[1], line[2], line[3])
    })

    return makeArraysForEachProject(dataTable, 'projectID')
}

const createResultArray = (lines) => {
    let arr = makeArrayFromLines(lines)
    let resultArr = [];

    arr.forEach((a) => {
        a.forEach((el, i) => {
            if(i < a.length - 1){
                resultArr[resultArr.length] = daysTogether(el, a[i + 1])
            }
        })
    })

    return resultArr
}

export default {
    dynamicSort: dynamicSort,
    createResultArray: createResultArray,
}