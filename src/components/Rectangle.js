import React,{useRef} from 'react';
import {Rect, Circle, Line} from 'react-konva';

const Rectangle = ({ circle, circleClicked, shapeProps, onSelect, onChange }) => {
  const shapeRef = useRef();

  return (
    <Line
      onClick={() => onSelect(shapeRef)}
      onTap={() => onSelect(shapeRef)}
      // ref={shapeRef.current[getKey]}
      ref={shapeRef}
      points={[circle.x1, circle.y1, circle.x2, circle.y2]}
                stroke='black'
                lineCap='round'
                lineJoin='round'
                strokeWidth={1}
      name="rectangle"
      draggable
      // onClick = {circleClicked}
      onDragEnd={(e) => {
        onChange({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onTransform={(e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = shapeRef.current;
        console.log(node.points());
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        
        // we will reset it back
        // node.scaleX(1);
        // node.scaleY(1);
        let x2 = circle.x2 + Math.round(Math.abs(node.x()));
        let y2 = circle.y2 + Math.round(Math.abs(node.y()));
        onChange({
          id: circle.id,
          x1: circle.x1,
          y1:circle.y1,
          x2: circle.x2,
          y2: circle.y2,
          // set minimal value
        });
      }}
    />
  );
};
export default Rectangle;