module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),      
        uglify: {
            dev: {
                files: {
                    'js/imgin.min.js': ['js/imgin.js']
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);

}
