// JavaScript source code
import { Line } from 'react-konva';
import React, {useRef} from 'react';
const Lines = ({ line, lineClicked }) => {
    return (
        <>
            <Line
                id={line.id}
                points={[line.x1, line.y1, line.x2, line.y2]}
                stroke='black'
                lineCap='round'
                name='line'
                lineJoin='round'
                strokeWidth={2}
                z-index={0}
                onClick={lineClicked}
            />
            </>
        )
}

export default Lines;