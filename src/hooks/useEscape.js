import {useEffect } from 'react';
import {useDispatch} from 'react-redux';
import actions from '../actions/Actions';
const useEscape = () => {
    const dispatch = useDispatch();
    const handleEscape = (e) => {
        if(e.keyCode === 27) {
            dispatch(actions.endTheShape());
        }
    }
  
      useEffect(() => {
        document.addEventListener('keydown', handleEscape);    
        return () => {
          document.removeEventListener('keydown', handleEscape);
        };
      }, [handleEscape]);
  
}

export default useEscape;