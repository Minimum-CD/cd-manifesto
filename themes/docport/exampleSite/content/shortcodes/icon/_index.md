---
date: "2020-09-08T20:40:23Z"
description: Display an icon.
title: icon
---

Display one of the 2 298 icons like 
{{% icon name="fa-address-card" size="64px" %}}
{{% icon name="fa-bell" size="32px"%}} 
{{% icon fa-apple b %}} 

It uses :

* font-awesome 5 free icons library .[more info here](https://fontawesome.com/icons?d=gallery&s=brands,solid&m=free/)

This `icon` shortcode will display an icon in your page. 

## Usage

| Parameter | Default | Description |
|:--|:--|:--|
| name | **required** | name of icon (see bellow) |
| size | none | size of icon, medium, xx-small, x-small, small, large, x-large, xx-large, 11px, 2em, 20%.... |
| style | `fas` | use `fas` for solid or `fab` for brands [see here](https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use)|

{{%alert info%}}
**Tips :**
setting only the name as argument works too : 
```{{</*icon fa-film*/>}}` instead of `{{</*icon name="fa-film"*/>}}```

Type a `b` letter after the name to use the brand version of FontAwesome
```{{</*icon fa-facebook b*/>}}` instead of `{{</*icon name="fa-film"*/>}}```


{{%/alert%}}

## Demo
```
	{{</* icon name="fa-save" size="64px" */>}}
	{{</* icon name="fa-save" size="32px" */>}}
	{{</* icon fa-save */>}}
```
{{<icon name="fa-save" size="64px">}}
{{<icon name="fa-save" size="32px">}}
{{<icon fa-save>}}

```
	{{</* icon name="fa-github" style="fab" size="64px" */>}}
	{{</* icon name="fa-github" style="fab" size="32px" */>}}
	{{</* icon fa-github b */>}}
```
{{<icon name="fa-github" style="fab" size="64px">}}
{{<icon name="fa-github" style="fab" size="32px">}}
{{<icon fa-github b>}}


## icons available
* https://fontawesome.com/icons?d=gallery&s=brands,solid&m=free/