/**
 * Lazy Loader for images
 * @author Pony Smith (pony@ponysmith.com)
 */

var imgin = function(options) {

  // Default options
  var _options = {
    // Pixels above / below the viewport to begin loading images
    // Can be negative to not load until further in viewport
    offset: 0,
    // Milliseconds to wait after scroll/resize event finishes before triggering load cycle
    debounce: 200
  }
  // Reference for the collection of lazy-loadable images
  var _images = null;
  // Timeout reference
  var _timeout = null;


  /**
   * Private methods
   */
  var _private = {

    /**
     * Initialize the plugin
     */
    init: function(options) {
      // Extend options with user options
      _private.mergeOptions(options);
      // Find lazy-loadable images
      _private.getImages();
      // Check the array and run the initial load cycle
      _private.check();
      // Return the public object
      return _public;
    },

    /**
     * Merge user options
     */
    mergeOptions: function(options) {
      for(o in options) {
        if(_options[o] != null) _options[o] = options[o];
      }
    },

    /**
     * Get all loadable images
     */
    getImages: function() {
      // Get images and coerce NodeList to array
      var imgs = document.querySelectorAll('img[data-imginsrc]');
      _images = [].slice.call(imgs);
      _private.setupImages();
      _private.bindEvents();
    },

    /**
     * Do initial setup on images
     */
    setupImages: function() {
      _images.forEach(function(img) {
        img.dataset.imginloaded = 'false';
      });
    },

    /**
     * Bind the check() method to window resize/scroll
     */
    bindEvents: function() {
      window.addEventListener('resize', _private.check);
      window.addEventListener('scroll', _private.check);
    },

    /**
     * Unbind the check() method
     */
    unbindEvents: function() {
      window.removeEventListener('resize', _private.check);
      window.removeEventListener('scroll', _private.check);
    },

    /**
     * Wrapper for the load() function. Allows easy (un)binding
     */
    check: function() {
      // Set/refresh a timeout for the load function
      // Better performance since the load function only fires once per scroll/resize cycle
      clearInterval(_timeout);
      _timeout = setTimeout(_private.load, _options.debounce);
    },

    /**
     * Verify an image shoudl be loaded (not already loaded; inside viewport)
     * @param (node) n: The DOM node to check
     */
    shouldLoad: function(img, force) {
      if(img.dataset.imginloaded == 'true') return false;
      if(force) return true;

      var r = img.getBoundingClientRect();
      var above = (r.bottom < _options.offset * (-1));
      var below = (r.top > (document.documentElement.clientHeight + _options.offset));
      return (above || below) ? false : true;
    },

    /**
     * Load images function
     * @param (bool) force: If true, automatically loads all images, not just those in the viewport
     */
    load: function(force) {
      _images.forEach(function(img, idx) {
          if(!_private.shouldLoad(img, force)) return;

          var src = img.dataset.imginsrc;
          var newImg = new Image();
          newImg.src = src;
          newImg.onload = function() {
            img.removeAttribute('data-imginsrc');
            img.dataset.imginloaded = true;
            img.src = src;
            newImg = null;
          }
      });
    },

  }


  /**
   * Public object
   */
  var _public = {

    /**
     * Immediately finish loading all images
     */
    loadImages: function() {
      _private.load(true);
    },

    /**
     * Find lazy loadable images
     */
    getImages: function() {
      _private.getImages();
    }

  }

  // Initiate the plugin and return the _public object to the calling script
  return _private.init(options);

}
