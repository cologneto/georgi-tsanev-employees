import React from 'react'

const Input = (props) => (
    <div className="input-container">
        <input type="file" name="file-input" {...props} />
    </div>
)

export default Input