---
subpage: true
title: Colors
---

By default, a site using docPort has the theme’s default color.\
However, if you want your own color scheme (and you probably will!) you can very easily override the theme defaults with your own project-specific values - Hugo will look in your project files first when looking for information to build your site. 

This theme use 2 colors, named as "main" and "second" color and compute other colors from them.

You can set theses colors by editing the **site config.toml** file.

## Main color
This color is mainly used on left menu, a darker version is used for header background and content text.

{{% notice primary %}}When omited, a random value is computed on build{{%/notice%}}

```toml
	[params]
	color_main = "#B0B0B0"
```

## 2nd color
This color is mainly used for links.\
When omited, this color is computed from main color with a saturated calculation.

```toml
	[params]
	color_second = "red"
```

## Random colors
![](rainbow.gif?height=64px)
Comment theses two params in your config.toml, you will have random colors on each build... :)



Examples of random colors

![](color001.png?height=300px&classes=border,shadow)
![](color002.png?height=300px&classes=border,shadow)
![](color003.png?height=300px&classes=border,shadow)
![](color004.png?height=300px&classes=border,shadow)
![](color005.png?height=300px&classes=border,shadow)
![](color006.png?height=300px&classes=border,shadow)
