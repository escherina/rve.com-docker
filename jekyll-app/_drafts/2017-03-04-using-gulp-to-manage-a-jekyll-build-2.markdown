---
title:  "Using gulp to manage a Jekyll build process, part 2"
date:   2017-03-04 13:20:00 +0000
---

In [the last post in this series](/articles/2017/01/10/using-gulp-to-manage-a-jekyll-build/), we:

- installed [Node.js](https://nodejs.org/) and [Jekyll](https://jekyllrb.com/)
- moved the Jekyll theme files back into the project directory
- installed [gulp](http://gulpjs.com/) and learned how to set up a basic gulp task
- created tasks to build the Jekyll site, serve it with BrowserSync, and watch files for changes

So far, we've been more or less emulating the default `jekyll build` and `jekyll serve` tasks. Now it's time to add in some extra functionality.

### 1. Create a task to compile Sass files

#### A. Stop Jekyll from compiling Sass files

By default, Jekyll will compile Sass files for us. Inside `/assets` is a file called `main.scss`. (The location of `main.scss` tells Jekyll where to place the compiled `main.css` file, so when we build Jekyll, the site's css file will appear in `./assets/main.css`.) Jekyll knows to process this file because at the top are two lines of triple dashes (called YAML front matter):

``` yml
---
# Only the main Sass file needs front matter (the dashes are enough)
---
```

We want to handle Sass compiling with gulp, so we need to decouple the process from Jekyll. This is really simple: all we need to do is delete the above lines from `main.scss`. Now Jekyll isn't touching the Sass files, and in fact, because they're in a hidden folder (`/_sass` &mdash; any folder starting with an underscore is ignored by Jekyll unless it contains YAML front matter), they won't even be copied to the `/_site` folder when Jekyll is built.

#### B. Restructure the Sass files

At the moment, this is what the project directory looks like:

```
/_includes
  -- layout partial files --
/_layouts
  -- layout files --
/_sass
  /minima
    _base.scss
    _layout.scss
    _syntax-highlighting.scss
  minima.scss
/_site
  -- compiled Jekyll site --
/assets
  main.scss
.gitignore
_config.yml
about.md
Gemfile
Gemfile.lock
index.md
```

The only reason that `main.scss` is located in `/assets` rather than in `/_sass` is because Jekyll was using it to determine where to place the compiled `main.css` file. It doesn't make sense for us to have it separate from the other Sass files, so let's put it back in the `/_sass` directory, leaving `/assets` empty for now:

```
/_includes
  -- layout partial files --
/_layouts
  -- layout files --
/_sass
  /minima
    _base.scss
    _layout.scss
    _syntax-highlighting.scss
  minima.scss
  main.scss
/_site
  -- compiled Jekyll site --
/assets
  -- empty --
.gitignore
_config.yml
about.md
Gemfile
Gemfile.lock
index.md
```

There's not much need to have both `minima.scss` and `main.scss`, so you could also copy the `@mixin` and `@import` sections from minima into main (replacing the existing `@import "minima"` line), and then delete minima.scss.

Or, you could delete all the theme's Sass files and use your own from here on out.

#### C. Writing the Sass task

We're going to need two new dependencies: the modules [gulp-sass](https://github.com/dlmanning/gulp-sass) and [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps). gulp-sass will compile our Sass files, and gulp-sourcemaps will add source maps. 

Install both dependencies: 

```
npm install gulp-sass gulp-sourcemaps --save-dev
```

In your gulpfile.js, require the two new modules, just under the others:

``` js
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
```

The task is going to:

1. Take a source file (our main Sass file; here it's `main.scss`)
2. Initialise the source map process
3. Compile Sass files into CSS
4. Write source maps to a location of our choosing
5. Pipe the resulting files to a destination directory

``` js
// Sass task: compile .scss files
gulp.task('sass', () => {
  // Location of source file. '.' is the project root
  return gulp.src('./_sass/main.scss') 
    // Initialise sourcemap generation:
    .pipe(sourcemaps.init())
    // compile Sass files
    .pipe(sass().on('error', sass.logError))
    // write sourcemaps into the /maps directory, inside gulp.dest
    .pipe(sourcemaps.write('./maps'))
    // Location of destination file(s). '.' is the project root
    .pipe(gulp.dest('./assets'))
})
```

There are further options you can explore with these two modules (e.g. change where source map files are created). See the documentation for [gulp-sass](https://github.com/dlmanning/gulp-sass) and [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) for more.

If we now run `gulp sass` in our terminal, we'll see a file called `main.css` appear in our `/assets` directory. We'll also have a source map file located at `/assets/maps/main.css.map`.

This is great, but at the moment it's not connected to our default gulp task in any way, and will only be run if we deliberately type `gulp sass`. Ideally, we'd like to have it run automatically whenever a `.scss` file changes. That means we need to watch the files with a gulp watch task.

### 2. Watching files with gulp

We are currently watching our Jekyll files for changes within our browsersync task:

``` js
// browserSync task: serve the site and watch for changes to files
gulp.task('browsersync', () => {
  browsersync({
    // Where to serve the files from (the build directory)
    server: {
      baseDir: '_site'
    },
    files: '_site/**', // watch the build directory for changes
    port: 4000 // optional, set it for a specific port
    })

  // Watch all these filetypes, and if they change, rebuild Jekyll
  gulp.watch('**/*.{html,markdown,md,yml,json,xml}', ['jekyll'])
});
```

We could add another line to keep an eye on our Sass files, too:

``` js
// Watch all these filetypes, and if they change, rebuild Jekyll
  gulp.watch('**/*.{html,markdown,md,yml,json,xml}', ['jekyll'])
// Watch all Sass files, and if they change, run the sass task
  gulp.watch('**/*.{scss,sass}', ['sass'])
```

This will partly work. Whenever we make a change to any of our Sass files, the sass task will fire and will recompile our Sass, including source maps. We'll get a new `main.css` in the `/assets` directory. However, we won't see any changes in our website in the browser, because:

1. Browsersync is only watching for changes in the `/_site` directory and won't refresh the page until it sees them
2. As part of the default gulp task, we've already run the Jekyll build task (which would place anything in `/assets` into the `/_site` directory). We'd need to run it again to get our newly changed `main.css` into the `/_site` directory.

There's a quick way to fix this. We know we need to place the output of our sass task into `/assets`, so that when the `jekyll` task runs in future, it'll put a copy into the `/_site` directory. We can add another line to put a copy of the output directly and immediately into the `/_site` directory. This will cause Browsersync to reload the page in the browser (since a file in `/_site` has changed) and it will make sure the correct css file is being used at all times. 

It has the added benefit of not re-running the Jekyll task, which seems unnecessary.

Here's the new sass task:

``` js
// Sass task: compile .scss files
gulp.task('sass', () => {
  // Location of source file. '.' is the project root
  return gulp.src('./_sass/main.scss') 
    // Initialise sourcemap generation:
    .pipe(sourcemaps.init())
    // compile Sass files
    .pipe(sass().on('error', sass.logError))
    // write sourcemaps into the /maps directory, inside gulp.dest
    .pipe(sourcemaps.write('./maps'))
    // Location of destination file(s). '.' is the project root
    .pipe(gulp.dest('./assets'))
    .pipe(gulp.dest('./_site/assets'))
})
```

#### Re-structuring the watch task

Our two gulp.watch tasks are currently sitting inside the browsersync task, but we'll need to add more as we continue to add tasks to our build process, e.g. watching JavaScript or image files. It's a bit cleaner to have one big watch task where we can easily see and control all the different files we're watching.

At the moment, this is how our gulpfile is structured:

1. We type `gulp` into the terminal, and the default task is initiated, but it won't run until its dependencies, the jekyll and browsersync tasks, are complete.
2. The jekyll and browsersync tasks are run.
  - The jekyll task is a one-time build of jekyll that begins and ends
  - The browsersync task serves the site and makes it accessible to us in the browser. It watches files in `/_site` and will reload the browser if anything changes.
    - Within the browsersync task is a gulp.watch task which will rebuild jekyll if any of the stated filetypes in the project folder change.
    - There is also a gulp.watch task which will run the sass task if any of the Sass files in the project folder change.

A better structure might be this:

1. The default gulp task is initiated. It won't run until its dependency, the watch task, is complete.
2. The watch task contains a line for watching jekyll files, and a line for watching Sass files. It won't run until its dependencies, the jekyll and browsersync tasks, are complete.
3. 