---
description: Tabs let you organize content by context with multiple tab.
title: tabs
---

Tabs let you organize content by context with multiple tab, for example HelloWorld instructions for each language.


{{< tabs >}}
{{% tab "PHP" %}} 

This is how we do a Hello world with php 

```php
	<?php 
	Print "Hello, World!";
	?>
```

{{%notice%}}php runtime needed to run{{%/notice%}}

{{% /tab %}}
{{< tab "Golang" >}} 

This is how we do a Hello world with go

```go
	package main
	import "fmt"
	func main() {
	    fmt.Println("hello world")
	}	
```

{{%notice%}}go needed to compile{{%/notice%}}


{{< /tab >}}
{{< tab "Java" >}} 

This is how we do a Hello world with java

```java
	class HelloWorld {
	    public static void main(String[] args) {
	        System.out.println("Hello, World!"); 
	    }
	}
```
{{%notice%}}java devkit needed to compile\
java runtime needed to run{{%/notice%}}

{{< /tab >}}
{{< /tabs >}}

## Usage 
Enclose multiple `{{%/*tab label*/%}}` in a `{{%/*tabs*/%}}` shortcode

```
	{{</* tabs */>}}
	
		{{%/* tab "PHP" */%}} 
		This is how we do a Hello world with php 
		```php
			<?php 
			Print "Hello, World!";
			?>
		```
		{{%/* /tab */%}}

		{{</* tab "Golang" */>}} 
		This is how we do a Hello world with go
		```go
			package main
			import "fmt"
			func main() {
			    fmt.Println("hello world")
			}	
		```
		{{</* /tab */>}}

		{{</* tab "Java" */>}} 
		This is how we do a Hello world with java
		```java
			class HelloWorld {
			    public static void main(String[] args) {
			        System.out.println("Hello, World!"); 
			    }
			}
		```
		{{</* /tab */>}}

	{{</* /tabs */>}}
```