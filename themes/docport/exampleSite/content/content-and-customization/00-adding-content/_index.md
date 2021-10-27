---
creatordisplayname: Valere JEANTET
creatoremail: valere.jeantet@gmail.com
date: "2020-09-08T22:49:36.481Z"
description: This page tells you how to use the theme to add and structure your site
  content.
head: ""
hidden: false
lastmodifierdisplayname: Valere JEANTET
lastmodifieremail: valere.jeantet@gmail.com
layout: ""
pre: ""
tags:
- tag1
- tag2
title: Adding content
weight: 1
---
{{% notice %}}This page tells you how to use the theme to add and structure your site content.{{% /notice %}}

## Content root directory

You add content for your site under the `content` root directory of your Hugo site project. 
The files in your content root directory are typically grouped in subdirectories corresponding to your site’s sections.

We’ll look at in the following chapter.

## Content sections

With docport, **Each content page composes the site and navigation structure**, they shape the structure of your website.

Create a folder for each section and their sub sections, and a `_index.md` in each folder which will act as the section's content.
{{%notice%}}You can add any other page.md in section folder, they will be treated as "[subpages]({{< ref "#subpages" >}})"{{%/notice%}}

To link pages to each other, place them in a folders hierarchy.

```text
	content
	└── section-one/			
	    ├── _index.md
	    └── section-one-two/ 	
	        ├── _index.md 		
	        ├── section-one-two-three-A/	
	        │   ├── _index.md
	        └── section-one-two-three-B/ 	
	            ├── _index.md 	<-- section's page 
	            ├── pageA.md  <-- "subpages"
	            └── pageB.md  <-- "subpages"
```

## Subpages

Subpages are contents which belong to the section, and are displayed bellow section's title in the page. \
Subpages are not displayed in left menu.

If you look at the current page title, you will see 3 links which reference its 3 subpages.
![](subpages.png?height=60px&classes=border,shadow)

## Page frontmatter

Each page file in a Hugo site has metadata frontmatter that tells Hugo about the page. You specify page frontmatter in TOML, YAML, or JSON. \
Use the frontmatter to specify the page title, description, creation date, link title, template, menu weighting, and even any resources such as images used by the page. You can see a complete list of possible page frontmatter in [Front Matter](https://gohugo.io/content-management/front-matter/).

On top of the [existing ones](https://gohugo.io/content-management/front-matter/), DocPort comes with additional params to control what and how to display your content, their entry in left menu or behaviour.

```yaml
---
title: "Adding content"

# order sections
weight: 10 

# Hide some page components
hide:
- header
- nav
- breadcrumb
- toc
- nextpage
- footer

# subpage
subpage: false # usefull when you want to force a sub section to be considered as a subpage

# Redirect to another content
# Set a full URL or a .md path
# examples : 
#  redirect = "https://github.com/vjeantet" 
#  redirect = "folder" 
#  redirect = "folder/_index.md" 
redirect: "folder/_index.md"

# Do not include this page in search results
nosearch: true
---
```

{{%alert success%}}More frontmatter params exists to control how to display you content in the navigation, see [Navigation & Search]({{%relref "02-navigation-search" %}}) in the left menu.{{%/alert%}}