---
title:  "Using gulp to manage a Jekyll build process"
date:   2017-01-10 13:20:00 +0000
---

I like to use [gulp](http://gulpjs.com/), a task runner, to manage my build of Jekyll. Although Jekyll's out-of-the-box commands `jekyll build` and `jekyll serve` give perfectly acceptable results, they're missing some features I want as a developer, such as autoprefixer and sourcemaps for CSS, JavaScript concatenation, image optimisation, CSS and JS minification, automatic refreshing of the browser whenever I change a file, CSS and JS linting... all these and more are possible using a task runner like [gulp](http://gulpjs.com/) or [Grunt](http://gruntjs.com/).

Let's get started!

### Setup

- [Install Jekyll](https://jekyllrb.com/docs/installation/) and create a new Jekyll project somewhere on your computer.
- Install [Node.js](https://nodejs.org/) (a prerequisite for installing gulp and some other dependencies).

Check everything's working properly by running `jekyll serve` from the command line, inside your project folder. You should be able to go to `http://localhost:4000` and see a site that looks like this:

<figure class="project__img project__img--lg">
  {% picture posts/2017-01-11_jekyll-new-site.png alt="De Tijgertjes - small screen view" %}
</figure>

### Making the theme files work for us

Your Jekyll project directory should look something like this (as of Jekyll 3.3):

``` text
/_posts
.gitignore
_config.yml
about.md
Gemfile
Gemfile.lock
index.md
```

There's not much in there, because Jekyll now uses a theme system, and bundles all the theme-related files into a gem which is installed in your Ruby directory. We don't want to use Jekyll's themes because we won't be using Jekyll to compile our Sass files - it's easier if everything is in our project directory.

Let's take a look at the theme files that Jekyll uses by default. In your terminal, type `bundle show minima` (minima is the name of the default theme). You'll get a folder location on your computer, e.g. `D:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/minima-2.1.0`, and the folder should look like this:

``` text
/_includes
  disqus_comments.html
  footer.html
  google-analytics.html
  head.html
  header.html
  icon-github.html
  icon-github.svg
  icon-twitter.html
  icon-twitter.svg
/_layouts
  default.html
  home.html
  page.html
  post.html
/_sass
  /minima
    _base.scss
    _layout.scss
    _syntax-highlighting.scss
  minima.scss
/assets
  main.scss
LICENSE.txt
README.md
```

`/includes` and `/_layouts` contain all the code that forms the structure of your site, and `/_sass` and `/assets` contain the styling. I like the new theme system Jekyll's using, but it's a little more difficult to have our task runner take control of the whole build process when a lot of the files are in a different part of the computer.

It's possible to overwrite theme files by including a copy of them in your project folder (see the Jekyll documentation for more on how to do that), but in this case I'm going to ignore the theme system and disconnect my project from the minima theme. First, we'll need to copy the `/includes`, `/_layouts`, `/_sass` and `/assets` folders (and their contents) directly into our project directory. Your project folder should now look like this:

``` text
/_includes
/_layouts
/_posts
/_sass
/assets
.gitignore
_config.yml
about.md
Gemfile
Gemfile.lock
index.md
```

Next, we'll remove all references to the minima theme.

1. In `_config.yml`, find the line `theme: minima` and delete it.
2. In `Gemfile`, find the line `gem "minima", "~> 2.0"` and delete it.

Check that the site still shows up with the proper styling and layout by running `jekyll serve`. It should look exactly the same, but Jekyll is now only using the files in our project directory.

### Setting up gulp and npm for our project

Let's go back to the command line and install gulp on our computer:

```
npm install gulp -g
```

Adding the `-g` makes it a global install, so we can run the gulp command anywhere.

We also need to create a package.json. This is a file that will help us interact with our project, will keep a record of all the dependencies we've installed (and which versions), and which ultimately makes it easy to share our project with others, if we want. There are lot of things you can do with a package.json file, but in our case, we'll just use it as a record of our packages and package versions.

We've installed Node.js, so we can use the command `npm init` to create a package.json. You'll be walked through the process in the terminal with a series of questions. Alternatively, you can run `npm init -y` to instantly create the package.json with some sensible defaults. (You can go back and edit it later.)

Although we installed gulp globally, we also need to install it locally for our project. Run `npm install gulp --save-dev`. The `--save-dev` flag instructs npm to save a reference to the gulp package in our package.json - it's listed under `devDependencies`.

### Our first gulp task

The first thing we want to do is have gulp take over the `jekyll serve` task. We'll use [BrowserSync](https://browsersync.io/) to automatically reload the browser whenever we change a file, and BrowserSync can actually serve the files for us as well.

Gulp runs using a file called `gulpfile.js`, which we'll put in our project directory. (If you try running the `gulp` command inside your project directory with no `gulpfile.js` present, it'll give you an error and say `No gulpfile found`.)

This is the structure of a basic gulp task (note that I'm using ES6):

``` javascript
// We require any needed modules at the top of the file
// Usually we need to have installed these with 'npm install'
const gulp = require('gulp');
const exampleTask = require('example-task')

// The gulp task
gulp.task('task-name', () => {
  return gulp.src('path/to/source/files')
    .pipe(exampleTask({ config goes here }))
    .pipe(gulp.dest('path/to/dest'))
})
```

This is what we're doing:

1. Require any modules we need to run the task. You'll always need to require gulp itself to be able to run `gulp.task`.
2. Create the gulp task, which consists of:
  - A name
  - An anonymous function, which:
      - takes a set of source files
      - 'pipes' them through our exampleTask (which will modify them in some way)
      - puts the changed files into a destination directory.

#### The default task

Gulp needs, at minimum, a task called 'default' to exist. So, let's create one! Put this in your `gulpfile.js`:

``` js
const gulp = require('gulp');

gulp.task('default', () => {
  console.log("Default gulp task is running!");
})
```

If you try running `gulp` in your terminal now, you'll see that message appear in the console.

#### The Jekyll tasks

Now let's write our task to run Jekyll and reload the browser on any file changes. We need to install the BrowserSync module:

```
npm install browser-sync --save-dev
```

