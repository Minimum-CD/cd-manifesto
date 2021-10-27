---
subpage: true
title: CSS & JS
---

## Add custom CSS and JS into the \<head\> part of each page :

Create a file as `layouts/partials/head.html` 

```bash
	content/
	layouts/
	└── partials/
		└──	head.html
```

write your own content like :
```html
<link rel="stylesheet" href="/css/custom.css">
<script src="/js/custom.js"></script>
```

Then override the style your want to change in `static/css/custom.css` (in this case, to avoid altering the casing of titles):
```css
h2 {
    text-transform: none;
}
```

And execute some additional JavaScript from `static/js/custom.js` (note that jQuery is already loaded by the theme):
```javascript
function tweakPage() {
    // make some changes here
}

$(tweakPage)
```

now feel free to add the JS, CSS code you want :)

## Add custom HTML before and after key elements of this theme

* @see [site placeholders]({{%relref "02-navigation-search"%}})

## Overide existing CSS or JS

Create the matching file in your static folder, hugo will use yours instead of the theme's one.

