---
hidden: true
date: "2017-04-24T18:36:24+02:00"
description: ""
title: As a Skwad
weight: 190
post: "&nbsp;<span class='badge badge-danger'>beta</span>"
---

A basic .md file can be rendered as a form/checklist/questionnaire.

{{% notice %}}
**A page rendered as a Skwad** is a page with a special rendered TOC, and a LOAD/DOWNLAOD form results buttons.
\
[{{%icon aspect_ratio%}} click here to view an example]({{%ref "ex-checklist/_index.md"%}})

{{%/notice%}}

To tell Hugo to consider a page as a skwad, just add `skwad` options in the frontmatter of your page.

```yaml
---
skwad:
  clientside: true # Display Load From File and Save To File buttons
  mode: form # set "form" for standard form submission or "api" to use Skwad API 
  url: https://localhost:5555/ # Form Action URL (mode=form) or Skwad base API (mode=api) 
  spaceName: appsec # spaceName for Api
---
```

## Dedicated shortcodes
* c/text - a line or box input type
* c/choices - a radiogroup or a checkboxgroup
* c/list - a select or a multiselect
* c/check - a checkbox
* c/switch - a switch
* c/show - display a part with a condition using user inputs
* c/hidden - set a hidden value

## Examples & Demos

{{%children style="li" description="true" showhidden="true"%}}
