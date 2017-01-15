---
title: "Portfolio site - Wilco van Esch"
date: 2016-09-15
feature_image: projects/wilco-portfolio/wilco-portfolio_large.png
feature_desc: "Wilco's portfolio site - large screen view"
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
Wilco wanted his portfolio site to mostly act as a repository for his development documentation - a place where he could quickly look up his notes on projects or language quirks, and also share them with the wider developer community.

We decided this would best be achieved with a blog structure, but without most of the trappings of a full blogging system (no comments, no additional users). Categorisation and search functionality was important, however.

In terms of appearance, he wanted it to look clean, professional, and focussed on the content.

### Build tools

I decided to use [Jekyll](https://jekyllrb.com) to create a fast static site. I knew the main user would be tech savvy and comfortable with the command line, so it didn't seem necessary to use a full CMS.

After some previous experimentation with Jekyll, I found that a nice way to run the whole build process was to use [gulp](http://gulpjs.com/). In my setup, typing `gulp` into the terminal generates the Jekyll site, reloads the browser when you change files, generates CSS from Sass files (with sourcemaps and linting), concatenates JavaScript files (with sourcemaps and linting). I set up a `gulp publish` command to get the site assets optimised and ready for upload, and `gulp deploy` to upload it to a destination of my choice using rsync.

I used a couple of Jekyll plugins: [Jekyll Picture Tag](https://github.com/robwierzbowski/jekyll-picture-tag) and [Simple Jekyll Search](https://github.com/christian-fei/Simple-Jekyll-Search).

With Jekyll Picture Tag, I ran into some problems - I couldn't get the minimagick gem it requires to work on my Windows 7 machine. I'd just been reading about [Docker](https://www.docker.com/), and decided to try and use it to create a contained development environment. Not the typical usage for Docker, maybe, but it worked perfectly. I ran the build process inside a Docker container, linking it to local folders for the main Jekyll and build output folders so I could access and edit the files. The only difference to the user was that the main build command changed from `gulp` to `docker-compose up`.

### Style & Design
The client didn't have a definite idea of how he wanted the site to look, other than clean and professional. We decided on a mainly greyscale colour scheme with a couple of accent colours for links (blue) and highlights (orange).

I used the always-professional Open Sans for body text for ease of reading. Since the site was all going to be quite rectangular in appearance, I chose Quicksand, a slightly rounder font, for the site's logo.

To make it stand out a bit more, I added colour and animation to the logo on hover - the underline under the w turns orange and rolls out under the whole name.

It was important that the site be easily readable on mobile devices, so I started the design with a basic idea of how I wanted it to look on desktop (sidebar menu, footer, main content area) and then spend most of my time making sure that would translate well onto smaller screens.

<figure class="project__img project__img--sm">
  {% picture project-sm projects/wilco-portfolio/wilco-portfolio_small.png alt="Wilco's portfolio site - small screen view" %}
</figure>

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

### Categories and search

Categorisation is built in to Jekyll, so we defined three key categories (development, testing and automation) and made sure that every post had the correct category in its Front Matter.

The Simple Jekyll Search plugin works by creating a search.json file which populated at build time with all the search data (you choose what parts of your content are looped through). It then runs the search using JavaScript. This wasn't completely ideal, as I didn't want core site functionality to rely on the presence of JavaScript, but since I was using a static site generator there wasn't a lot of choice.

I decided to make search an enhancement to the site that wouldn't show up if JavaScript wasn't enabled, so I added class of `.js` to the html document when JavaScript is working correctly. I then hid the search bar by default, and made it only appear if this class was added. Users that don't have JavaScript won't even know there's a search function to be used. This approach won't be appropriate in every situation, but considering the size of the site and the requirements of the client, I felt it was a good balance.

### Images

For a little added performance, I used responsive images. The [Jekyll Picture Tag gem](https://github.com/robwierzbowski/jekyll-picture-tag) made this pretty straightforward - you use a Liquid tag and single source image in your page/post, and it automatically generates responsive images according to your settings. Since it uses the `<picture>` element, I included the [Picturefill](https://github.com/scottjehl/picturefill) polyfill to cover older browsers.

I took Wilco's headshot using a Canon EOS 350D DSLR with a telephoto lens and processed the RAW image in Photoshop.

I was keen to use SVG icons instead of icon fonts. I used a `<symbol>` element for each icon and referenced them, where needed, with `<use>`.

The only problem with this method is that IE9-11 and Edge 12 don't allow you to reference an external file, only the current document, meaning I had to inline the SVG files in each page's html. I initially balked at this - the svg wouldn't be cached and it was adding bloat to every page. On the plus side, I only had six icons to inline, and the pages are pretty lightweight to begin with, so it was an acceptable tradeoff.

<figure class="project__img project__img--med">
  {% picture project-med projects/wilco-portfolio/wilco-portfolio_medium.png alt="Wilco's portfolio site - medium screen view" %}
</figure>

### Performance

The home page has a total size of **117 KB** and makes **11** requests. According to [WebPageTest](https://www.webpagetest.org/), it loads in an average of **4.3 seconds** on a Motorola E on a "Slow 3G" connection, and in an average of **0.9 seconds** in Chrome on a "Cable" connection.

To achieve this, I did the following:

- Concatenated and minified JavaScript files
- Minified the CSS file
- Gzipped assets and defined a Cache-Control policy
- Optimised images and used responsive images to serve the right size to the user, depending on their device/resolution
- Scripts are asynchronously loaded, or loaded just before the closing `</body>` tag
- I used the bare minimum of JavaScript: only [Picturefill](http://scottjehl.github.io/picturefill/) (so the `<picture>` element works on older browsers) and the scripts that enable search functionality

The sizes of the main homepage assets:

- Scripts: **8.9 KB**
- CSS: **4.9 KB**
- Images: **69.4 KB**
- Fonts: **18.4 KB**

Something I might change in a future update is the font loading strategy; at the moment I'm using Google Fonts, but am keen to see if this can be improved.