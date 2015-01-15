describe("imgin with basic options", function() {

    var _data = {}

    function resetData() {
        _data.loadable_count_init = 0;
        _data.loadable_count_current = 0;
        _data.loaded_count = 0;
        _data.onload_count = 0;
    }

    // Instantiate imgin
    beforeEach(function(done) {
        Helpers.build({ 
            iterations: 15, 
            imginattr: 'data-imginsrc'
        });

        _data.loadable_count_init = $('img[data-imginsrc]').length;
        var options = {
            onload: function() { _data.onload_count++ },
        }
        imgin(options);

        setTimeout(function() {
            _data.loadable_count_current = $('img[data-imginsrc]').length;
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
        expect($('img[data-imginloaded="true"]')).not.toHaveProp('data-imginsrc');
    });

    // Callback is fired
    it('should fire the onload() callback for each loaded image', function() {
        expect(_data.onload_count).toEqual(_data.loaded_count);
    });

    // Should add the loaded attribute
    it('should add the loaded attribute upon loading', function() {
        expect($('img[data-imginloaded="true"]').length).toEqual(_data.onload_count);
    });

});
