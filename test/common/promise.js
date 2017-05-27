export default class Promise  {
  static resolve(value){
    let promise = new Promise()
    promise.value = value
    return promise
  }
  then(callback){
    callback(this.value)
    return new Promise()
  }
  catch(callback){
    callback()
    return new Promise()
  }
}
