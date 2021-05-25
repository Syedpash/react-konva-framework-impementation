// JavaScript source code
import { useState,useEffect, useRef } from 'react';
import { Shape, Circle } from 'react-konva';
import { Portal, Group, Rect, Stage,  Layer, Transformer } from 'react-konva';
import * as actions from '../actions/Actions';
import { connect } from 'react-redux';
import Rectangle from '../components/Rectangle';
import Konva from 'konva';
import Lines from '../components/line/Lines';
import Circles from '../components/circle/Circles';
import Texts from '../components/text/Texts';
import Temp from './Temp';

const Examples = (props) => {
  
    
    const { lines, circles, toolKey, createCircle, 
        createLine, updateLine, endTheShape, draw, 
        snapToFirst} = props;

    const handleClickOnStage = (e) => {
        e.cancelBubble = true;
        if(toolKey == 'PEN') {
            let currentPos = e.target.getStage().getPointerPosition();
            console.log(currentPos);

            createCircle(currentPos);
            createLine(currentPos);
        }
        if(toolKey === 'SEL') {
            }
      }
    
    const handleEscape = (e) => {
        if(e.keyCode === 27) {
            endTheShape();
        }
        console.log(e.key);
    }
    useEffect(() => {
        document.addEventListener('keydown', handleEscape);    
        return () => {
          document.removeEventListener('keydown', handleEscape);
        };
      }, [handleEscape]);

    const circleClicked = (e) => {
        if(toolKey === 'SEL') {            
        e.target.attrs.fill = 'red';
        }else if(toolKey === 'PEN'){
    
            e.cancelBubble = true;
            e.target.attrs.fill = 'grey';
            let { x,y} = e.target.attrs;
            let currentPos = {x: x,y: y};
            snapToFirst(currentPos);
        }
    }

    const handleMouseMoveOnStage = (e) => {
        e.cancelBubble = true;
        if (toolKey === 'PEN') {  
            if(draw) {
                let pos = e.target.getStage().getPointerPosition();
                updateLine(pos);
            }
        }
    }

    const mouseEnter = (e) => {
        e.cancelBubble = true;
        e.target.attrs.fill = 'red';
    }
    const mouseLeave = (e) => {
        e.target.attrs.fill = 'grey';
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
                <Layer>    
                   {
                        circles.map((circle, i) => 
                            <Circles key={i} 
                                circle={circle} 
                                mouseLeave={mouseLeave} 
                                mouseEnter={mouseEnter}
                                circleClicked={circleClicked}
                                />
                            )
                    }
                    
                    {
                        circles.map((circle, i) => 
                            <Texts key={i} 
                                circle={circle} 
                            />)
                    }
                    {
                        lines.map((line, i) => 
                            <Lines key={i} 
                                line={line} 
                                mouseLeave={mouseLeave} 
                                mouseEnter={mouseEnter}
                            />)
                        } 
                        
                </Layer>
            </Stage>
           
        </>
    )
}


const mapStateToProps = (state) => {
    
    return {
        shapes: state.tab.shapes,
        toolKey: state.tab.toolKey,
        lines: state.tab.shapes[0].lines,
        circles: state.tab.shapes[0].circles,
        draw: state.tab.shapes[0].data.draw
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createCircle: (pos) => dispatch(actions.createCircles(pos)),
        createLine: (pos) => dispatch(actions.createLines(pos)),
        updateLine: (pos) => dispatch(actions.updateLines(pos)),
        toolChange: (tool) => dispatch(actions.toolChange(tool)),
        endTheShape: () => dispatch(actions.endTheShape()),
        snapToFirst: (pos) => dispatch(actions.snapToFirst(pos))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Examples);