/**
 * Add some images to the DOM
 */
var imginAddImages = function() {
  var newImages = ['05', '06', '07', '08'];
  var container = document.querySelector('#imgin-container');
  newImages.forEach(function(n) {
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.dataset.imginsrc = '/base/spec/images/image-' + n + '.jpg';
    div.appendChild(img);
    container.appendChild(div);
  });
}
