import React from 'react';

const DataGrid = (props) => {
    return (
        <div>

            <div className="output">
                <div className="grid-column">Employee 1 ID</div>
                <div className="grid-column">Employee 2 ID</div>
                <div className="grid-column">Project ID</div>
                <div className="grid-column">Days worked</div>
                <div className='grip-data-column'> {props.resultData.emplID1}</div>
                <div className='grip-data-column'> {props.resultData.emplID2}</div>
                <div className='grip-data-column'> {props.resultData.projectID}</div>
                <div className='grip-data-column'> {props.resultData.daysWorked}</div>
            </div>
        </div>
    )
}

export default DataGrid;