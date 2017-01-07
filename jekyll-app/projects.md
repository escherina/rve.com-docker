---
title: Projects
layout: default
order: 2
---

<div class="grid-container">
  {% for project in site.projects reversed %}
  <figure class="content content--grid">
    <a href="{{ project.url | prepend: site.baseurl }}">
      {% if project.feature_image %}
      {% picture grid {{ project.feature_image }} alt="{{ project.title }}" %}
      {% endif %}
      <figcaption>{{ project.title }}</figcaption>
    </a>
  </figure>
  {% endfor %}
</div>
