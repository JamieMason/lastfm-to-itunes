/**
 * Map over an Array using an asynchronous handler, maintaining a pool of concurrent handlers to be pending at all times until the Array is fully processed (as opposed to waiting until each async handler has finished before calling the next).
 *
 * @param  {Array}    list
 * @param  {Function} handler                    Called on each iteration (done:Function, element:Mixed, index:Number, list:Array)
 * @param  {Number}   [options.maxConcurrent=5]  The maximum number of handlers which can be running concurrently
 * @param  {Function} [options.done]             Called once every handler has responded (responses:Array)
 * @return {Array}    The Array which is being populated with the values passed by handler to done()
 */
exports.map = function (list, handler, options) {

  list = list.concat();

  /**
   * instances of handler which have been invoked but are yet to respond
   * @type {Number}
   * @inner
   */
  var activeHandlers = 0;

  /**
   * Values passed to done by each instance of handler
   * @type {Array}
   * @inner
   */
  var responses = [];

  /**
   * Zero-based indexes of list, used to keep responses in the same order as list
   * @type {Number[]}
   * @inner
   */
  var queue = [];

  /**
   * Number of items to handle
   * @type {Number}
   * @inner
   */
  var iterations = list.length;

  /**
   * Called once every handler has responded
   * @inner
   */
  var onComplete = options.done || function() {};

  // Set a default if undefined or 0
  var maxConcurrent = options.maxConcurrent || 5;

  // Populate queue
  while(queue.length < iterations) {
    queue[queue.length] = queue.length;
  }

  /**
   * Invoke handler(done:Function, element:Mixed, index:Number, list:Array)
   * @param  {Number} i  zero-based index
   * @inner
   */
  function activate(i) {
    ++activeHandlers;
    setTimeout(function () {
      handler(deactivate.bind(null, i), list[i], i, list);
    }, 0);
  }

  /**
   * Receive return value from a completed handler
   * @param  {Number} i
   * @param  {Mixed} returnValue
   * @inner
   */
  function deactivate(i, returnValue) {
    --activeHandlers;
    responses[i] = returnValue;
    next();
  }

  /**
   * Ensure we have maxConcurrent * handlers invoked and are awaiting a response.
   * @inner
   */
  function next() {
    while(queue.length && (activeHandlers <= maxConcurrent)) {
      activate(queue.shift());
    }

    if(!queue.length && !activeHandlers && responses.length === iterations) {
      onComplete(responses);
    }
  }

  // Start iterating over list
  next();

  // Currently empty, but we can return the Array we're populating
  return responses;

};
