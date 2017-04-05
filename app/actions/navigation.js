import { goBack, push} from 'react-router-redux';

export function goBack(){
  return (dispatch, getState) => {
    dispatch(goBack())
  }
}

