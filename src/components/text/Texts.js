import React from 'react'
import { Text } from 'react-konva';

export default function Texts({circle}) {
    return (
        <>
           <Text
           text={circle.name}
                x={circle.namex}
                y={circle.namey}
                name = "text"
            /> 
        </>
    )
}
