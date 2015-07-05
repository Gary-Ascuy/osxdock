/** @copyright Gary Ascuy 2015 */

OSX = OSX || {};

// capture = true
OSX._addEventHandler = function(e, evento, func, capture) {
  if (e.addEventListener) { // standard browser
    e.addEventListener (evento, func, capture);
  } else if (e.attachEvent) { // Internet Explorer
    e.attachEvent ('on' + evento, func);
  } else { // other browser
    e[evento] = func;
  }
}

// capture false
OSX._removeEventHandler = function(e, evento, func, capture) {
  if (e.removeEventListener) { // standar browser
    e.removeEventListener (evento, func, capture);
  } else if (e.detachEvent) { // Internet Explorer
    e.detachEvent ('on' + evento, func);
  } else { // other browser
    e[evento] = null;
  }
}
