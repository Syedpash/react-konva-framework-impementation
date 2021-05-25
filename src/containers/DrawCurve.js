import React, { useState, useEffect,useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer, Shape, Line } from 'react-konva';
let initialPoints = {
    x1: 0,
    y1: 0,
    cp1x: 0,
    cp1y: 0,
    cp2x: 0,
    cp2y:0,
    x2:0,
    y2:0
};
const DrawCurve = () => {
    // const [points, setPoints] = useState(initialPoints);
    const [bezier, setBezier] = useState({
        start: [0, 0],
        control1: [0, 0],
        control2: [0, 0],
        end: [0, 0],
      });
      const [linePoints, setLinePoints] = useState([0,0]);
      const [draw, setDraw] = useState(true)
      const layerRef = useRef();
   


    const mouseDownOnStage = (e) => {
        //setDraw(true);
        let pos = e.target.getStage().getPointerPosition();
        setBezier({
            ...bezier,
            start: [ pos.x, pos.y],
            end: [ pos.x, pos.y],
            control1: [pos.x, pos.y],
            control2: [pos.x, pos.y]
        });
    }


    const mouseMoveOnStage = (e) => {
        if(draw) {
            let pos = e.target.getStage().getPointerPosition();
            setBezier({
                ...bezier,
                end: [pos.x, pos.y],
                control1: [pos.x, pos.y],
                control2: [pos.x, pos.y]
            });
            console.log(bezier);
        }
    }

    const mouseUpOnStage = (e) => {
        setDraw(false);
        //updateDottedLines();
    }
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}
        onMouseDown={mouseDownOnStage}
        onMouseMove = {mouseMoveOnStage}
        onMouseUp={mouseUpOnStage}
      >
        <Layer ref={layerRef}>
          <Shape
          
            
            stroke="black"
            strokeWidth={4}
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                ctx.moveTo(bezier.start[0], bezier.start[1]);
                ctx.bezierCurveTo(
                  bezier.control1[0],
                  bezier.control1[1],
                  bezier.control2[0],
                  bezier.control2[1],
                  bezier.end[0],
                  bezier.end[1]
                );
                ctx.fillStrokeShape(shape);
            }
        }
          />
          <Line 
             dash= {[10, 10, 0, 10]}
             strokeWidth= {3}
             stroke= 'black'
             lineCap= 'round'
             id= 'bezierLinePath'
             opacity= {0.3}
             points= {[...linePoints]}
          />
        </Layer>
      </Stage>
    );
}
export default DrawCurve;
