imgin.js
========

Small JS plugin for lazy loading images with focus on performance.


Dependencies
------------
While not a traditional jQuery plugin, imgin.js does require jQuery 1.7+ to run.



Usage
=====

Once you have included the javascript in your page, you can initialize the plugin by calling the `imgin()` function.  The function takes an options object as its single (optional) parameter:

<table summary="Object properties for the imgin.js constructor function parameter">
	<thead>
		<tr>
			<th scope="col">Parameter</th>
			<th scope="col">Type</th>
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
			<td>transition</td>
			<td>int</td>
			<td>800</td>
			<td>Time (in milliseconds) for the fade-in transition of loaded images</td>
		</tr>		
		<tr>
			<td>onload</td>
			<td>function</td>
			<td>null</td>
			<td>Callback function to be called for each image after it loads.  Passes the jQuery object of the image as a single paramter</td>
		</tr>		
	</tbody>
</table>




Sample code
===========

To maximize performance, the image tags should not have a standard `src` attribute.  **imgin.js** will create the `src` attribute.
	
	<!-- HTML -->
	<img data-imginsrc="path/to/image.jpg" width="50" height="50" />
	
	// Javascript
	var opts = {
	  offset: 200,
	  onload: function(img) {
	    img.css({ 'border-color':'red' });
	  }
	}
	imgin(opts);
	
