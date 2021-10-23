---
description: Disclaimers to help you structure your page
title: badge
---

{{% badge %}}primary _(default)_{{% /badge %}}
{{% badge warning %}}In progress{{% /badge %}}
{{% badge secondary %}}docport{{% /badge %}}
{{% badge success %}}beta{{% /badge %}}
{{% badge danger %}}danger{{% /badge %}}
{{% badge warning %}}warning{{% /badge %}}
{{% badge info %}}info{{% /badge %}}
{{% badge light %}}light{{% /badge %}}
{{% badge dark %}}dark{{% /badge %}}

## Shortcode markup {{% badge warning %}}new{{% /badge %}}
```
	{{%/* badge %}}primary _(default)_{{% /badge %}}
	{{% badge warning %}}In progress{{% /badge %}}
	{{% badge secondary %}}docport{{% /badge %}}
	{{% badge success %}}beta{{% /badge %}}
	{{% badge danger %}}danger{{% /badge %}}
	{{% badge warning %}}warning{{% /badge %}}
	{{% badge info %}}info{{% /badge %}}
	{{% badge light %}}light{{% /badge %}}
	{{% badge dark %}}dark{{% /badge */%}}
```





## Usage 
```
	{{%/*badge $style %}}Lorem ipsum{{%/badge*/%}}
```

| Parameter | Description |
|:--|:--|
| $style | type/color of badge |

