var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageminJpegoptim = require('imagemin-jpegoptim');
var size = require('gulp-size');
var config = require('../../config').optimize.images;

gulp.task('optimize:images', function() {
  return gulp.src(config.src)
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminJpegoptim({progressive: true, max: 85}),
      imagemin.optipng(),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(config.dest));
});
