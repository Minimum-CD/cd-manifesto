---
description: display elements side by side
title: columns
---

the `{{</*column*/>}}` shortcode display content side by side

{{< columns >}} <!-- begin columns block -->
## Left Content
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. 

<---> <!-- magic separator, between columns -->

## Mid Content
Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. 

<---> <!-- magic separator, between columns -->

## Right Content
Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
{{< /columns >}}


## Usage 
```
	{{</* columns >}} 
	
	## 1st column
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. 

	<---> <!-- separator between columns -->

	## 2nd column
	Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. 

	<---> <!-- separator between columns -->

	## last column
	Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non

	{{< /columns */>}}

```





