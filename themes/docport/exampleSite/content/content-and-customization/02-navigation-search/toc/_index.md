---
description: ""
title: Content right bar
weight: 50
---

With each page, a sidebar is displayed on the right side, with the current table of content.
* the 2 dashed rectangles are 2 position where you can inject custom content, see bellow

![header](screenshot.png?classes=border,shadow)

## Add content before the Table of content
(red dashed rectangle in the screenshot)

Create a `_index.md` page in `_layout/_sidepage-before` folder.

```bash
	content/
	└──	_layout
		   └── article-sidepage-before
				├──	_index.md
				└──	_index.fr.md
```

## Add content after the Table of content
(blue dashed rectangle in the screenshot)

Create a `_index.md` page in `_layout/_sidepage-after` folder.

```bash
	content/
	└──	_layout
		   └── article-sidebar-after
				├──	_index.md
				└──	_index.fr.md
```

{{%alert info%}}**Remember :** You can put a full HTML content in your .md files{{%/alert%}}

{{%alert info%}}**Tip :** You can remove search box if you need to [see more here]({{%relref "search"%}})

{{%/alert%}}


## Hide right sidebar
Set `hide: toc` in your page's frontmatter, see [an example here]({{%relref "examples/page without toc"%}})
