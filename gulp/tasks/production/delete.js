var gulp = require('gulp');
var del = require('del');
var config = require('../../config').delete.production;

// delete folders and files from build/assets
gulp.task('delete:production', function(callback) {
  del(config.src, callback);
});
