import React from 'react'
import '../App.css'

function Preview(props) {
    let previewImage = null
    if (props.data.id === props.selectedImage) {
        previewImage = (
            <div>
                <img className="preview-image" alt="preview" src={props.data.avatar_url}></img>
            </div>
        )
    }

    return previewImage


}
export default Preview