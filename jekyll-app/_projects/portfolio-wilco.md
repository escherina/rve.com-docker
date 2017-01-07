---
title: "Portfolio site - Wilco van Esch"
date: 2016-09-15
feature_image: projects/placeholder3.png
feature_desc: "Portfolio site - large screen view"
project_tags:
  - Jekyll
  - Liquid templating
  - gulp
  - Docker
  - HTML5
  - JavaScript
  - CSS
  - Sass
  - responsive design
  - photography
---

### The Brief
We wanted

### Content

- jekyll ideal for a simple, fast static site
- user is tech savvy and can cope with command line
- used gulp to run the whole jekyll process

### Style
- Super clean and professional
- Focus on content
- mobile-first, enlarging everything for large screen sizes

### Menu
I considered using a JavaScript-enabled hamburger menu on small screens to keep the design uncluttered. I coded up a prototype during development for Wilco's consideration (similar to [this one on my CodePen](http://codepen.io/escherina/pen/pyxYqz)), but we decided there weren't enough pages on the site to justify hiding them away.

Instead, I used my initial idea: a menu bar to the side of the content on larger screens, and above it on smaller ones, with no JavaScript needed.

To generate the menu structure I used a Jekyll data file (a `.yml` file located in the `_data` folder) and looped through it:

{% raw %}
``` html
<nav>
  <ul class="nav-main">
  {% for nav in site.data.nav %} <!--loop through nav.yml -->
    {% if nav.subcategories != null %} <!-- if the menu item has a nested ul sub-menu -->
      <li class="nav-main__child">
        <a href="{{ nav.href | prepend: site.baseurl }}">{{ nav.title }}</a>
        <ul class="nav-main__submenu">
        {% for subcategory in nav.subcategories %}
          <li class="nav-main__submenuchild">
            <a href="{{ subcategory.subhref | prepend: site.baseurl }}">{{ subcategory.subtitle }}</a>
          </li>
        {% endfor %}
        </ul>
      </li>
    {% else %} <!-- if the menu item doesn't have a nested ul sub-menu -->
      <li class="nav-main__child">
        <a href="{{ nav.href | prepend: site.baseurl }}">{{ nav.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
  </ul>
</nav>
```
{% endraw %}

### Images

For a little added performance, I used responsive images. The [Jekyll Picture Tag gem](https://github.com/robwierzbowski/jekyll-picture-tag) made this pretty straightforward - you use a Liquid tag and single source image in your page/post, and it automatically generates responsive images according to your settings. Since it uses the `<picture>` element, I included the [Picturefill](https://github.com/scottjehl/picturefill) polyfill to cover older browsers.

I took Wilco's headshot using a Canon EOS 350D DSLR with a telephoto lens and processed the RAW image in Photoshop.

I was keen to use SVG icons instead of icon fonts. I used a `<symbol>` element for each icon and referenced them, where needed, with `<use>`.

The only problem with this method is that IE9-11 and Edge 12 don't allow you to reference an external file, only the current document. I initially balked at inlining the entire SVG in every html file - the svg wouldn't be cached, it was adding bloat to every page. On the plus side, I only had six icons, and the pages are pretty lightweight to begin with. For a larger site I would try using AJAX to pull them in after page load.

### Performance

- details go here

### Development tools

- photoshop for headshot
- gulp to run jekyll process
- gulp to optimise assets
