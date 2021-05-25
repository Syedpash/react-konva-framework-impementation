import React from 'react'
import './tabbar.css';
export default function Add(props) {
    let {addNewTab} = props;
    return (
        <div>
            <i className='fas fa-plus' 
            onClick={addNewTab}></i>
        </div>
    )
}
