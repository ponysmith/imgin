/**
 * Jasmine helpers
 */

var Helpers = {
    

    build: function(options) {
        var iterations = options.iterations || 15;
        var imginattr = options.imginattr || 'data-imginsrc';
        for(i=1; i<=options.iterations; i++) {
            var img = i.toString();
            if(img.length == 1) img = '0' + img;
            var selector = 'div.img img[' + imginattr + '="images/image-' + img + '.jpg"][width="300"][height="200"]';
            affix(selector);
        }
    }


}