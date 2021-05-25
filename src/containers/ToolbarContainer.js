import React, {useEffect} from 'react'
import Toolbar from '../components/toolbar/Toolbar'
import {connect} from 'react-redux';
import actions from '../actions/Actions';

const ToolbarContainer = (props) => {
    const { toolKey, toolChange} = props;
    const handleToolChange = (e) => {
        let toolName = e.target.textContent;
        if(e.keyCode === 80 || toolName === 'P') 
            toolChange('PEN');
        if(e.keyCode === 86 || toolName === 'V')
            toolChange('SEL');
    }
    useEffect(() => {
        if(toolKey === 'PEN')
            document.getElementById('container').style.cursor='crosshair';
        if(toolKey === 'SEL')
            document.getElementById('container').style.cursor='default';
    },[toolKey]);
    
    useEffect(() => {
        window.addEventListener('keydown', handleToolChange);    
        return () => {
          window.removeEventListener('keydown', handleToolChange);
        };
      }, [handleToolChange]);

    return (
        <div>
            <Toolbar toolKey={toolKey} handleToolChange={handleToolChange}/>
        </div>
    )
}
const mapStateToProps = (state) => {
    
    return {
        toolKey: state.tab.toolKey
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toolChange: (tool) => dispatch(actions.toolChange(tool))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer);
