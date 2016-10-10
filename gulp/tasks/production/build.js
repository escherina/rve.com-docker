var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build:production', function(callback) {
  runSequence('delete:production', 'jekyll:production',
  [
    'sass',
    'scripts',
    'scripts_noconcat',
    //'images',
    'copy:fonts'
  ],
  'base64',
  'images',
  [
    'optimize:css',
    'optimize:js',
    'optimize:images',
    'copy:fonts:production'
  ],
  'revision',
  'rev:collect',
  callback);
});
