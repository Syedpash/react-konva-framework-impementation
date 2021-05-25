// JavaScript source code
import { useState,useEffect, useRef,  } from 'react';
import { Shape, Circle,Line, Text } from 'react-konva';
import Konva from 'konva';
import {  Group, Rect, Stage,  Layer, Transformer } from 'react-konva';
import  actions from '../actions/Actions';
import { useSelector, useDispatch } from 'react-redux';
import Circles from '../components/circle/Circles';
import Lines from '../components/line/Lines';
import AnchorLine from '../components/line/AnchorLine';
import useEscape from '../hooks/useEscape';
import ControlPoints from '../components/ControlPoints/ControlPoints';
import Curve from '../components/curve/Curve';
import Axios from 'axios';
let currentLineId =0;
let currentShapeId = 0;
let activeCurve = 0;
const Examples = (props) => {
  
    const shapes = useSelector(state => state.tab.shapes);
    const shapeLength = useSelector(state => state.tab.shapeLength);
    const draw = useSelector(state => state.tab.shapes[shapeLength].data.draw);
    const toolKey = useSelector(state => state.tab.toolKey);
    const curves = useSelector(state => state.tab.shapes[currentShapeId].curves);
    const dispatch = useDispatch();
    const layerRef = useRef();
    const anchorLines = useSelector(state => state.tab.anchorLines);

   useEscape();
   
   useEffect(() => {
    const username="admin";
    const password = "MORGAN2D";
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')   
    Axios.get("/users", {
      auth: {
        username: "admin",
        password: "MORGAN2D"
      }
    })
    .then (res => console.log(res.data.results))
      .catch(error => console.log(error))
  },[])

    const handleClickOnStage = (e) => {
      console.log(anchorLines);
       // e.cancelBubble = true;
        if(toolKey == 'PEN') {
            let currentPos = e.target.getStage().getPointerPosition();
            dispatch(actions.createCircles(currentPos));
            dispatch(actions.createLines(currentPos));
        }
        if(toolKey === 'SEL') {
          let circles= layerRef.current.find(".anchor");
          circles.visible(false);
          let anchorLine= layerRef.current.find(".anchorLines");
          anchorLine.visible(false);
          console.log(anchorLines)
          let cccc= layerRef.current.find(".curves");
         cccc.stroke("black");
         let circle = layerRef.current.find('.circle');
         circle.fill('grey');
         //dispatch(actions.deSelect());
         layerRef.current.draw();
          
      }
    }
  
     
    const circleClicked = (e) => {
      //console.log(e);
      e.cancelBubble = true;
      if(toolKey === 'SEL') {
        e.target.fill('blue');
        
      }
         if(toolKey === 'PEN'){
    
            e.target.fill('grey');
            let { x,y} = e.target.attrs;
            let currentPos = {x: x,y: y};
            dispatch(actions.snapToFirst(currentPos));
        }
    }

    const handleMouseMoveOnStage = (e) => {
        e.cancelBubble = true;
        if (toolKey === 'PEN') {  
            if(draw) {
                let pos = e.target.getStage().getPointerPosition();
                dispatch(actions.updateLines(pos));
            }
        }
    }
   //COnvert line to curve
        const lineClicked = (e) => {
          
          if(toolKey === 'SEL') {
            console.log(e.target.points())
            e.cancelBubble = true;
            e.target.opacity(0);
            
            currentLineId = e.target.id();
            currentShapeId = e.target.getParent().id();
            dispatch(actions.lineToCurve(currentLineId, currentShapeId));
            let anchorLine= layerRef.current.find(".anchorLines");
            anchorLine.visible(true);
            let circles= layerRef.current.find(".anchor");
            circles.visible(true);
            // let cccc= layerRef.current.find(".curves");
            // cccc.stroke("black");
            // console.log(cccc)
            // cccc[cccc.length - 1].stroke('blue');
          }
        }
        //curve editing
        const clickedOnCurve = (e) => {
          e.cancelBubble = true;
          let cccc= layerRef.current.find(".curves");
         cccc.stroke("black");
         e.target.stroke('blue');
         let anchorLine= layerRef.current.find(".anchorLines");
          anchorLine.visible(true);
         let circles = layerRef.current.find('.anchor');
         circles.visible(true);
         let id = e.target.id();
         let shapeId = e.target.getParent().id();
        const newCurve = shapes[shapeId].curves.filter(curve => curve.id == id);
        activeCurve = shapes[shapeId].curves.findIndex(curve => curve.id == id);
        currentLineId = id;
        currentShapeId  = e.target.getParent().id();
        const {x1, y1, x2,y2, cx1,cy1,cx2,cy2} = newCurve[0];
        console.log(anchorLine, circles )
        layerRef.current.draw();
        }
        const dragCircle = () =>{

        }
        //Dragging anchors to updte curves
        const dragAnchor = (e) => {
          let x = e.target.x();
          let y = e.target.y();
          let id = e.target.id();
          dispatch(actions.updateCurve(x,y,id, currentLineId, currentShapeId));          
          e.cancelBubble = true;
      }
    return (
        <>
        <div id="container"></div>
            <Stage
                width={window.innerWidth - 50}
                height={window.innerHeight - 50}
                container = 'container'
                onClick={handleClickOnStage}
                onMouseMove={handleMouseMoveOnStage}
                
            >
                <Layer  ref={layerRef}>
                  {shapes.map((shape, i) => (
                    <Group key ={i} id={shape.shapeId}>
                       {
                      shape.lines.map((line, i) => (
                        <Lines
                          line={line}
                          lineClicked={lineClicked}
                        />
                      ))                      
                    }
                    {
                       shape.curves.map((curve, i) => (
                        <Curve 
                        key={i} curve={curve} clickedOnCurve={clickedOnCurve} />
                       ))                      
                     }
                     {
                       anchorLines.map((line, i) => (
                         <>
                         <AnchorLine key ={i} line={line} />
                         <ControlPoints key={i+1} point={line} dragAnchor={dragAnchor}/>
                         </>
                         
                       ))
                     }
                    {shape.circles.map((circle, i) => (
                      <>
                        <Circles
                          key = {i}
                          circle = {circle}
                          circleClicked = {circleClicked}
                          dragCircle = {dragCircle}
                        />
                        <Text
                        key = {i+1}
                          text={circle.name}
                          x={circle.namex}
                          y={circle.namey}
                          name = "text"
                        />
                      </>
                    ))}
                   
                    </Group>
                  ))}
                       
                </Layer>
            </Stage>
           
        </>
    )
}



export default(Examples);