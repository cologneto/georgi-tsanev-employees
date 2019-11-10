import React from 'react'

class RowData {
    constructor(empID, projectID, dateFrom, dateTo) {
        this.empID = empID
        this.projectID = projectID
        this.dateFrom = dateFrom
        this.dateTo = dateTo
    }
}

const Input = (props) => (
    <input type="file" name="file-input" {...props} />
)

const FileUploader = () => {

    const isOverlap = (startX, startY) => {
        return startX <= startY
    }

    const millisToDays = (millis) => {
        return (millis / (60*60*24*1000)).toFixed();
    }

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
        }
        if(endX <= endY) {
            endDate = endX
        } else {
            endDate = endY
        }

        return {
            emplID1: emplXID,
            emplID2: emplYID,
            projectID: projID,
            daysWorked: millisToDays(endDate - startDate)
        }

    }

     const stringToDate = (_date,_format,_delimiter) => {
        const formatLowerCase=_format.toLowerCase();
        const formatItems=formatLowerCase.split(_delimiter);
        const dateItems=_date.split(_delimiter);
        const monthIndex=formatItems.indexOf("mm");
        const dayIndex=formatItems.indexOf("dd");
        const yearIndex=formatItems.indexOf("yyyy");
        let month=parseInt(dateItems[monthIndex]);
        month-=1;
        const formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);

        return formatedDate;
    }

     const dynamicSort = (property) => {
        let sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return (a,b) => {
            /* next line works with strings and numbers,
             * and you may want to customize it to your needs
             */
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    const makeArraysForEachProject = (dataTable) => {
        dataTable.pop()
        dataTable.forEach((v) => {
            v.dateFrom = new Date(stringToDate(v.dateFrom,"mm/dd/yyyy", "/"))
            v.dateTo   = new Date(stringToDate(v.dateTo,"mm/dd/yyyy", "/"))
        })
        const projectIDArr = dataTable.map((v) => v.projectID)
        const unique = [... new Set(projectIDArr)];

        // sorting the table by date
        dataTable.sort(dynamicSort('dateFrom'))
        let arrOfArr = []
        unique.forEach((el) => {
            arrOfArr.push(dataTable.filter((v) => v.projectID === el))
            // TODO: Make dynamicSort here by date
        })

        return arrOfArr
    }

    const makeArrayFromLines = (lines) => {
        const dataTable = lines.map((l) => {
            const line = l.split(', ')

            return new RowData(line[0], line[1], line[2], line[3])
        })

        return makeArraysForEachProject(dataTable, 'projectID');
    }

    const onChange = (e) => {
        const input = e.target
        const reader = new FileReader();
        reader.onload = function(){
            const text = reader.result;
            var lines = text.split(/[\r\n]+/g);
            const node = document.querySelector('.output');
            node.innerText = text;
            let arr = makeArrayFromLines(lines)
            var resultArr = [];

            arr.forEach((a) => {
                a.forEach((el, i) => {
                    if(i < a.length - 1){
                        resultArr[resultArr.length] = daysTogether(el, a[i+1])
                    }
                })
            })

            console.log(resultArr.sort(dynamicSort('daysWorked')));
        };
        reader.readAsText(input.files[0]);
    }

    return (
        <div className="container">
            <div>
                <Input onChange={onChange} />
                <button type="submit">Submit</button>
                <div className="output"></div>
            </div>
        </div>
    )
}

export default FileUploader