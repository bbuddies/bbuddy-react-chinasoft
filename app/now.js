import moment from 'moment'
// import getNow from './getNow'


function getNow() {
  return new Date()
}

export default (getCurrentTime = getNow) => {
  return moment(getCurrentTime()).format('YYYY-MM-DD HH:mm:ss.SSS')
}
