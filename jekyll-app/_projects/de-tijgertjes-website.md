---
title: "De Tijgertjes daycare website"
date: 2016-10-15
feature_image: projects/de-tijgertjes/de-tijgertjes_large.png
feature_desc: "De Tijgertjes daycare - large screen view"
---
## The Brief
Redesign a Dutch daycare website with a modern look and feel. Retain key brand elements (logo, colour scheme) but make the site more professional and welcoming. Build the site responsively, and restructure the content in the process.

## Content
Since there was a lot of redundant content and a confusing navigation structure in the original site, I did a complete content inventory and ran through it with the client to create a new structure. This let me see what clearly needed to be in the main navigation menu, and what could be hidden in a sub-menu. Overall, we simplified the site and combined many small pages, or removed them where they added no value to users.

I felt that only having a lengthy welcome message as the focal point of the home page was a little outdated and unhelpful for users, especially as many of them are likely to be busy parents. I looked at competitors in the same field to see what information they prioritised on their home pages. The client and I decided to focus on the daycare's location, a means of contact, and the menu, though we included a more concise welcome message further down the page. On the previous site, the contact form had only been linked to in page content, so we put it on the main menu to make it easier to find.

### Contact form

The original site had a contact form that required users to enter their full address, even for a simple query. This seemed like overkill, so I included a form with conditional fields instead. Now, users choose a type of inquiry, and the fields change to match.

### Events scheduling

When brainstorming the project with the client, a feature that came up was the ability to add and schedule events for the daycare. I added a plugin to allow the client to do this easily, and customised the output to be appropriate for a daycare.

<figure class="project__img project__img--sm">
  {% picture project-sm projects/de-tijgertjes/de-tijgertjes_small.png alt="De Tijgertjes - small screen view" %}
</figure>

## Style
It was important to the client to retain the brand colours (purple and orange), but the previous version of the website had used these heavily, with a purple background that felt claustrophic. I chose to use neutral colours (white and light grey) for most of the content, and used orange and purple as accent colours for links, the menu, and feature panels.

Going from the client's feedback on their previous website design, I used plenty of white space, legible fonts, and made sure to use an optimal line length to make it comfortable to read. The font size scales with the screen size, starting at 16px and going all the way up to 22px on the largest screens.

## Menu
The previous navigation on the site was a link-heavy dropdown menu. I wanted to simplify this, as there didn't seem to be enough content on the site to warrant users (especially mobile users) having to wade through sub-menus.

As part of the content inventory we had already created a much simpler structure, with seven key sections of the site. Only four of those had sub-menus, so I chose to selectively display a secondary menu on the relevant sections. However, I kept the sub-menu semantically correct even though they were displayed slightly separately, so that a screen-reader would jump correctly from an `<li>` to its nested `<ul>` when tabbing through.

For small screens, I created a simple drop-down with vanilla JavaScript.

## Logo
The original logo was only available as a small raster image, unsuitable for the flexible design, so I traced it in Illustrator and created a vector image. I used [SVGOMG](https://jakearchibald.github.io/svgomg/) to optimise the resulting SVG image. The original jpg logo was 130kb, and the new SVG version was 21kb - a saving of 109kb.

## Images
One of the main features of the site would be photos of the daycare centre, so I kept other images minimal. Inspired by a bee icon used on the original site, I drew my own in Illustrator, along with a rounded pencil. These were used in background images for feature sections. The total footprint for design-related images (excluding photos) on the site was just 27kb.

I used Wordpress's built-in responsive images feature for all user-uploaded images.

<figure class="project__img project__img--med">
  {% picture project-med projects/de-tijgertjes/de-tijgertjes_medium.png alt="De Tijgertjes - medium screen view" %}
</figure>

## Performance
Having an embedded Facebook iframe was a requirement for the home page that added to both page size and requests. To ensure this didn't block loading of the main content, I placed the embed late in the page.

The embedded Google Map element on the home page is loaded with `async defer`, so while it also adds to the page load, it doesn't affect the speed with which the rest of the content loads.

Average page size across the site is 359KB, although this is skewed by the home page and gallery pages. Not including these, average page size is 239.5KB.


## Development tools
I installed Wordpress locally using XAMPP, then used Gulp to speed up a few tasks when creating my theme:

- generate CSS from my SCSS files and watch files for changes
- build sourcemaps
- use Autoprefixer
- optimise my CSS, once ready for deployment

##
