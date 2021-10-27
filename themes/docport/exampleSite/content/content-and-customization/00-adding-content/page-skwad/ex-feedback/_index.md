---
description: Simple Feedback with success and Error custom pages
hidden: true
hide:
- nextpage
- navs
- breadcrumb

title: Website Feedback
weight: 9

skwad:
  mode: "form"
  url: "?"
---

{{%notice success%}}
This is a demo of a [skwad page]({{%ref "content-and-customization/00-adding-content/page-skwad"%}})
{{%/notice %}}

Please fill out this brief feedback form so we can ensure a top quality experience to all of our visitors.

## You
**Email**
{{<c/text "email*" >}}foo@bar.com{{</c/text >}}

**Name**
{{<c/text "name*" >}}Foo Bar{{</c/text >}}

## About your visit
**Is this your first visit to the website?**
{{<c/choices first_visit >}}
    * (yes) Yes
    * (no) No
{{</c/choices>}}

**What is the primary reason for your visit to the website?** 
{{<c/text "first_visit_reason" multi />}}

**Were you able to find what you needed?**
{{<c/choices found_needed >}}
    * (yes) Yes
    * (no) No
{{</c/choices>}}

{{<c/show `{found_needed} == 'no'`>}}
**😢 You did not find what you needed, please tell us what info you were seeking?**
{{<c/text "first_visit_reason" multi />}}
{{</c/show>}}

## About the website

**How easy is it to find information on the site?**
{{<c/choices findinformation >}}
* (veryeasy) Very Easy 
* (easy) Easy 
* (average) Average 
* (difficult) Difficult 
* (verydifficult) Very Difficult
{{</c/choices>}}

**What is the likelihood that you will return to the site?**
{{<c/choices willreturn >}}
* (likely) Likely
* (Very Likely) Very Likely
* (Moderately Likely) Moderately Likely
* (Slightly Likely) Slightly Likely
* (Unlikely to Return) Difficult Unlikely to Return
{{</c/choices>}}


**Please provide any additional comments or suggestions.**
{{<c/text "comment" multi />}}