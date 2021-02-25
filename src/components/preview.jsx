import React from 'react'
import '../App.css'

function Preview(props) {
    return (
        <div>
            <img className="preview-image" alt="preview" src={props.data.avatar_url}></img>
        </div>
    )
}
export default Preview