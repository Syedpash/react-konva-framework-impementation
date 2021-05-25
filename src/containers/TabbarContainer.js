// import React, { useRef, useEffect, useState } from 'react'
// import { connect } from 'react-redux';
// import { addNewTab, deleteATab } from '../actions/Actions';
// import Add from '../components/tabbar/Add';
// import Tabbar from '../components/tabbar/Tabbar';
// import '../components/tabbar/tabbar.css';
// let i =3;
// const TabbarContainer = (props) => {
// const [leftArrow, setLeftArrow] = useState(false);
// const [rightArrow, setRightArrow] = useState(false)

//     const tabref = useRef();
//     let { tabs, addNewTab, deleteATab } = props;

//     const addNewTabFunc = (e) => {
//         if(tabs.length < 10 ) {
//             addNewTab();
//             i++;
//         }
//         else{
//             document.querySelector('.fa-plus').style.display='none';
//         }
//     }
//     const deleteATabFunc = (e, tabId) => {
//         console.log(tabId);
//         deleteATab(tabId);
//     }
//     // useEffect(() => {
//     //     if( (i < 10 || i >= 3) && tabs.length > 3) {
//     //         setLeftArrow(false);
//     //     } 
//     //     if( (i >= 10 || i < 3) && tabs.length > 3) {
//     //         setRightArrow(false);  
//     //     }
//     // },[i])
//     const handleTab= (e, direction) => {
//         if(direction == 'Right') {
//             console.log(tabref.current)
//             tabref.current.scrollLeft +=200;
//             i++;
            
//         } else{            
//             tabref.current.scrollLeft -=200;
//             i--;
            
//         }
//     }
//     const clickedOnTab = (e) => {
//         console.log(tabref)
//         let tabs= document.querySelectorAll(".tabs");
//         for(let i = 0; i< tabs.length; i++){
//             console.log(tabs[i])
//         }
//         e.target.className += " activeTab";
//     }
//     return (
//         <div className="tabbar">
//             <button className="previous-button" disabled={leftArrow} onClick={(e) => handleTab(e, 'Left')}>&#8249;</button>
//             <div className="tab-container" ref={tabref}>
//         {
//             tabs.map((tab) => 
//                 <Tabbar tab = {tab} deleteATab={deleteATabFunc} clickedOnTab={clickedOnTab}/>
//             )
//         }
        
//         </div>
//         <button className="next-button" disabled={rightArrow} onClick={(e) => handleTab(e, 'Right')}>&#8250;</button>        
//             <Add addNewTab={addNewTabFunc}/>
//         </div>
//     )
// }
// const mapStateToProps = (state) => {
    
//     return {
//         tabs: state.tabs
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addNewTab: () => dispatch(addNewTab()),
//         deleteATab: (tabId) => dispatch(deleteATab(tabId))
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(TabbarContainer)
