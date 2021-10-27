---
description: ""
title: Header
weight: 10
---

Docport's Header displays Site Title and Site shortcuts.

![header](screenshot.png?classes=border,shadow)

## Site Title
As defined in site `config.toml`


## Site shortcuts (Top level menu)
If you want to add a link to a page or an external site to this menu, add it in `config.toml`, specifying the weight to order them.

```toml
	[[menu.shortcuts]]
	name = "Github"
	identifier = "ds"
	url = "https://github.com/vjeantet/hugo-theme-docport"
	weight = 10

	[[menu.shortcuts]]
	name = "Download"
	url = "https://github.com/vjeantet/hugo-theme-docport/archive/master.zip"
	weight = 11

	[[menu.shortcuts]]
	name = "Hugo Documentation"
	identifier = "hugodoc"
	url = "https://gohugo.io/"
	weight = 20

	[[menu.shortcuts]]
	name = "Credits"
	url = "/docport-theme/credits/"
	weight = 30
```

[{{%icon star %}} Read more about hugo and menu here](https://gohugo.io/extras/menus/)

## Overide header content

Create a `_layout/header/_index.md` page in content root folder. 
Its content is what you get in the header (site shortscurs remains)

```bash
	content/
	└──	_layout
		   └── header
				├──	_index.md
				└──	_index.fr.md
```

This allow you to define a localized header content.

## Hide site header
Set `hide: header` in your page's frontmatter, see [an example here]({{%relref "examples/page without header"%}})