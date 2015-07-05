/** @copyright Gary Ascuy 2015 */

_.extend(OSX || {}, {
  _id: 0,
  _options: {},
  _elements: new Array (),

  __x: 0,
  __y: 0,
  __active: false,

  setup: function(options) {
    _.extend(this._options, {
      min: 35, max: 128, space: 2, inc: 5
    }, options);
    this._options.size = this._options.min;
    
    this.__in = this._options.min;
    this.__out = this._options.max;
  },
  add: function(title, info, path, fn) {
    var img = this._img(path);
    img.name = title;
    img.info = info;
    
    this._addEventHandler(img, 'click', fn, false);
    this._addEventHandler(img, 'mouseover', OSX._setTextHandler, false);
    this._elements.push(document.body.appendChild(img));
  },
  start: function(dialog) {
    console.log('started');
    this._dialog = $(dialog);
    this._dialog.hide();
    this._setText({name: "gary", info: "ascuy"});

    this._updateSize();
    this._visible(true);    
    
    document.onmousemove = OSX._mouseHandler;
    if (navigator.appName == 'Netscape') document.captureEvents (Event.MOUSEMOVE);
    OSX._addEventHandler(window, 'resize', OSX._updateSize, false);
  },
  _mouseHandler: function(dom) {
    if (dom) {
      OSX.__x = dom.pageX - window.pageXOffset;
      OSX.__y = dom.pageY - window.pageYOffset;
    } else {
      OSX.__x = event.x;
      OSX.__y = event.y;
    }
    
    OSX._screen();
    if (OSX.__y > OSX.__h - OSX.__in) if (!OSX.__active) OSX._show(true);
    if (OSX.__y < OSX.__h - OSX.__out) if (OSX.__active) OSX._show(false);
    
    if (OSX.__active) OSX._update();
  },
  _update: function() {
    var sp = OSX._options.size + OSX._options.space;
    start = 0;

    var sizes = new Array ();
    for (var i=0;i<OSX._elements.length;++i) {
      item = OSX._elements[i];
      stam = (OSX.__ratio - Math.abs(OSX.__x - item.center)) / OSX.__ratio;
      stam += 1;
      
      stam *= OSX._options.size / 2;
      if (stam < OSX._options.min) stam = OSX._options.min;
      
      item.style.width = stam + 'px';
      item.style.height = stam + 'px';
      sizes.push (stam);
      start += stam + OSX._options.space;
    }
    
    ini = (OSX.__w - start) / 2;
    for (var i=0;i<OSX._elements.length;i++) {
      item = OSX._elements[i];
      item.style.left = ini + 'px';
      ini += sizes[i] + 2;
      item.src = item.src; // Safari issue
    }
  },
  _updateSize: function() {
    OSX._center();
    OSX._update();
  },
  _visible: function(visible) {
    param = (visible)? 'visible' : 'hidden';
    for (var i=0;i<OSX._elements.length;++i)
      OSX._elements[i].style.visibility = param;
  },
  _center: function() {
    OSX.__ratio = OSX._elements.length * 5 + 25;
    if (OSX.__ratio > 80) OSX.__ratio = 80;
    
    OSX._screen();
    var sp = OSX._options.min + OSX._options.space;
    var start = (OSX.__w - sp * OSX._elements.length + OSX._options.space) / 2;
    
    for (var i=0;i<OSX._elements.length;++i)
      OSX._elements[i].center = (start + sp * i) + OSX._options.min / 2;
  },
  _screen: function() {
    if (typeof innerHeight != 'undefined') {
      OSX.__w = innerWidth;
      OSX.__h = innerHeight;
    } else {
      OSX.__w = document.documentElement.clientWidth;
      OSX.__h = document.documentElement.clientHeight;
    }
  },
  _show: function(visible) {
    OSX.__active = visible;
    if (visible) OSX._dialog.show();
    else OSX._dialog.hide();

  },
  _setText: function (element) {
    OSX._dialog.find('.title').html(element.name);
    OSX._dialog.find('.content').html(element.info);
  },
  _setTextHandler: function() { OSX._setText(this); },
  _nextId: function(path) {
    return '__osxdock__' + this._id;
  },
  _img: function(path) {
    var img = document.createElement('img');
    
    img.id = this._nextId();
    img.style.visibility = 'hidden';
    img.style.position = 'fixed';
    
    img.style.bottom = '0px';
    img.style.left = '0px';
    img.style.width = '0px';
    img.style.height = '0px';
    
    img.src = path;
    return img;
  }
});

OSX.setup({});
