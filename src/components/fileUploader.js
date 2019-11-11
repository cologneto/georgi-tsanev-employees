import React, { Component } from 'react'
import Helpers from '../helpers/helpers'
import Input from './input'
import DataGrid from "./dataGrid";

const daysWorked = "daysWorked"
const splipRegEx = /[\r\n]+/g
const errorMsg = "Please select .txt file."

class FileUploader extends Component{
    constructor(){
        super();

        this.state = {
            resultData: {}
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        const input = e.target
        const reader = new FileReader()
        const that = this

        reader.onload = function(){
            const text = reader.result
            const lines = text.split(splipRegEx)
            const resultArray = Helpers.createResultArray(lines);

            resultArray.sort(Helpers.dynamicSort(daysWorked))

            that.setState({
                resultData: resultArray[resultArray.length - 1]
            })
        };

        const isTxtFile = Helpers.fileHasExtension(input, [".txt"]);
        if(isTxtFile) {
            reader.readAsText(input.files[0])
        } else {
            alert("Please select .txt file!")
            input.value = ""
        }
    }

    render () {
        return <div className="container">
                    <DataGrid resultData={this.state.resultData}/>
                    <Input onChange={this.onChange} />
                </div>
    }
}

export default FileUploader