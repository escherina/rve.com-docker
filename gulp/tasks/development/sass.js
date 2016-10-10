var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var browsersync   = require('browser-sync');
var sass          = require('gulp-ruby-sass');
var gulpFilter    = require('gulp-filter');
var autoprefixer  = require('gulp-autoprefixer');
var sourcemaps    = require('gulp-sourcemaps');
var config        = require('../../config');

// Generate CSS from SCSS & build sourcemaps

gulp.task('sass', function() {
  var sassConfig = config.sass.options;

  sassConfig.onError = browsersync.notify;

  // Don't write sourcemaps of soourcemaps
  var filter = gulpFilter(['*.css', '!*.map'], { restore: true });

  browsersync.notify('Compiling Sass');

  return sass(config.sass.src, sassConfig)
    .pipe(plumber()) // keeps gulp running if there's a sass syntax error
    .pipe(sourcemaps.init())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(filter)
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: 'jekyll-app/_assets/scss'}))
    .pipe(filter.restore)
    .pipe(gulp.dest(config.sass.dest));
});
