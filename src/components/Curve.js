// JavaScript source code
import { Line } from 'react-konva';
import React, {useRef} from 'react';
const Lines = ({ line,toolKey, mouseEnter, mouseLeave }) => {
    const lineRef = useRef();
    let cccc= layerRef.current.find(".curves");
            cccc.stroke("black");
            console.log(cccc)
            cccc[cccc.length - 1].stroke('blue');
            lineRef.current.stroke('blue');
            console.log(lineRef.current)

    return (
        <>
            <Line
                ref= {lineRef}
                points={[line.x1, line.y1, line.x2, line.y2]}
                stroke="black"
                lineCap='round'
                lineJoin='round'
                strokeWidth={1}
                z-index={0}
                // draggable
                //onClick = {(e) => lineClicked}
            />
            </>
        )
}

export default Lines;