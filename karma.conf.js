module.exports = function(config) {
  config.set({
    frameworks: ['jasmine-jquery','jasmine'],
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'src/imgin.js', watched: true, nocache: true },
      { pattern: 'spec/javascripts/*.js', watched: true, nocache: true },
      { pattern: 'spec/helpers/*.js', watched: true, nocache: true },
      { pattern: 'spec/fixtures/*.html', watched: true, nocache: true },
      { pattern: 'spec/images/*.jpg', watched: false, included: false, nocache: true, served: true }
    ],
    reporters: ['dots']
  });
};
