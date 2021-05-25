import React from 'react';
import {Line} from 'react-konva';

const AnchorLine = ({line}) => {
    if(line.x1) {
        
        return (
            <Line
                    points={[line.x1, line.y1, line.x2, line.y2]}
                    dash={[5,5]}
                    stroke='red'
                    lineCap='round'
                    name='anchorLines'
                    lineJoin='round'
                    strokeWidth={1}
                />
        )
    }
    return null;
    
}
export default AnchorLine;