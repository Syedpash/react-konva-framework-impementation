// JavaScript source code
import types from './Constants';
//CIRCLE
 const actions = {
    createCircles: (circle) => ({type: types.CREATE_CIRCLE,  circle}),
    createLines: (line) => ({type: types.CREATE_LINE,  line}),
    updateLines: (line) => ({type: types.UPDATE_LINE, line}),
    toolChange: (tool) => ({type:types.TOOL_CHANGE, tool}),
    snapToFirst: (line) => ({type: types.SNAP_TO_FIRST, line}) ,
    endTheShape: () => ({type: types.END_THE_SHAPE }),
    addNewTab: () => ({type:types.ADD_NEW_TAB}),
    deleteATab: (id) => ({type: types.DELETE_A_TAB, id}),
    lineToCurve: (lineId, shapeId) => ({ type: types.LINE_TO_CURVE, lineId, shapeId}),
    updateCurve: (x, y, id, curveId,shapeId) => ({type: types.UPDATE_CURVE,x,y,id,curveId, shapeId   }),
    deSelect: () => ({type: types.DE_SELECT})

}
export default actions;
