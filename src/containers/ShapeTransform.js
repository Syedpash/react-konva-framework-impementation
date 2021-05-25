import Konva from "konva";
import React, { useRef, useState } from "react";
import { Layer, Rect, Stage, Transformer } from "react-konva";
import Rectangle from '../components/Rectangle';

import {connect} from 'react-redux';

const initialRectangles = [
  {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 250,
    y: 250,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

const MultipleShapesDragSelectAndResize = ({shapes}) => {
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState(null);
  const [nodesArray, setNodes] = useState([]);
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
  const oldPos = useRef(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      trRef.current.nodes([]);
      setNodes([]);
      // layerRef.current.remove(selectionRectangle);
    }
  };

  const updateSelectionRect = () => {
    //console.log(rectangles[0]);
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

  const onMouseDown = (e) => {
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

  const onMouseMove = (e) => {
    if (!selection.current.visible) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseUp = () => {
    oldPos.current = null;
    if (!selection.current.visible) {
      return;
    }
    const selBox = selectionRectRef.current.getClientRect(); // selection box

    const elements = [];
    layerRef.current.find(".rectangle").forEach((elementNode) => {
      const elBox = elementNode.getClientRect();
      // console.log(elBox); // shapes
      if (Konva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode); // if element is within selection rectangle, push it to elements
      }
    });
    trRef.current.nodes(elements);
    selection.current.visible = false; // disables light blue fill
    Konva.listenClickTap = false; // disable click event
    updateSelectionRect();
  };

  const onClickTap = (e) => {
    // if we are selecting with rect, do nothing
    if (selection.visible()) {
      return;
    }
    let stage = e.target.getStage();
    let layer = layerRef.current;
    console.log(layer);
    let tr = trRef.current;
    // if click on empty area - remove all selections
    if (e.target === stage) {
      selectShape(null);
      setNodes([]);
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
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={checkDeselect}
      onClick={onClickTap}
    >
      <Layer ref={layerRef}>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              getKey={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              getLength={rectangles.length}
              onSelect={(e) => {
                if (e.current !== undefined) {
                  let temp = nodesArray;
                  if (!nodesArray.includes(e.current)) temp.push(e.current);
                  setNodes(temp);
                  trRef.current.nodes(nodesArray);
                  trRef.current.nodes(nodesArray);
                  trRef.current.getLayer().batchDraw();
                }
                selectShape(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
                // console.log(rects)
              }}
            />
          );
        })}

        <Transformer
          // ref={trRef.current[getKey]}
          ref={trRef}
          borderStroke="rgba(0,255,0,0.5)"
          anchorStroke="rgba(255,0,0,0.5)"
          borderStrokeWidth={1.5}
          anchorStrokeWidth={1.5}
          anchorFill="rgba(0,0,255,0.5)"
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
  );
};

const mapStateToProps = (state) => {
    
  return {
      shapes: state.tab.shapes,
      toolKey: state.tab.toolKey,
      lines: state.tab.shapes[0].lines,
      circles: state.tab.shapes[0].circles,
      draw: state.tab.shapes[0].data.draw
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//       createCircle: (pos) => dispatch(actions.createCircles(pos)),
//       createLine: (pos) => dispatch(actions.createLines(pos)),
//       updateLine: (pos) => dispatch(actions.updateLines(pos)),
//       toolChange: (tool) => dispatch(actions.toolChange(tool)),
//       endTheShape: () => dispatch(actions.endTheShape()),
//       snapToFirst: (pos) => dispatch(actions.snapToFirst(pos))
//   }
// }
export default connect(mapStateToProps, null)(MultipleShapesDragSelectAndResize);
