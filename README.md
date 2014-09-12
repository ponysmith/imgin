imgin.js
========

Small JS plugin for lazy loading images with focus on performance.


## Usage ##
	
	<!-- HTML -->
	<img data-imginsrc="path/to/image.jpg" width="50" height="50" />
	
	// Javascript
	var opts = {
	  	offset: 200,
	  	onload: function(img) {
	    	img.css({ 'border-color':'red' });
	  	}
	}
	var myimgs = imgin(opts);

For full documentation, list of options, examples, etc., visit http://ponysmith.github.io/imgin
