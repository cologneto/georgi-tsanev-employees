import React, { Component} from 'react'

const Input = (props) => (
    <input type="file" name="file-input" {...props} />
)

const FileUploader = () => {

    const onChange = (e) => {
        const input = e.target
        const reader = new FileReader();
        reader.onload = function(){
            const text = reader.result;
            const node = document.querySelector('.output');
            node.innerText = text;
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