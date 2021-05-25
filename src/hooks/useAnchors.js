import {Circle} from 'react-konva';
import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import  actions from '../actions/Actions';
import Konva from 'konva'
const useAnchors = (globeId, layerRef)  => {
    
    const dispatch = useDispatch();
    const [anchor, setAnchor] = useState([]);
    const shapeLength = useSelector(state => state.tab.shapeLength);
    const curves = useSelector(state => state.tab.shapes[shapeLength].curves);

    useEffect (() => {
      if(curves.length > 0) {
        let cccc= layerRef.current.find(".curves");
       cccc.stroke("black");
       cccc[cccc.length - 1].stroke('blue');
       let circles = layerRef.current.find('.anchors');
       circles.destroy();
       let {cx1,cy1,cx2,cy2} = curves[curves.length - 1];
     setAnchor([ {
       x: cx1,
       y: cy1,
       id: 0
     }, {
       x: cx2,
       y:cy2,
       id:1
     }
    ])
        
      } 
  },[curves.length]);


        anchor.map(aa => 
        
  () =>{
    var anchor = new Konva.Circle({
      x: aa.x,
      y: aa.y,
      id: aa.id,
      radius: 3,
      stroke: '#666',
      fill: '#ddd',
      name: 'anchors',
      strokeWidth: 2,
      draggable: true,
    });
    layerRef.current.add(anchor);

    // add hover styling
    anchor.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
      this.strokeWidth(4);
      layerRef.current.draw();
    });
    anchor.on('mouseout', function () {
      document.body.style.cursor = 'default';
      this.strokeWidth(2);
      layerRef.current.draw();
    });

    anchor.on('dragmove', dragAnchor);

    return anchor;
  }  
 
      )
  
      const dragAnchor = (e) => {
        let x = e.target.x();
        let y = e.target.y();
        let id = e.target.id();
        dispatch(actions.updateCurve(x,y,id, globeId));
        //updateDottedLines();
        e.cancelBubble = true;
        //console.log(anchorLines)
    
  } 
      
  }
//   if(layerRef){ 
//    console.log(x, y, num,globeId,layerRef)
//     var anchor = new Konva.Circle({
//       x: x,
//       y: y,
//       id: num,
//       radius: 3,
//       stroke: '#666',
//       fill: '#ddd',
//       name: 'anchors',
//       strokeWidth: 2,
//       draggable: true,
//     });
//     layerRef.current.add(anchor);

//     // add hover styling
//     anchor.on('mouseover', function () {
//       document.body.style.cursor = 'pointer';
//       this.strokeWidth(4);
//       layerRef.current.draw();
//     });
//     anchor.on('mouseout', function () {
//       document.body.style.cursor = 'default';
//       this.strokeWidth(2);
//       layerRef.current.draw();
//     });

//     anchor.on('dragmove', function (e) {
//       let x = e.target.x();
//       let y = e.target.y();
//       let id = e.target.id();
//       dispatch(actions.updateCurve(x,y,id, globeId));
//       //updateDottedLines();
//       e.cancelBubble = true;
//     });
// }
//   }  
  export default useAnchors;