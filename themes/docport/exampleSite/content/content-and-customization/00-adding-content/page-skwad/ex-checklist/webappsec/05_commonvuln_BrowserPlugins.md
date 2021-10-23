---
hidden: true
ignoresearch: true
---
**You mentioned that your application requires certain browser plugins to work correctly. Which of the following plugins are required?**
{{<c/choices webvuln_plugin  multi >}}
* (java) Java
* (flash) Flash
* (silverlight) Silverlight
* (other) Other
{{</c/choices >}}

{{<c/show `{webvuln_plugin} has 'other'` >}}
**What other plugins are required by your application?**
{{<c/text "webvuln_plugin_other"  />}}
{{</c/show >}}


{{<c/show `{webvuln_plugin} has 'other'` >}}
**Explain what the plugin is used for, what technology it uses (e.g., ActiveX, NPAPI, Chrome plugin, etc.), how it is usually deployed to your users, and what privileges it requires:**
{{<c/text "webvuln_plugin_other_details" multi  />}}
{{</c/show >}}


{{<c/show `{webvuln_plugin} has 'java'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Enabling Java in the browser exposes users to a variety of security issues. We strongly discourage requiring Java.\
\
**Is Java absolutely necessary for your application to function correctly? Are there any workarounds ?**
{{<c/text "webvuln_plugin_java_workarounds" multi />}}
{{%/notice%}}


{{</c/show >}}


{{<c/show `{webvuln_plugin} has 'other'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
In most cases, custom plugins are considered a security risk. Plugins can operate outside of the usual constraints (such as a same-origin policy, sandboxing, etc.) and can introduce security vulnerabilities that affect the entire browser. It's also often difficult to deploy and centrally manage them. We strongly discourage using custom plugins.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "webvuln_plugin_other_conpensating_controls" multi />}}
{{%/notice%}}

{{</c/show >}}

