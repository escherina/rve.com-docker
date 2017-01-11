---
title:  "Using gulp to manage a Jekyll build process"
date:   2017-01-10 13:20:00 +0000
---
I like to use [gulp](http://gulpjs.com/), a task runner, to manage my build of Jekyll. Although Jekyll's out-of-the-box commands `jekyll build` and `jekyll serve` give perfectly acceptable results, they're missing some features I want as a developer, such as autoprefixer and sourcemaps for CSS, JavaScript concatenation, image optimisation, CSS and JS minification, automatic refreshing of the browser whenever I change a file, CSS and JS linting... all these and more are possible using a task runner like [gulp](http://gulpjs.com/) or [Grunt](http://gruntjs.com/).

Let's get started!

### Setup

- [Install Jekyll](https://jekyllrb.com/docs/installation/) and create a new Jekyll project somewhere on your computer.
- Install [Node.js](https://nodejs.org/).

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

Let's take a look at the theme files that Jekyll uses by default. In your terminal, type `bundle show minima` (minima is the name of the default theme). You'll get a folder location on your computer, e.g. `D:\Ruby22\lib\ruby\gems\2.2.0\gems\minima-2.1.0`. 