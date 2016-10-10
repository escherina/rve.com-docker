var gulp = require('gulp');
var config = require('../../config').watch;

// Start BrowserSync task then watch files for changes
gulp.task('watch', ['browsersync'], function() {
  gulp.watch(config.jekyll, ['jekyll-rebuild']);
  gulp.watch(config.sass, ['sass', 'scss-lint']);
  gulp.watch(config.scripts, ['scripts', 'jshint']);
  gulp.watch(config.scripts_noconcat, ['scripts_noconcat']);
  gulp.watch(config.images, ['images']);
});
