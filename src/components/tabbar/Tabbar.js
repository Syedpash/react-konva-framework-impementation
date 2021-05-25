import React from 'react'
import './tabbar.css'
export default function Tabbar(props) {
    let {tab, deleteATab, clickedOnTab} = props;
    return (
        // <div className = "tabs" id={tab.id} draggable onFocus= {(e) => clickedOnTab(e)}>
        //     <p> {tab.tabName}</p>
        //     <i className='fas fa-times' onClick = {(e) => deleteATab(e, tab.id)}></i>
        // </div>
<ul>
  <li>
    <label  className = "tabs" id={tab.id} draggable onFocus= {(e) => clickedOnTab(e)}>
      <input type="radio" name="a" />
      <a> {tab.tabName}</a>
      <i className='fas fa-times' onClick = {(e) => deleteATab(e, tab.id)}></i>
    </label>
   
  </li>
  </ul>
    )
}
