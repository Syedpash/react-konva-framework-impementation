// JavaScript source code
import { useState,useEffect, useRef,  } from 'react';
import { Shape, Circle,Line, Text } from 'react-konva';
import Konva from 'konva';
import {  Group, Rect, Stage,  Layer, Transformer } from 'react-konva';
import * as actions from '../actions/Actions';
import { useSelector, useDispatch } from 'react-redux';
import Circles from '../components/circle/Circles';
import Lines from '../components/line/Lines';
var globeId;
const Examples = (props) => {
  
    const shapes = useSelector(state => state.tab.shapes);
    const shapeLength = useSelector(state => state.tab.shapeLength);
    const draw = useSelector(state => state.tab.shapes[shapeLength].data.draw);
    const toolKey = useSelector(state => state.tab.toolKey);
    const curves = useSelector(state => state.tab.shapes[shapeLength].curves);
    const dispatch = useDispatch();
    const trRef = useRef();
    const layerRef = useRef();
    const selectionRectRef = useRef();
    const selection = useRef({
      visible: false,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    });
    const oldPos = useRef();
    useEffect (() => {
        if(curves.length > 0) {
          // let circles= layerRef.current.find(".anchors");
          // circles.opacity(0);
          let cccc= layerRef.current.find(".curves");
         cccc.stroke("black");
         cccc[cccc.length - 1].stroke('blue');
          //curves.stroke("black")
          let {cx1,cy1,cx2,cy2} = curves[curves.length - 1];
          buildAnchor(cx1, cy1, 0);
          buildAnchor(cx2, cy2, 1);
          console.log(cx1,cy1,cx2,cy2)
        }
    },[curves.length])
    const handleClickOnStage = (e) => {
        e.cancelBubble = true;
        if(toolKey == 'PEN') {
            let currentPos = e.target.getStage().getPointerPosition();
            console.log(currentPos);

            dispatch(actions.createCircles(currentPos));
            dispatch(actions.createLines(currentPos));
        }
        if(toolKey === 'SEL') {
          let circles= layerRef.current.find(".anchors");
          circles.opacity(0);
          console.log(circles)
            if (selection.visible) {
                return;
              }
              let stage = e.target.getStage();
              let layer = layerRef.current;
              //console.log(layer);
              let tr = trRef.current;
              // if click on empty area - remove all selections
              if (e.target === stage) {
                // selectShape(null);
                // setNodes([]);
                tr.nodes([]);
                layer.draw();
                return;
              }
          
              // do nothing if clicked NOT on our rectangles
              if (!e.target.hasName(".rect")) {
                return;
              }
          
              // do we pressed shift or ctrl?
              const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
              const isSelected = tr.nodes().indexOf(e.target) >= 0;
          
              if (!metaPressed && !isSelected) {
                // if no key pressed and the node is not selected
                // select just one
                tr.nodes([e.target]);
              } else if (metaPressed && isSelected) {
                // if we pressed keys and node was selected
                // we need to remove it from selection:
                const nodes = tr.nodes().slice(); // use slice to have new copy of array
                // remove node from array
                nodes.splice(nodes.indexOf(e.target), 1);
                tr.nodes(nodes);
              } else if (metaPressed && !isSelected) {
                // add the node into selection
                const nodes = tr.nodes().concat([e.target]);
                tr.nodes(nodes);
              }
              layer.draw();
            }
      }
      function buildAnchor(x, y, num) {
        console.log(x,y)
        var anchor = new Konva.Circle({
          x: x,
          y: y,
          id: num,
          radius: 3,
          stroke: '#666',
          fill: '#ddd',
          name: 'anchors',
          strokeWidth: 2,
          draggable: true,
        });
        layerRef.current.add(anchor);

        // add hover styling
        anchor.on('mouseover', function () {
          document.body.style.cursor = 'pointer';
          this.strokeWidth(4);
          layerRef.current.draw();
        });
        anchor.on('mouseout', function () {
          document.body.style.cursor = 'default';
          this.strokeWidth(2);
          layerRef.current.draw();
        });

        anchor.on('dragmove', function (e) {
          let x = e.target.x();
          let y = e.target.y();
          let id = e.target.id();
          dispatch(actions.updateCurve(x,y,id, globeId));
          console.log(e.target.id());
          //updateDottedLines();
          e.cancelBubble = true;
        });

        return anchor;
      }
    
    const handleEscape = (e) => {
        if(e.keyCode === 27) {
            dispatch(actions.endTheShape());
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
      console.log(e);
      e.cancelBubble = true;
      if(toolKey === 'SEL') {
        e.target.fill('blue');
        
      }
         if(toolKey === 'PEN'){
    
            e.target.attrs.fill = 'grey';
            let { x,y} = e.target.attrs;
            let currentPos = {x: x,y: y};
            dispatch(actions.snapToFirst(currentPos));
        }
    }

    const handleMouseMoveOnStage = (e) => {
        e.cancelBubble = true;
        if (toolKey === 'PEN') {  
            if(draw) {
                let pos = e.target.getStage().getPointerPosition();
                dispatch(actions.updateLines(pos));
            }
        }
        if(toolKey === 'SEL') {
            if (!selection.current.visible) {
                return;
              }
              const pos = e.target.getStage().getPointerPosition();
              selection.current.x2 = pos.x;
              selection.current.y2 = pos.y;
              updateSelectionRect();
        }
    }
    const handleMouseUpOnStage = () => {
        
          oldPos.current = null;
        if (!selection.current.visible) {
          return;
        }
        const selBox = selectionRectRef.current.getClientRect(); // selection box
        let shapes = layerRef.current.find(" .line");
        let circles = layerRef.current.find(" .circle");
        let texts = layerRef.current.find(".text");
        circles.map((circle) => shapes.push(circle));
        texts.map((text) => shapes.push(text));
        console.log(shapes);
        const elements = [];
        shapes.forEach((elementNode) => {
          const elBox = elementNode.getClientRect();
           //console.log(elBox); // shapes
          if (Konva.Util.haveIntersection(selBox, elBox)) {
            elements.push(elementNode); // if element is within selection rectangle, push it to elements
          }
        });
        trRef.current.nodes(elements);
        selection.current.visible = false; // disables light blue fill
        Konva.listenClickTap = false; // disable click event
        updateSelectionRect();
      
      };
    const updateSelectionRect = () => {
        const node = selectionRectRef.current;
        node.setAttrs({
          visible: selection.current.visible,
          x: Math.min(selection.current.x1, selection.current.x2),
          y: Math.min(selection.current.y1, selection.current.y2),
          width: Math.abs(selection.current.x1 - selection.current.x2),
          height: Math.abs(selection.current.y1 - selection.current.y2),
          fill: "rgba(0, 161, 255, 0.3)",
        });
        node.getLayer().batchDraw();
      };

   
    const handleMouseDownOnStage = (e) => {
        if(toolKey === 'SEL') {

            const isElement = e.target.findAncestor(".elements-container");
            const isTransformer = e.target.findAncestor("Transformer");
            if (isElement || isTransformer) {
              return;
            }
            console.log(e.target.getStage().children);
            const pos = e.target.getStage().getPointerPosition();
            selection.current.visible = true;
            selection.current.x1 = pos.x;
            selection.current.y1 = pos.y;
            selection.current.x2 = pos.x;
            selection.current.y2 = pos.y;
            updateSelectionRect();
          };
        }
        

        const lineClicked = (e) => {
          e.target.cancelBubble = true;
          if(toolKey === 'SEL') {
            e.target.opacity(0);
            let lineId = e.target.id();
            globeId = lineId;
            let shapeId = e.target.getParent().id();
            console.log(lineId,shapeId);
            dispatch(actions.lineToCurve(lineId, shapeId));
          }
        }
        const clickedOnCurve = (e) => {
          let circles = layerRef.current.find('.anchors')
          circles.opacity(1);
          console.log((circles))
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
                onMouseDown={handleMouseDownOnStage}
                onMouseUp={handleMouseUpOnStage}
                
            >
                <Layer  ref={layerRef}>
                  {shapes.map((shape, i) => (
                    <Group key ={i} id={shape.shapeId}>
                    {shape.circles.map((circle, i) => (
                      <>
                        <Circles
                          key = {i}
                          circle = {circle}
                          circleClicked = {circleClicked}
                        />
                        <Text
                        key = {i+1}
                          text={circle.name}
                          x={circle.namex}
                          y={circle.namey}
                          name = "text"
                        />
                      </>
                    ))}
                    {
                      shape.lines.map((line, i) => (
                        <Lines
                          line={line}
                          lineClicked={lineClicked}
                        />
                      ))                      
                    }{
                      shape.curves.map((curve, i) => (
                        <Shape
                          key={i}
                          name="curves"
                          stroke= {'blue'}
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
                      ))                      
                    }
                   
                    </Group>
                  ))}
                        <Transformer
          // ref={trRef.current[getKey]}
          ref={trRef}
          borderStroke="rgba(0,255,0,0.5)"
          anchorStroke="rgba(255,0,0,0.5)"
          borderStrokeWidth={1.5}
          anchorStrokeWidth={1.5}
          keepRatio="false"
          anchorFill="rgba(0,0,255,0.5)"
          resizeEnabledChange = {(e) => console.log(e)}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
        <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} /> 
                </Layer>
            </Stage>
           
        </>
    )
}



export default(Examples);