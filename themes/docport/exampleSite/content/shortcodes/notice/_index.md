---
description: Disclaimers to help you structure your page
title: Notice
---

{{% notice primary summary %}}
The **notice** shortcode highlights a text with a solid vertical line in front of your text.
\
You may add a label to your notice which will be displayed on top of it.
{{% /notice %}}

## Usage 
```
	{{%/*notice $color $label %}}Lorem ipsum{{%/notice*/%}}
```

| Parameter | Description |
|:--|:--|
| $color | type/color of notice |
| $label | label displayed on top (default to the type) |

## Examples

{{% notice success %}}Lorem ipsum dolor sit amet, consectetur.{{% /notice %}}
{{% notice %}}**Lorem !**\
 ipsum dolor sit amet, consectetur.{{% /notice %}}
{{% notice warning %}}**Lorem** ipsum dolor sit amet, consectetur{{% /notice %}}
{{% notice danger Attention %}}ipsum dolor sit amet{{% /notice %}}

{{% expand "Show shortcode markups..." %}}
```
	{{%/* notice success %}}Lorem ipsum dolor sit amet, consectetur{{% /notice %}}
	{{% notice  %}}**Lorem !**\
 ipsum dolor sit amet, consectetur.{{% /notice %}}
	{{% notice warning Warning%}}**Lorem** ipsum dolor sit amet, consectetur{{% /notice %}}
	{{% notice danger Attention %}}ipsum dolor sit amet{{% /notice{{% /notice */%}}
```
{{% /expand %}}


## Colors

| Type | code |
|:--|:--|
| {{% notice %}}This is the default notice.{{% /notice %}} | <small>{{%/* notice %}}<br>This is the default notice.<br>{{% /notice */%}}</small> |
| {{% notice primary %}}This is a primary notice.{{% /notice %}} | <small>{{%/* notice **primary** %}}<br>This is a notice.<br>{{% /notice */%}}</small> |
| {{% notice secondary %}}This is a secondary notice.{{% /notice %}} | <small>{{%/* notice **secondary** %}}<br>This is a notice.<br>{{% /notice */%}}</small> |
| {{% notice success %}}This is a success notice.{{% /notice %}} | <small>{{%/* notice **success** %}}<br>This is a notice.<br>{{% /notice */%}}</small> |
| {{% notice danger %}}This is a danger notice.{{% /notice %}} | <small>{{%/* notice **danger** %}}<br>This is a notice.<br>{{% /notice */%}}</small> |
| {{% notice warning %}}This is a warning notice.{{% /notice %}} | <small>{{%/* notice **warning** %}}<br>This is a notice.<br>{{% /notice */%}}</small> |
| {{% notice info %}}This is a info notice.{{% /notice %}} | <small>{{%/* notice **info** %}}<br>This is a notice.<br>{{% /notice */%}}</small> |
| {{% notice light %}}This is a light notice.{{% /notice %}} | <small>{{%/* notice **light** %}}<br>This is a notice.<br>{{% /notice */%}}</small> |
| {{% notice dark %}}This is a dark notice.{{% /notice %}} | <small>{{%/* notice **dark** %}}<br>This is a notice.<br>{{% /notice */%}}</small> |


## Labels

| Type | code |
|:--|--:|
| {{% notice primary %}}This is a notice without label.{{% /notice %}} | <small>{{%/* notice primary %}}This is a notice without label.{{% /notice */%}}</small> |
| {{% notice primary toto %}}This is a notice with "toto" label.{{% /notice %}} | <small>{{%/* notice primary **toto** %}}This is a notice with "toto" label.{{% /notice */%}}</small> |
| {{% notice primary "my label" %}}This is a with "my label".{{% /notice %}} | <small>{{%/* notice primary **"my label"** %}}This is a with "my label".{{% /notice */%}}</small> |


