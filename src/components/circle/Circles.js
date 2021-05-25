// JavaScript source code

import { Circle } from 'react-konva';

const Circles = ({ circle,circleClicked, dragCircle}) => {
    const mouseEnter = (e) => {
        console.log('ccccc')
        e.target.fill('red');
    }
    const mouseLeave = (e) => {
        e.target.attrs.fill = 'grey';
    }
    return (
        <>
            
            <Circle
                x={circle.x}
                y={circle.y}
                id={circle.id}
                radius={6}
                fill='grey'
                name="circle"
                //zIndex={8}
                //hitStrokeWidth={10}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onClick = {circleClicked}
                draggable
                onDragMove = {dragCircle}
            />
            
        </>
    );
}

export default Circles;

