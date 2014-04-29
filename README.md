imgin.js
========

Small JS plugin for lazy loading images with focus on performance.

**Dependencies:**
While not a traditional jQuery plugin, imgin.js does require jQuery 1.7+ to run.



## Usage ##

Once you have included the javascript in your page, you can initialize the plugin by:
* Adding a data property to your image tags that will store the image path.  By default, the plugin uses the `data-imginsrc` attribute, but you can specify a custom attribute in the options object.  **Note:** To maximize performance, the image tags should not have a standard `src` attribute.  **imgin.js** will create the `src` attribute.
* Call the `imgin()` function inside your `document.ready` jQuery block.

**Example**
	
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

	
### Options ###
The plugin takes an options object as its single (optional) parameter.  Any or all of the following options can be set in the options object.

<table summary="Object properties for the imgin.js constructor function parameter">
	<thead>
		<tr>
			<th scope="col">Parameter</th>
			<th scope="col">Default</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
    <tr>
			<td>attr</td>
			<td>string</td>
			<td>'data-imginsrc'</td>
			<td>Attribute which will hold the image path</td>
		</tr>		
		<tr>
			<td>offset</td>
			<td>int</td>
			<td>0</td>
			<td>Number of pixels outside the viewport to begin loading images (can be negative)</td>
		</tr>		
		<tr>
			<td>lag</td>
			<td>int</td>
			<td>300</td>
			<td>Time (in milliseconds) to wait after scrolling/resizing stops before initiating a load cycle</td>
		</tr>		
		<tr>
			<td>onload</td>
			<td>function</td>
			<td>null</td>
			<td>Callback function to be called for each image after it loads.  Passes the jQuery object of the image as a single paramter</td>
		</tr>		
	</tbody>
</table>




## Public Methods ##
**imgin.js** exposes the following public methods:



### force() ###
The force method can be used to automatically load all remaining unloaded images in the current images set.

**Example**

	// Call the plugin
	var myimgs = imgin();
	// Force load all images
	myimgs.force();
	
	
	
### refresh() ###
The refresh method refreshes the images set and adds any new lazy-loadable images to the set.  This is useful if lazy-loadable images are dynamically added to the DOM.  

**Example**

	// Call the plugin
	var myimgs = imgin();
	
	//
	// Let's assume there's some code here that adds new lazy-loadable images to the DOM
	// 
	
	// Refresh the image set
	myimgs.refresh();
	
**Note:**
Previously loaded images will not be added to the images set, only current (unloaded) images and any new images that have been added to the DOM since the plugin was called or since the last time refresh() was called.  Also, note that refresh will not change any of the plugin options.

