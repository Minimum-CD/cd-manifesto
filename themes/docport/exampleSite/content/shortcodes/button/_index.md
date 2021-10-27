---
description: Display an actionable button in your page.
title: button
---

Display an actionable button in your page.

{{<button align="center" href="#" theme="warning" >}} This is a warning button {{< /button >}}

## Usage 

| Parameter | Default | Description |
|:--|:--|:--|
| href | "" | The location href to link to |
| ref | "" | The reference of a page to link to  |
| align | "center" | horizontal align button on page |
| theme | `primary` | `default`, `primary` , `success`,`info`,`warning`,`danger` |

The inner text you place in short code will be displayed as the _button text_

## Demo
```
	{{</* button href="https://google.com" */>}} go to google {{</* /button */>}}
	{{</* button href="https://google.com" theme="success" */>}} Success {{</* /button */>}}
	{{</* button href="https://google.com" theme="info" */>}} Info {{</* /button */>}}
	{{</* button href="https://google.com" theme="warning" */>}} Warning {{</* /button */>}}
	{{</* button href="https://google.com" theme="danger" */>}} Danger ! {{</* /button */>}}
	{{</* button href="https://google.com" theme="dark" */>}} Dark ! {{</* /button */>}}
	{{</* button href="https://google.com" theme="light" */>}} Light ! {{</* /button */>}}
	{{</* button ref="columns" theme="secondary" */>}} See page **columns**{{</*/button*/>}}
``` 

{{<button href="https://google.com" >}} go to google {{< /button >}}
{{<button href="https://google.com" theme="success">}} Success {{< /button >}}
{{<button href="https://google.com" theme="info">}} Info {{< /button >}}
{{<button href="https://google.com" theme="warning">}} Warning {{< /button >}}
{{<button href="https://google.com" theme="danger">}} Danger ! {{< /button >}}

{{<button href="https://google.com" theme="dark">}} Dark ! {{< /button >}}
{{<button href="https://google.com" theme="light">}} Light ! {{< /button >}}
{{<button ref="columns" theme="secondary">}} See page **columns** ! {{< /button >}}





