var gulp    = require('gulp');
var rev     = require('gulp-rev');
var through = require('through2');
var fs = require('fs');
var config = require('../../config').revision;

var rmOrig = function () {
  return through.obj(function (file, enc, done) {
      this.push(file);

      if (!file.revOrigPath) {
        return done();
      }

      fs.unlink(file.revOrigPath, function (err) {
        done();
      });
    });
  };

gulp.task('revision', function() {
  return gulp.src(config.src.assets, { base: config.src.base })
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rev())
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rmOrig())
    .pipe(rev.manifest({ path: config.dest.manifest.name }))
    .pipe(gulp.dest(config.dest.manifest.path));
});
