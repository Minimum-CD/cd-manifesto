---
description: ""
title: Menu
weight: 20
---


Docport's Menu displays your content structure on left.
* the 2 dashed rectangles are 2 position where you can inject custom content, see bellow
* menu entries are controled by each content page frontmatter options

![header](screenshot.png?classes=border,shadow)

## Menu entry labels
Each of your content/ folder sections are an entry, their `_index.md` file is used to get information about how to render each one, thanks to frontmatter.

{{%notice warning%}}
Reminder : [subpages]({{%relref "content-and-customization/00-adding-content#subpages"%}}) are not rendered in this menu
{{%/notice%}}

Bellow are all frontmatters options used to render a menu entry.\
Example from the current "Getting start" section.

```yaml
---
# Menu label
title: "Getting started"

# Hide this page from menu
hidden: false

# Prefix menu label with a text, an html...
pre: ""

# Suffix menu label with a text, an html...
post: "👋"

# Display this before the menu entry
head: "<hr/>"

# Keep this menu opened by default
alwaysopen: true

---
```



## Add content before menu entries 
(red dashed rectangle in the screenshot)

Create a `_index.md` page in `_layout/_sidepage-before` folder.

```bash
	content/
	└──	_layout
		   └── sidepage-before
				├──	_index.md
				└──	_index.fr.md
```

{{%alert info%}}**Remember :** You can put a full HTML content in your .md files{{%/alert%}}

{{%alert info%}}**Tip :** You can remove search box if you need to [see more here]({{%relref "search"%}})

{{%/alert%}}

## Add content after menu entries 
(blue dashed rectangle in the screenshot)

Create a `_index.md` page in `_layout/_sidepage-after` folder.

```bash
	content/
	└──	_layout
		   └── sidepage-after
				├──	_index.md
				└──	_index.fr.md
```


## Hide site menu
Set `hide: nav` in your page's frontmatter, see [an example here]({{%relref "examples/page without sidebar and toc"%}})

