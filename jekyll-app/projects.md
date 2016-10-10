---
title: Projects
layout: default
order: 2
---

<div class="grid-container">
  {% for project in site.projects %}
  <figure class="grid-item">
    <a href="{{ project.url | prepend: site.baseurl }}">
    {% if project.feature_image %}
    {% picture grid {{ project.feature_image }} alt="{{ project.title }}" %}
    {% endif %}
    <figcaption class="grid-item__caption">{{ project.title }}</figcaption></a>
  </figure>
  {% endfor %}
</div>
