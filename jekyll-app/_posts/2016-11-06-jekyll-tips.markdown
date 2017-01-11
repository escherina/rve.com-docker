---
title:  "Writing Liquid tags in code examples on the page"
date:   2016-12-06S
curlybracket: "{"
---

You need to enclose your code in the `{{page.curlybracket}}% raw %}` and `{{page.curlybracket}}% endraw %}` Liquid tags.

``` html
{{page.curlybracket}}% raw %}
<nav>
  <ul class="nav-main">
  {{page.curlybracket}}% for nav in site.data.nav %} <!--loop through nav.yml -->
    {{page.curlybracket}}% if nav.subcategories != null %} <!-- if the menu item has a nested ul sub-menu -->
      <li class="nav-main__child">
        <a href="{{page.curlybracket}}{ nav.href | prepend: site.baseurl }}">{{page.curlybracket}}{ nav.title }}</a>
        <ul class="nav-main__submenu">
        {{page.curlybracket}}% for subcategory in nav.subcategories %}
          <li class="nav-main__submenuchild">
            <a href="{{page.curlybracket}}{ subcategory.subhref | prepend: site.baseurl }}">{{page.curlybracket}}{ subcategory.subtitle }}</a>
          </li>
        {{page.curlybracket}}% endfor %}
        </ul>
      </li>
    {{page.curlybracket}}% else %} <!-- if the menu item doesn't have a nested ul sub-menu -->
      <li class="nav-main__child">
        <a href="{{page.curlybracket}}{ nav.href | prepend: site.baseurl }}">{{page.curlybracket}}{ nav.title }}</a>
      </li>
    {{page.curlybracket}}% endif %}
  {{page.curlybracket}}% endfor %}
  </ul>
</nav>
{{page.curlybracket}}% endraw %}
```

To get `{{page.curlybracket}}% raw %}` and `{{page.curlybracket}}% endraw %}` to show up in the above code block I used another method. I created a page variable inside the Front Matter of the post:

```
---
title:  "Jekyll tips"
date:   2016-11-06
curlybracket: "{"
---
```

And I then use it to replace the first curly bracket of the Liquid tag, like so: {% raw %}`{{page.curlybracket}}% raw %}`{% endraw %}.
