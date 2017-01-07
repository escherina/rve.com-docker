---
title: "Font loading performance: a comparison"
date: 2016-01-31
---
### Option 1: Base64 encoding and embedding into css file
**Pros:**
<ul class="list-nomargin">
  <li>No flash of invisible text</li>
  <li>Reduces HTTP requests</li>
</ul>
**Cons:**
<ul class="list-nomargin">
  <li>Results in a massive css file, even gzipped</li>
  <li>All the font formats are in one massive file - we could split them up
  into different files, but then would have to find a way to serve the right
  format to the right browser</li>
  <li>Should probably be loaded separately, even asynchronously, from the main
  stylesheet. More pain than it's worth for a small portfolio site.</li>
</ul>
### Option 2: Pure Google fonts
**Pros:**
<ul class="list-nomargin">
  <li>Fast</li>
</ul>
**Cons:**
<ul class="list-nomargin">
  <li>Flash of unstyled text on body font, even on fast connections (though not
    on the title font, which is the first thing on the page. Not sure why.)</li>
</ul>
### Option 3: Subsetting Google fonts
**Pros:**
<ul class="list-nomargin">
  <li>Faster than loading the full font</li>
</ul>
**Cons:**
<ul class="list-nomargin">
  <li>Can only do this for the main title, or where we know exactly what the
  text will be beforehand</li>
  <li>Anyone using Google Translate on the webpage may end up with a
  weird-looking mix of fonts on the title</li>
</ul>
### Option 4: Self-hosting font files
**Pros:**
<ul class="list-nomargin">
  <li>No flash of unstyled text</li>
  <li>Smaller file size than base64 option</li>
</ul>
**Cons:**
<ul class="list-nomargin">
  <li>Flash of invisible text on very slow connections (regular to good 2G) as
  the font is loaded</li>
</ul>
