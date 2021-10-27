---
description: Control how the home page should be rendered
title: Home page
weight: 10
---

{{% alert theme="success" %}}By default, this theme use the first section (folder) available in your content folder as a homepage.{{%/alert%}}

## Create a dedicated homepage
Create a `_index.md` in `content` root folder.

```text
	content
	├── _index.md  <-- if this file exists, it is the landing page
	└── section-one/ <-- else this section will be the home page
	    
```

## Landing page appearance
Remove navigation components from your landing page by setting options in its page frontmatter. You will be able to hide header, breadcrum, toc or footer...
* see `hide` options [here]({{%relref "00-adding-content#page-frontmatter"%}})
* see [examples of pages]({{%relref "/examples"%}}) rendered with theses options 

{{%notice success%}}
**Nothing but my content !**
\
set `type="raw"` in your home page frontmatter : only your content will be rendered, without menu, toc, headers, etc..... [example]({{%relref "/examples/page with raw content"%}})
{{%/notice%}}

## Use plain HTML for your homepage
Remember that hugo allows you to write your content with HTML when markdown if not enough. very usefull for a landing page !

Example
```yaml
---
title: Homepage
type: raw
---
<div class="myHome">
	Hello
</div>
```

