import React from 'react';
import {Shape } from 'react-konva';

const Curve = ({curve, clickedOnCurve}) => {
   
    return(
        <Shape
        name="curves"
        id= {curve.id}
        stroke= 'blue'
        strokeWidth= {3}
        sceneFunc={ (ctx, shape1) => {
          ctx.beginPath();
          ctx.moveTo(curve.x1, curve.y1);
          ctx.bezierCurveTo(
            curve.cx1,
            curve.cy1,
            curve.cx2,
            curve.cy2,
            curve.x2,
            curve.y2
          );
          ctx.fillStrokeShape(shape1);
        }}
        onClick={clickedOnCurve}
      />
    )
}

export default Curve;