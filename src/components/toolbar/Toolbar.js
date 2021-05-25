import React from 'react'
import './toolbar.css';
export default function Toolbar(props) {

    const {toolKey, handleToolChange} = props;
    return (
        <div>
             <span 
                className = {toolKey == 'PEN' ? "selected": ''}
                onClick={handleToolChange}
                >
                 P</span>
            <span 
                className = {toolKey == 'SEL' ? "selected": ''}
                onClick={handleToolChange} 
                >
                V</span>
            <span>T</span>
            <span>M</span>
        </div>
    )
}
