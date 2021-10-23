---
description: ""
title: Installation
weight: 1
---

{{% alert theme="warning" %}}HUGO **v0.50** minimum required to use this theme (prefer extended version if you want to modify this theme source{{%/alert%}}

{{% alert theme="info" %}}Last version of HUGO is recomended, tests are always done with the last version.{{%/alert%}}

The following steps are here to help you initialize your new website. If you don’t know Hugo at all, we strongly suggest you to train by following this [great documentation for beginners](https://gohugo.io/overview/quickstart/).
<!--more-->



We assume that all changes to Hugo content and customizations are going to be tracked by git (GitHub, Bitbucket etc.). Develop locally, build on remote system.

## Prepare empty Hugo site

Create empty directory, which will be root of your Hugo project. Navigate there and let Hugo to create minimal required directory structure:
```
$ hugo new site .
```
After that, initialize this as git directory where to track further changes
```
$ git init
```

## Install DocPort as git submodule

{{%alert%}}
**Alernatives to submodules**
\
There are other ways to install DocPort. If submodule is no-go, use [install as git clone]({{%ref "as-git-clone/_index.md"%}}) or [install from a zip archive]({{%ref "direct copy/_index.md"%}})
{{%/alert%}}

DocPort will be added like a dependency repo to original project. When using CI tools like Netlify, Jenkins etc., submodule method is required, or you will get `theme not found` issues. Same applies when building site on remote server trough SSH.



On your root of Hugo execute:

```
$ git submodule add https://github.com/vjeantet/hugo-theme-docport.git themes/docport
```
Next initialize submodule for parent git repo:

```
$ git submodule init
$ git submodule update
```

Now you are ready to add content and build your documentatyion.
{{%notice warning%}}Do not change any file inside themes directory.{{%/notice%}}

## Configuration

[Follow instructions here]({{%relref "getting-start/configuration/_index.md"%}})
