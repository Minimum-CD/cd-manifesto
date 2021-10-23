---
date: "2017-04-24T18:36:24+02:00"
description: ""
title: As a SlideDeck
weight: 90
---

A basic .md file can be rendered as a reveal.js presentation full screen.

{{% notice %}}
**A page rendered as a SlideDeck** is a page that use the full screen to display its markdown content as a [reveals.js presentation](http://lab.hakim.se/reveal-js/).
\
[{{%icon aspect_ratio%}} click here to view an example]({{%relref "myslide.md"%}})

{{%/notice%}}

To tell Hugo to consider a page as a slidedeck, just add a `type="slide"`in then frontmatter of your page.

```yaml
---
type: "slide"
---
```


{{%alert success%}}**Tip :** You can, also, **embed presentation in a page** as a small box, using the [revealjs]({{% relref "shortcodes/revealjs/_index.md"%}}) shortcode in your md file.{{%/alert%}}


## Formating your content
Use your common Markdown syntax you use in Hugo, don't forget, you can put html tags too.

{{%notice info %}} Special syntax (in html comment) is available for adding attributes to Markdown elements. This is useful for fragments, amongst other things.
{{%/notice%}}

Please read the [{{%icon book%}} doc from hakimel](https://github.com/hakimel/reveal.js/#instructions)


## Presentation options
In the frontmatter of your page file, set **type** and **revealOptions** params

Your content will be served as a fullscreen revealjs presentation and revealOptions will be used to ajust its behaviour.
```yaml
---
title: "Test slide"
type: slide

theme: "league"
revealOptions:
  center: true
  controls: true
  history: false
  progress: true
  transition: concave
---
```
[read more about reveal options here](https://github.com/hakimel/reveal.js/#configuration)


## Slide Delimiters
When creating the content for your slideshow presentation within content markdown file you need to be able to distinguish between one slide and the next. This is achieved very simply using a  convention within Markdown that indicates the start of each new slide.

As both horizontal and vertical slides are supported by reveal.js each has it's own unique delimiter.

To denote the start of a horizontal slide simply add the following delimiter (dashes) in your Markdown:

```md
	---
```


To denote the start of a vertical slide simply add the following delimiter (underscores) in your Markdown:
```md
	___
```

By using a combination of horizontal and vertical slides you can customize the navigation within your slideshow presentation. Typically vertical slides are used to present information below a top-level horizontal slide.



For example, a very simple slideshow presentation can be created as follows

```md
---
title: "test"
type: "slide"

theme: "league"
revealOptions:
  center: true
  controls: true
  history: false
  progress: true
  transition: concave
---

# In the morning

___

## Getting up

- Turn off alarm
- Get out of bed

___

## Breakfast

- Eat eggs
- Drink coffee

---

# In the evening

___

## Dinner

- Eat spaghetti
- Drink wine

___

## Going to sleep

- Get in bed
- Count sheep

```

[{{%icon aspect_ratio%}} click here to view this page rendered]({{%relref "myslide.md"%}})
