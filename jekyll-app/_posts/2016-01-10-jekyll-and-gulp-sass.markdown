---
title:  "Jekyll and gulp-sass"
date:   2016-01-10 13:20:00 +0000
---
Jekyll has its own built-in Sass processor, which works fine. But what if you want to use [gulp-sass](https://www.npmjs.com/package/gulp-sass) or an equivalent, instead?

## How Jekyll handles Sass

### Default behaviour:
Out of the box, Jekyll has partial Sass files into `/_scss` and, on build, will compile them into one css file in the location of `main.scss` file (by default this is `/css`). This what you'll get with a fresh install of Jekyll:

{% highlight text %}
/_includes
/_layouts
/_posts
/_scss
  _base.scss
  _layout.scss
  _syntax-highlighting.scss
/css
  main.scss
_config.yml
about.md
feed.xml
index.html
{% endhighlight %}

Then on build, you'll get this in the `_site` directory (the default build location):

{% highlight text %}
/about
/jekyll
/css
  main.css
feed.xml
index.html
{% endhighlight %}

### Changing directory structure
For Jekyll to be able to correctly compile the partial and main scss files, `main.scss` has to start with two sets of triple dashed lines:

{% highlight YAML %}
---
# This file will be read by Jekyll
---
{% endhighlight %}

You can move your partials directory wherever you like, and then define the new location in `_config.yml`:

{% highlight YAML %}
sass:
  sass_dir: new_partials_directory
{% endhighlight %}

Similarly, you can move your output css directory simply by moving the location of your `main.scss` file. Remember not to put it into a folder starting with an underscore (like `_scss`, or a subfolder like `_assets/css`), because Jekyll ignores everything starting with an underscore when it builds the site, unless specifically told not to.
