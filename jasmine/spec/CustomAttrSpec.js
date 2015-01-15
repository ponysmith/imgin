describe("imgin with custom data attribute", function() {

    var _data = {}

    function resetData() {
        _data.loadable_count_init = 0;
        _data.loadable_count_current = 0;
        _data.loaded_count = 0;
        _data.onload_count = 0;
    }

    beforeEach(function(done) {
        Helpers.build({ 
            iterations: 15, 
            imginattr: 'data-customsrc'
        });

        _data.loadable_count_init = $('img[data-customsrc]').length;
        var options = {
            onload: function() { _data.onload_count ++ },
            attr: 'data-customsrc'
        }
        imgin(options);

        setTimeout(function() {
            _data.loadable_count_current = $('img[data-customsrc]').length;
            _data.loaded_count = $('img[data-imginloaded="true"]').length;
            done();
        }, 1000);
    });

    afterEach(function() {
        resetData();
    });
    
    // Make sure images load
    it('should load images', function() {
        expect(_data.loaded_count).toBeGreaterThan(0);
        expect(_data.loadable_count_current).toEqual(_data.loadable_count_init - _data.loaded_count);
    });

    // Remove data attribute from loaded images
    it('should remove the data attribute from loaded images', function() {
        expect($('img[src]')).not.toHaveProp('data-customsrc');
    });

});
