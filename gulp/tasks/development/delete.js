var gulp = require('gulp');
var del = require('del');
var config = require('../../config').delete.development;

// delete folders and files from build/assets
gulp.task('delete', function(callback) {
  del(config.src, callback);
});
