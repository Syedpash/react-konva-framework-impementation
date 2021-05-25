import React from 'react';
import { Circle } from 'react-konva';
const ControlPoints = ({point, dragAnchor}) => {
    
    return (
        <>
            <Circle
                x= {point.x2}
                y={point.y2}
                id={point.id}
                radius={3}
                stroke="#666"
                fill="#ddd"
                name="anchor"
                strokeWidth={2}
                draggable= {true}
                onDragMove={(e) => dragAnchor(e)}
            />
        </>
    )
}
export default React.memo(ControlPoints);