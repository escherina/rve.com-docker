var gulp = require('gulp');
var runSequence = require('run-sequence');

// Run all tasks needed for the build in order

gulp.task('build', function(callback) {
  runSequence('delete',   // delete assets folder
  [
    'jekyll',             // in parallel, create jekyll site
    'sass',               // css from sass files
    'scripts',            // concat js
    'scripts_noconcat',   // move non-concated js
    //'images',           // copy images to assets folder
    'copy:fonts'
  ],
  'images',
  'base64',               // inline small PNG files in css files
  callback);
});
