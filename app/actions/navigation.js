import { goBack, pushState } from 'redux-router';

export function goToBack(){
  return (dispatch, getState) => {
    dispatch(goBack())
  }
}

export function goToRegister(activity, query){
  return (dispatch, getState) => {
    dispatch(pushState(null, `/activities/${activity.id}/register`, query))
  }
}

export function goToActivity(activity, query){
  return (dispatch, getState) => {
    dispatch(pushState(null, `/activities/${activity.id}`, query))
  }
}

export function goToArticle(article){
  return (dispatch, getState) => {
    dispatch(pushState(null, `/articles/${article.id}`, ''))
  }
}

export function goToCourse(course){
  return (dispatch, getState) => {
    dispatch(pushState(null, `/courses/${course.id}`, ''))
  }
}

export function goToCrowd(course){
  return (dispatch, getState) => {
    dispatch(pushState(null, `/courses/${course.id}/crowd`, ''))
  }
}