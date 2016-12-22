'use strict';

jasmine.getFixtures().fixturesPath = 'base/spec/fixtures';

describe('imgin', function() {

  beforeAll(function() {
    this.addImages = imginAddImages;
  });

  it('should return public methods', function() {
    var i = imgin();
    expect(typeof i.getImages).toEqual('function');
    expect(typeof i.loadImages).toEqual('function');
  });

  it('should add the loaded attribute', function() {
    loadFixtures('imgin.html');
    var i = imgin();
    expect(document.querySelectorAll('img[data-imginloaded=false]').length).toBe(4);
  });

  it('should load images', function(done) {
    loadFixtures('imgin.html');
    var i = imgin();
    setTimeout(function() {
      expect(document.querySelectorAll('img[data-imginloaded=true]').length).toBe(4);
      done();
    }, 1000);
  });

  it('should find and load new images', function(done) {
    loadFixtures('preloaded.html');
    var i = imgin();
    this.addImages();
    expect(document.querySelectorAll('img').length).toBe(8);

    i.getImages();
    expect(document.querySelectorAll('img[data-imginloaded=false]').length).toBe(4);

    i.loadImages();
    setTimeout(function() {
      expect(document.querySelectorAll('img[data-imginloaded=true]').length).toBe(8);
      done();
    }, 1000);
  });

});
