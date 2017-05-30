export default class Promise  {
  static resolve(value){
    let promise = new Promise()
    promise.value = value
    return promise
  }
  static reject(value){
    let promise = new Promise()
    promise.value = value
    return promise
  }
  then(callback){
    let result = callback(this.value);
    return Promise.resolve(result instanceof Promise ? result.value : result)
    // return new Promise()
  }
  catch(callback){
    callback()
    return new Promise()
  }
}
