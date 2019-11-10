import React from 'react'
import Helpers from '../helpers/helpers'
import Input from './input'

const gripDateCssSelector = '.grip-data-column'

const FileUploader = () => {

    const displayResultsDataGrid = (resultArray) => {
        console.log(resultArray)
        const lastRow = resultArray[resultArray.length - 1]
        const nodes = document.querySelectorAll(gripDateCssSelector)

        Object.values(lastRow).forEach(function(v, index) {
            nodes[index].innerHTML = v
        });
    }

    const onChange = (e) => {
        const input = e.target
        const reader = new FileReader()
        reader.onload = function(){
            const text = reader.result
            const lines = text.split(/[\r\n]+/g)
            const resultArray = Helpers.createResultArray(lines);

            resultArray.sort(Helpers.dynamicSort('daysWorked'))
            displayResultsDataGrid(resultArray)

        };
        reader.readAsText(input.files[0])
    }

    return (
        <div className="container">
            <div>
                <div className="output">
                    <div className="grid-column">Employee 1 ID</div>
                    <div className="grid-column">Employee 2 ID</div>
                    <div className="grid-column">Project ID</div>
                    <div className="grid-column">Days worked</div>
                    <div className='grip-data-column'></div>
                    <div className='grip-data-column'></div>
                    <div className='grip-data-column'></div>
                    <div className='grip-data-column'></div>
                </div>
                <Input onChange={onChange} />
            </div>
        </div>
    )
}

export default FileUploader