---
title: "Wedding website"
date: 2016-01-14
feature_image: projects/wedsite/wedding-site_large.jpg
feature_desc: "Wedding website - large screen view"
project_tags:
  - Wordpress
  - HTML5
  - CSS
  - Photoshop
  - photography
  - responsive design
---
### The Brief

Build a responsively-designed wedding website with the following requirements:

- Wedding information page (especially hotels and travel) for guests from two different countries
- Ability to quickly switch between two language versions, English and Dutch
- RSVP form with an easy-to-use backend, custom questions and the ability to RSVP for other members of your group
- Quick build time&mdash;the site needed to be up and running as soon as possible

I've worked with WordPress in the past and was immediately able to find plugins for the most important requirements: multiple-language pages and the RSVP form. With these elements in place, I knew I could build the rest of the site relatively quickly due to my experience with the platform.

I used mqTranslate (which no longer exists, but its successor is [qTranslate-X](https://wordpress.org/plugins/qtranslate-x/)) and the [RSVP and Event Management plugin](https://wordpress.org/plugins/rsvp/). Much of the RSVP form text was hard-coded into the plugin, so I manually edited the plugin files to check if the language was set to Dutch, and if so, to output appropriate text. I also edited the form validation JavaScript so that the error messages would show up in both languages.

### Design

This was largely informed by a LEGO mini-figure theme which extended into the cake topper and take-home gifts for our guests. We ordered mini-figure parts to create custom LEGO versions of ourselves. I then photographed the mini-figures and took the images into Photoshop for editing, enhancement and background removal.

Our original colour scheme leaned more towards grey-blue and copper. After seeing these colours on screen, we decided brighter was better, and instead went with sky-blue and orange for the website and invitations.

With the fonts, I wanted to echo a traditional wedding invitation but pair it with something bold and modern to go with our colour choices and large feature image. There are plenty of swirly, pretty calligraphic fonts around, but readability was very important, so I chose [Great Vibes](https://www.google.com/fonts/specimen/Great+Vibes) for the lead-in ("The marriage of..."), [Bebas Neue](https://www.fontsquirrel.com/fonts/bebas-NEUE) for the rest of the title, and [Ostrich Sans](https://www.fontsquirrel.com/fonts/ostrich-sans) for navigation links.


<figure class="project__img project__img--sm">
  {% picture project-sm projects/wedsite/wedding-site_small.jpg alt="Wedding website - small screen view" %}
</figure>

### Process

To start off, I made a Photoshop mockup to get a very general idea of the colours, main image placement and the styling for the site title. I recreated this in html and css, and then moved into WordPress theme files, using XAMPP for my local WordPress installation. I developed the site in the browser from here onwards, using a default theme as a starting point.

I stripped out almost all of the blog-related code&mdash;the site only contained pages&mdash; and kept the templates and css as lean as possible. The bulk of my time was spent getting the RSVP plugin to play nicely with multiple languages, something which it was not configured to do at the time. However, I felt that this was an important feature for our multi-national guests, and this paid off when most of them used the website to confirm their attendance.

To save time, I used [SlickNav](http://slicknav.com/) for the responsive mobile menu, and [jQuery Countdown](http://keith-wood.name/countdown.html) for the countdown timer&mdash;and for the Dutch version of the site, I conditionally loaded a Dutch version of the countdown script.

<figure class="project__img project__img--med">
  {% picture project-med projects/wedsite/wedding-site_medium.jpg alt="Wedding website - medium screen view" %}
</figure>

### What I'd do differently

This project was aimed at a very small group of people (only our guests had a password to the site). Nonetheless, with a bit more time I would have liked to do more with accessibility and performance:

- The main feature image could have been made responsive, with a smaller version served to small screens
- Check my use of ARIA roles and see if they could be improved
- Check contrast on text/backgrounds, and check colour scheme for colour-blind users
- Remove unnecessary dependencies, e.g. scripts relying on jQuery converted to vanilla JS
- Write my own navigation menu rather than using SlickNav
- Develop the site from a mobile-first perspective and progressively enhance
- Minify CSS and JS
