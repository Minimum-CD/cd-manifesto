---
hidden: true
ignoresearch: true
---


[Cross-site scripting](https://www.owasp.org/index.php/XSS) (or XSS for short) occurs when an application redisplays insufficiently sanitized user input in the context of the application's origin (as defined by the [same-origin policy](http://code.google.com/p/browsersec/wiki/Part2#Same-origin_policy)). 
If the user input contains certain kinds of scripting code, it may read or alter the DOM of the current page when redisplayed.\
In many cases, XSS is used to steal users' cookies or other application-related data, but it may also be used for phishing attacks, or even to deface the web page. \
Unfortunately, XSS is one of the most common security issues in web applications, and due to browser quirks and other factors, quite hard to protect against. 

**Select the statements that describe your strategy:**
{{<c/choices webvuln_xss_strategies  multi >}}
* (templating) We use a templating system that automatically escapes all user input before redisplaying it.
* (chokepoint) Our application has a central choke point where all user input is validated and escaped, depending on the context in which it will be interpreted.
* (perpage) Some of the pages (or all of them) escape user input.
* (other) We are using some other technique to protect against XSS.
* (sanitization) Part of the application deals with user-provided HTML that is sanitized and re-displayed to the user.
{{</c/choices >}}

{{<c/show `!({webvuln_xss_strategies} has 'templating') and !({webvuln_xss_strategies} has 'chokepoint') and !({webvuln_xss_strategies} has 'perpage') and !({webvuln_xss_strategies} has 'other') and !({webvuln_xss_strategies} has 'sanitization')` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
You didn't select a strategy for protecting against cross-site scripting.\
\
**Explain why:**
{{<c/text "webvuln_xss_strategies_no_details" multi />}}
{{%/notice%}}
{{</c/show >}}

{{<c/show `{webvuln_xss_strategies} has 'templating'` >}}
{{%notice%}}
**Tip**\
\
Using a templating system to escape user input is a good way to protect against XSS. But be careful with directives that disable automatic escaping, and watch for the direct display of user input (for example, in error messages). Additionally, be aware of the context in which user input is used in templates. Not all templating systems automatically understand that different escaping may be required, depending on where in the application the user input is displayed. For example, many templating systems would not correctly escape a construct such as `&gt;a href=\"{{ user_input }}\"&lt;`, where a user could supply `javascript:alert(/xss/)` as user_input. We recommend using a context-sensitive templating system.
{{%/notice%}}
{{</c/show >}}

{{<c/show `{webvuln_xss_strategies} has 'chokepoint'` >}}
{{%notice%}}
**Tip**\
\
A central choke point for validating and escaping user input is generally a good way to protect against XSS. But make sure your application identifies the context in which the user input is being used; otherwise, it might still be possible to smuggle in JavaScript through user input. You might also want to consider using a context-sensitive templating system, to address this issue automatically.
{{%/notice%}}
{{</c/show >}}

{{<c/show `{webvuln_xss_strategies} has 'perpage' and !({webvuln_xss_strategies} has 'templating') and !({webvuln_xss_strategies} has 'chokepoint')` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Escaping user input on each page individually is a fairly dangerous strategy: it's very easy to miss something. We recommend using a templating system that automatically escapes user input, ideally in a context-sensitive fashion. Some examples are listed below. Note that not all of these are context-sensitive, so you may still need to do manual escaping (or explicitly tag a variable in the template) when the context is something other than HTML.\
* [Django](https://www.djangoproject.com/) (Python)
* [Google](http://code.google.com/p/ctemplate/?redir=1) CTemplates (C++)
* [Jsilver](http://code.google.com/p/jsilver/) (Java)
* [Closure/Soy](https://developers.google.com/closure/templates/) (Javascript, Java)
* [JQuery](http://jquery.com/) (JavaScript)
* [Smarty](http://www.smarty.net/) (PHP)
{{%/notice%}}
{{</c/show >}}

{{<c/show `{webvuln_xss_strategies} has 'other'` >}}
**Describe your strategy for protecting against XSS vulnerabilities:**
{{<c/text "webvuln_xss_strategies_other_details" multi />}}
{{</c/show >}}

{{<c/show `{webvuln_xss_strategies} has 'sanitization'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Unfortunately, due to error-correcting behavior and browser quirks, getting HTML sanitization right is very difficult. The sanitization code has to build an in-memory representation of the DOM, and then serialize that to a known-safe format. Some libraries do this correctly, so we highly recommended using a well-tested library.\
\
**Describe how your application deals with HTML sanitization:**
{{<c/text "webvuln_xss_strategies_sanitization_details" multi />}}
{{%/notice%}}
{{</c/show >}}




**In addition to applying the strategies you've identified, does the application set a valid and appropriate content type and character set for each page (in the `Content-Type` HTTP header)?**
{{<c/choices webvuln_xss_content_type >}}
* (handled) Yes, we take great care to set this, knowing that otherwise we might be introducing XSS vulnerabilities.
* (no) I'm not sure all pages set an appropriate content type.
{{</c/choices >}}

{{<c/show `{webvuln_xss_content_type} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Not setting both a content type and a character set often leads to cross-site scripting vulnerabilities. For example, if the application outputs JSON but sets the content type to text/html, this might result in XSS because JavaScript/JSON escaping is different from HTML escaping. We recommend that you thoroughly audit your code for pages that don't set the content type correctly.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "webvuln_xss_content_type_no_details" multi />}}
{{%/notice%}}
{{</c/show >}}

{{<c/show `{webvuln} has 'upload'` >}}
**Earlier, you noted that the application has a file upload feature. Does the application allow other users (or administrators) to access the files that are uploaded?**
{{<c/choices webvuln_xss_fileupload >}}
* (yes) Yes, this is a feature of our application.
* (no) No, uploaded files are processed but can't be downloaded again.
{{</c/choices >}}
{{</c/show >}}

{{<c/show `{webvuln_xss_fileupload} == 'yes'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Hosting and serving user-provided content is almost guaranteed to introduce XSS vulnerabilities. Because of various browser quirks, countermeasures (such as setting a `Content-Disposition: attachment` header) do not provide full protection. We recommend serving user-provided content on a domain separate from all domains that have authentication cookies. However, this approach introduces another problem, if access to the content is intended to be authenticated. You can solve this by using short-lived random tokens, or by serving each document from a separate domain. If you use the latter approach, each domain should have a unique set of authentication cookies, valid only for the one document that's served from the domain.\
\
**Describe your strategy for protecting against XSS vulnerabilities introduced by serving user-provided content:**
{{<c/text "webvuln_xss_fileupload_yes_details" multi />}}
{{%/notice%}}
{{</c/show >}}





**Some XSS vulnerabilities work exclusively on the client side, in an application's scripting code. This kind of XSS is commonly referred to as [DOM-based XSS](https://www.owasp.org/index.php/DOM_Based_XSS). Because server-side escaping of user input does not protect against DOM-based XSS, you need a strategy for dealing with client-side scripting code that handles user input, as well as parts of the DOM that may contain user input (such as document.location).**
{{<c/choices webvuln_xss_dombased >}}
* (handled) We know about DOM-based XSS, and we take specific steps to protect against this kind of vulnerability.
* (no) It may be possible that something slipped through the cracks and our application has DOM-based XSS vulnerabilities.
{{</c/choices >}}

{{<c/show `{webvuln_xss_dombased} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
We recommend that you thoroughly audit your code for DOM-based XSS vulnerabilities, and put procedures in place so that future code is also protected.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "webvuln_xss_dombased_no_details" multi />}}
{{%/notice%}}
{{</c/show >}}

