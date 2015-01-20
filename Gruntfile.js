module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    lib_files: {

      core: [
        'src/<%= pkg.name %>.js'
      ],
      css: [
        'src/style/<%= pkg.name %>.css'
      ]
    },

    concat: {
      dist: {
        src: ['<%= lib_files.core %>', 'gen/angular-panel.tpl.js'],
        dest: 'dist/angular-panel.js'
      }
    },

    copy: {
      css: {
        src: ['<%= lib_files.css %>'],
        dest: 'dist/angular-panel.css'
      }
    },

    ngtemplates: {
      app: {
        options: {
          module: 'angularPanel',
          prefix: 'templates/ab-panel'
        },
        cwd: 'src/partials',
        src: ['panel.tpl.html', 'panelbody.tpl.html'],
        dest: 'gen/angular-panel.tpl.js'
      }
    },

    clean: ['dist', 'gen'],

    connect: {
      server: {
        options: {
          port: 9001,
          base: ['./'],
          open: 'http://localhost:9001/demo'
        }
      }
    },

    watch: {
      scripts: {
        files: ['Gruntfile.js', '<%= lib_files.core %>'],
        tasks: ['jshint:all', 'dist']
      },

      livereload: {
        options: {
          livereload: true
        },
        files: ['src/**/*.*'],
        tasks: ['jshint', 'copy:css', 'ngtemplates', 'concat:dist']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      all: ['Gruntfile.js', '<%= lib_files.core %>']
    },


    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/angular-panel.min.js': 'dist/angular-panel.js'
        }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('default', ['jshint:all']);

  grunt.registerTask('dist', function () {
    grunt.task.run(['clean', 'default', 'copy:css', 'ngtemplates', 'concat:dist', 'uglify:dist']);
  });

  grunt.registerTask('serve', 'start the demo', [
    'default',
    'connect:server',
    'watch:livereload']);

};
