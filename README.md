# imgin

[![CircleCI](https://circleci.com/gh/ponysmith/imgin.svg?style=svg)](https://circleci.com/gh/ponysmith/imgin)

**imgin** is a small JS plugin for lazy loading images.


## Dependencies
None


## Usage
```
<!-- HTML -->
<img data-imginsrc="path/to/image.jpg" width="50" height="50" />
```

```
// Javascript
var opts = {
	offset: 200,
  debounce: 100
}
var myimgs = imgin(opts);
```


## Options
**imgin()** accepts an options object as an argument. You can set the following options:
* **offset**: distance in pixels outside the viewport to begin loading images. Can be set to negative number to hold off loading until further *into* the viewport.
* **debounce**: time in milliseconds to wait after a scroll/resize event before initiating a load cycle


## Public methods
The **imgin()** method returns an object with two public methods:
* **getImages()**: Add new images to the internal image array. Useful if you add new images you want to lazy load after the initial call to **imgin()**
* **loadImages()**: Force loads all images (including those outside of the viewport)

## Documentation
For full documentation, list of options, examples, etc., visit http://ponysmith.github.io/imgin
