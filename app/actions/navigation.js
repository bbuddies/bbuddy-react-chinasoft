import { goBack, push} from 'react-router-redux';

export function goToBack(){
  return (dispatch, getState) => {
    dispatch(goBack())
  }
}

