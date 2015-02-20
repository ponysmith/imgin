/** 
 * Lazy Loader for images
 * @author Pony Smith (pony@ponysmith.com)
 */

// Using UMD to make the plugin AMD compliant for use w/ RequireJS
// based on https://github.com/umdjs/umd
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function (jQuery) {
            return (root.imgin = factory(jQuery));
        });
    } else {
        root.imgin = factory(root.jQuery);
    }
}(this, function ($) {

    // Now for our actual plugin code
    return function(options) {

        // Default options
        var _options = { 
            // Pixels above / below the viewport to begin loading images (can be negative to not load until further in viewport)
            offset: 0, 
            // Milliseconds to wait after scroll/resize event finishes before triggering load cycle
            lag: 200, 
            // HTML attribute that will store the image src (best to leave this as is unless you have a good reason to change it)
            attr: 'data-imginsrc', 
            // Callback functions
            onload: null 
        }
        // Window reference
        var _window = $(window);
        // Reference for the jQuery collection of lazy-loadable images
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
                $.extend(_options, options);
                // Find lazy-loadable images
                _private.find();
                // Check the array and run the initial load cycle
                _private.check();
                // Return the public object
                return _public;
            },
            
            /** 
             * Find lazy loadable images
             */
            find: function() {
                _images = $('img[' + _options.attr + ']').attr('data-imginloaded', 'false');
                if(_images.length) _private.bind();
            },

            /** 
             * Bind the check() method to window resize/scroll
             */
            bind: function() {
                _window.on('resize scroll', _private.check);
            },

            /** 
             * Unbind the check() method
             */
            unbind: function() {
                _window.off('resize scroll', _private.check);
            },
            
            /** 
             * Wrapper for the load() function. Allows easy (un)binding
             */
            check: function() {
                // If there are no more images to load, unbind the resize/scroll event
                if(!_images.length) {
                    _private.unbind();
                    return false;
                }
                // Set/refresh a timeout for the load function
                // Better performance since the load function only fires once per scroll/resize cycle
                clearInterval(_timeout);
                _timeout = setTimeout(_private.load, _options.lag);
            },
            
            /** 
             * Check if element is in viewport (taking into account offsets from the options object)
             * @param (node) n: The DOM node to check
             */
            inviewport: function(n) {
                var r = n.getBoundingClientRect();
                var above = (r.bottom < _options.offset * (-1));
                var below = (r.top > (document.documentElement.clientHeight + _options.offset));
                return (above || below) ? false : true;
            },
            
            /** 
             * Loading function
             * Loops through images array and loads any that are in the viewport 
             * After loading, images are removed from the images array and the attribute defined by options.attr is removed from the image element
             * @param (bool) force: If true, automatically loads all images, not just those in the viewport
             */
            load: function(force) {
                if(force) {
                    // Load all images
                    var imgs = _images;
                } else {
                    // Create a filtered image set of only images in the viewport
                    var imgs = _images.filter(function() {
                        return _private.inviewport($(this).get(0)); 
                    });
                }
                // Loop through image set and load images
                imgs.each(function() {
                    var img = $(this);
                    var src = img.attr(_options.attr);
                    // Preload the image data in a temp image
                    var newImg = new Image();
                    newImg.src = src;
                    // When image is loaded
                    newImg.onload = function() {
                        // Add the src attribute to the original image
                        img.removeAttr(_options.attr).attr('data-imginloaded', 'true').attr('src',src);
                        // Remove the current image from the master images array
                        _images = _images.not(img);
                        // Trigger onload callback if available
                        if(typeof _options.onload === 'function') _options.onload(img);
                        // Remove the reference for cleanup
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
            force: function() {
                _private.load(true);
            },

            /** 
             * Refresh the loadable image list and trigger a check
             */
            refresh: function() {
                _private.find();
                _private.check();
            }

        }

        // Initiate the plugin and return the _public object to the calling script
        return _private.init(options);

    }
    
}));

