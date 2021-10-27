---
description: ""
title: Footer
weight: 100
---

Docport's Footer displays what you want !

![footer](screenshot.png?classes=border,shadow)

## Set your footer

Create a `_layout/footer/_index.md` page in content root folder. 
Its content is what you get in the footer

```bash
	content/
	└──	_layout
		   └── footer
				├──	_index.md
				└──	_index.fr.md
```

This allow you to define a localized footer content.

{{%alert info%}}**Tip :** You can put a full HTML content in your `_index.md` file{{%/alert%}}

## Hide site footer
Set `hide: footer` in your page's frontmatter, see [an example here]({{%relref "examples/page without footer"%}})

