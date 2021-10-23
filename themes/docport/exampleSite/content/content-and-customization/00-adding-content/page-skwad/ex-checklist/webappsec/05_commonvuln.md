---
hidden: true
ignoresearch: true
---

**Certain features can result in security issues, if used incorrectly. To help us identify potential issues, select the statements that describe your application:**
{{<c/choices webvuln  multi >}}
* (db) The application uses a database back end, or any other persistence back end that can be queried with SQL or a related language (e.g., GQL, FQL, SOQL, etc.).
* (plugin) The application requires a plugin, such as Java, Flash, Silverlight, etc.
* (upload) The application has a file upload feature.
* (3rdpartycontent) The application loads active content, such as scripts, applets, or style sheets, from third-party servers (i.e., any server that is not under your direct control).
* (xml) The application processes or manipulates user-provided XML.
* (crypto) The application uses cryptography to encrypt data or protect its integrity.
{{</c/choices >}}

{{<c/show `{webvuln} has '3rdpartycontent'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Loading content from other sites is dangerous under certain circumstances; security issues in the other sites might also affect the security of your application. Scripts, for example, have full access to the DOM of the site on which they're included — so if one of the servers that hosts your third-party JavaScript gets compromised, the attacker also gains access to all of your users' data, simply by injecting a bit of code.\
\
Unless you trust the third party completely (not only to not do something malicious, but also to be secure enough to adequately protect their infrastructure against attackers), it's best not to load scripts or style sheets (e.g., via `<script src=...>` or `<style src=...>`) from third-party sites.\
\
Similarly (although to a lesser extent), directly embedding videos, frames, or images (including advertisements, tracking pixels, etc.) from third-party sources can be dangerous. Loading such a resource can leak information to the site it's loaded from (e.g., through the referrer). This can be a privacy issue as well as a security issue.\
\
\
\
**If your application loads third-party content, describe your threat model:**
{{<c/text "webvuln_3rdpartycontent_details" multi />}}
{{%/notice%}}
{{</c/show >}}

{{<c/show `{webvuln} has 'xml'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Dealing with user-provided and untrusted XML may make your application vulnerable to attacks. For example, the expat XML parser (written in C) has been found vulnerable to buffer overflow attacks. Even if you use a secure parser (or run it in a sandbox), things that can go wrong.\
\
Various attacks rely on the attacker's ability to specify XML entities. Entities are "codes" (such as `&quot;`) that are translated into defined strings by the parser. HTML has a predefined set of entities, but in XML, entities can be specified arbitrarily. An entity specification usually looks like this:\
\
`<!ENTITY ent "Hello!">`\
\
With this definition, whenever the parser comes across `&ent;`, it will replace it with `Hello!`. Entities are usually defined in the document type, which can be provided in a separate file or in the `<!DOCTYPE>` section at the beginning of an XML document.Entities are used in a variety of XML-related attacks. For example, they can be used for something called the [billion laughs attack](http://www.ibm.com/developerworks/xml/library/x-tipcfsx/index.html), where an entity resolves to other entities, which resolve to other entities, etc., causing high memory usage and essentially resulting in a denial-of-service attack.\
\
Even more serious is an attack using [external entities](http://www.securiteam.com/securitynews/6D0100A5PU.html). Definitions of external entities look similar to regular entity definitions, but they reference local files or URLs. Unless the XML parser has been specifically instructed not to expand external entities, a definition like `<!ENTITY etc SYSTEM "file:///etc/passwd">` would include the /etc/passwd file where the entity `&etc;` occurs in the XML document, leading to the disclosure of files as well as internal URLs.It's very important to restrict entity specification in user-provided or untrusted XML. Make sure your parser is adequately configured.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "webvuln_xml_compensating_controles" multi />}}
{{%/notice%}}
{{</c/show >}}





### Cross-Site Scripting
{{%include 05_commonvuln_CrossSiteScripting.md%}}

{{<c/show `{webvuln} has 'db'` >}}
### Persistence Back Ends and Querying
{{%include 05_commonvuln_PersistenceBackEndsandQuerying.md%}}
{{</c/show >}}


{{<c/show `{webvuln} has 'plugin'` >}}
### Browser Plugins
{{%include 05_commonvuln_BrowserPlugins.md%}}
{{</c/show >}}

{{<c/show `{webvuln} has 'upload'` >}}
### File Uploads
{{%include 05_commonvuln_FileUploads.md%}}
{{</c/show >}}

{{<c/show `{webvuln} has 'crypto'` >}}
### Use of Cryptography
{{%include 05_commonvuln_UseofCryptography.md%}}
{{</c/show >}}




