// JavaScript source code
import produce from 'immer';
import types from '../actions/Constants';
let currentShapeId;
const Alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const initialState = {
    tab : {
        toolKey:"",
        shapeLength: 0,
        anchorLines:[],
        shapes: [
            {
                shapeId: 0,
                curves: [],
                circles: [],
                lines: [],   
                data: {
                    draw: false
                }
            }
        ]
    }
    
}
const Reducer = (state = initialState, action) => {

    return produce(state, draftState => {

        let {shapeLength} = draftState.tab;
        let lineLength = draftState.tab.shapes[shapeLength].lines.length - 1;
        let circleLength = draftState.tab.shapes[shapeLength].circles.length - 1;
        const { lines, circles, data, shapeId, curves} = draftState.tab.shapes[shapeLength];
        let {anchorLines} = draftState.tab;
        switch (action.type) {

            case types.ADD_NEW_TAB: 
                draftState.tabs.push({tabName: "Tab" + (draftState.tabIndex + 1), id: (draftState.tabIndex + 1)});
                draftState.tabIndex += 1;
                return draftState;
            
            case types.DELETE_A_TAB:
                let index = draftState.tabs.map(e => e.id).indexOf(action.id);
                draftState.tabs.splice(index, 1);
                return draftState;

            case types.CREATE_CIRCLE:
                let { x, y } = action.circle;
                circles.push({ x, y,
                    id:  circleLength + 1,
                    name: Alpha[shapeLength] + ( circleLength + 1 + 1),
                    namex: x + 5, namey: y + 5 });
                return draftState;

            case types.CREATE_LINE: 
                let x1 = action.line.x, y1 = action.line.y, x2 = action.line.x, y2 = action.line.y;
                // lines.map((line) => {
                //     if(line.x1 === x1)
                // })
                lines.push({ x1, y1, x2, y2, id:lineLength + 1});
                data.draw = true;
                return draftState;

            case types.UPDATE_LINE:
                lines[lineLength].x2 = action.line.x;
                lines[lineLength].y2 = action.line.y;
                return draftState;
          
            
            case types.UPDATE_SHAPE:
                    lines[0] = action.shape;
                    return draftState;

            case types.SNAP_TO_FIRST: 
                lines[lineLength].x2 = action.line.x;
                lines[lineLength].y2 = action.line.y;
                data.draw = false;
                // draftState.tab.shapeLength++;
                // draftState.tab.shapes.push({
                //     shapeId: shapeId + 1,
                //     curves:[],
                //     circles: [],
                //     lines: [], 
                //     curves: [],  
                //     data: {
                //         draw: false
                //     }
                // });
                return draftState;                    

            case types.TOOL_CHANGE:
                draftState.tab.toolKey = action.tool;
                return draftState;

            case types.END_THE_SHAPE:
               // draftState.tab.shapes.push(defaultState);
              // lines.pop();
               //shapeId++;
               //draftState.tab.shapeLength++;
                data.draw = false; 
                draftState.tab.shapeLength++;
                draftState.tab.shapes.push({
                    shapeId: shapeId + 1,
                    circles: [],
                    lines: [], 
                    curves: [],  
                    data: {
                        draw: false
                    }
                });
                return draftState;
            
            case types.LINE_TO_CURVE:
                {
                    const {curves} = draftState.tab.shapes[action.shapeId];
                    currentShapeId = action.shapeId;
                    let curve = {...draftState.tab.shapes[action.shapeId].lines[action.lineId]};
                    let ctrx1 = Math.round(Math.abs((curve.x1 + curve.x2) / 2)) ;
                    let ctry1 = Math.round(Math.abs((curve.y1 + curve.y2) / 2)) ;
                    let ctrx2 = Math.round(Math.abs((ctrx1 + curve.x2) / 2)) ;
                    let ctry2 = Math.round(Math.abs((ctry1 + curve.y2) / 2)) ;
                    ctrx1 = Math.round(Math.abs((curve.x1 + ctrx1) / 2)) ;
                    ctry1 = Math.round(Math.abs((curve.y1 + ctry1) / 2)) ;
                    curve.cx1 = ctrx1;
                    curve.cy1 = ctry1;
                    curve.cx2 = ctrx2;
                    curve.cy2 = ctry2;
                    curves.push(curve);
                    anchorLines.splice(0,anchorLines.length,{
                        x1: curve.x1,
                        y1: curve.y1,
                        x2: curve.cx1,
                        y2: curve.cy1,
                        id: 0
                        },{x1: curve.x2,
                        y1: curve.y2,
                        x2: curve.cx2,
                        y2: curve.cy2,
                        id:1
                    },{color: "blue"});
                    return draftState;
            }

            case types.UPDATE_CURVE: {
                const {curves} = draftState.tab.shapes[currentShapeId];
                    let tempId = curves.findIndex(curve => curve.id === action.curveId);
                    if(action.id === 0 && tempId !== -1) {
                        curves[tempId].cx1 = anchorLines[0].x2 = action.x;
                        curves[tempId].cy1 = anchorLines[0].y2 = action.y;
                         
                        return draftState;
                    }
                    if(action.id === 1 && tempId !== -1){                        
                        curves[tempId].cx2 = anchorLines[1].x2 = action.x;
                        curves[tempId].cy2 = anchorLines[1].y2 = action.y;
                        return draftState;
                    }}
            default:
                return state;
        }
    });
}
export default Reducer;
