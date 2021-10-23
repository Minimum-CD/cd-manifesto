---
date: "2017-04-24T18:36:24+02:00"
hidden: false
subpage: true
title: images
weight: 10
---

Images have a similar syntax to markdown links but include a preceding exclamation point.
```
	![myImage](image.jpeg)
```
![myImage](image.jpeg)

## Resizing image

Add HTTP parameters `width` and/or `height` to the link image to resize the image. Values are CSS values (default is `auto`).

```
	![myImage](image.jpeg?height=80px)
```
![myImage](image.jpeg?height=80px)


## Add CSS classes

Add a HTTP `classes` parameter to the link image to add CSS classes. `shadow` and `border` are available but you could define other ones.
```
	![myImage](image.jpeg?classes=border,shadow)
```
![myImage](image.jpeg?classes=border,shadow)
