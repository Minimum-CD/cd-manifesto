---
date: "2020-08-20T16:31:33.621Z"
description: search engine
post: ""
title: Search Engine
weight: 400
---


Docport theme uses the last improvement available in hugo version 20+ to generate a json index file ready to be consumed by lunr.js javascript search engine.

hugo generate lunrjs index.json at the root of `public` folder if the site only has one language or within each language subfolder. 

{{%notice warning%}}When you build the site with `hugo server`, hugo generates it internally and of course it don't show up in the filesystem{{%/notice%}}


## Disable search
You can disable this functionality with `disableSearch` param in you site `config.toml`


``` toml
	[params]
	disableSearch = true
```
