---
hidden: true
ignoresearch: true
---
#### Cross Site Request Forgery
Applications must protect all state-changing actions against cross-site request forgery (XSRF). In this attack, a malicious user forces the victim to send a request to the application, for example by luring the user to a page under the attacker's control. Because the browser automatically attaches available authentication cookies, the request will appear to be authorized if the user is logged in to the application.

For example, consider an online banking application that allows users to transfer money to another account. The URL for transfers might look something like this:

`https://www.example.com/bank-transfer.html?dest_account=123456&amount=99.90&submit=true`

If an attacker manages to lure the victim to a malicious site, the site could include HTML that causes such a request to be sent:

`<img src="https://www.example.com/bank-transfer.html?dest_account=666&amount=99.90& submit=true">`

If the user is logged in to the online banking portal, the application will receive that request and check for authentication cookies — which will be present, since the request was sent from the authorized user's browser.

**Does your application protect all state-changing actions against XSRF?**
{{<c/choices auths_authorization_XSRF  >}}
* (yes) Yes, all state-changing actions are protected. We have a way to ensure that no actions are missed (such as enforcing XSRF-token checks in a central place).
* (no) Some actions might not be protected against XSRF.
{{</c/choices >}}

{{<c/show `{auths_authorization_XSRF} == 'no'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Web applications used to process private or confidential information should protect against XSRF. We recommend that you thoroughly audit your code for XSRF vulnerabilities, and put procedures in place so that future code is also protected.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "auths_authorization_XSRF_no_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}

{{<c/show `{auths_authorization_XSRF} == 'yes'` >}}
**What strategy do you use to protect against XSRF?**
{{<c/choices auths_authorization_XSRF_strategy  >}}
* (token) We protect requests that change the state with tokens that are bound to the user they were generated for, and that expire after a certain amount of time.
* (header) We use a custom fixed header that we add to requests.
* (post) The application does one of the following: verifies the referrer header; requires all state-changing actions to be POST requests; employs another mechanism to protect against XSRF
{{</c/choices >}}
{{</c/show >}}

{{<c/show `{auths_authorization_XSRF_strategy} == 'header'` >}}
{{%notice%}}
**Tip**\
\
Various browser plugins (such as Flash and Java) have had security vulnerabilities that allowed an attacker to set arbitrary custom headers on cross-domain requests. We highly recommend the use of tokens instead of headers.
{{%/notice%}}
{{</c/show >}}

{{<c/show `{auths_authorization_XSRF_strategy} == 'post'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Unfortunately, using POST requests does not protect against XSRF. Attackers can perform cross-domain POST requests by submitting a form with the appropriate `action` parameter, via JavaScript. Referrer checks are similarly ineffective because attackers can get around them through open redirects.\
\
**If you are using an alternative, effective method to protect against XSRF, describe it:**
{{<c/text "auths_authorization_XSRF_no_alternative" multi />}}
{{%/notice%}}
{{</c/show >}}








#### Cross-Site Script Inclusion
**Many web applications use AJAX to exchange data in the background, using a syntax that can be automatically interpreted as JavaScript by the user's browser. Unfortunately, this leads to [cross-site script inclusion](http://capec.mitre.org/data/definitions/111.html) (XSSI) vulnerabilities: the JavaScript can be included from a different origin, and any variables set at the other origin can be read.**

For example, consider a contact management application that transmits the user's contacts in a JSON file (contacts.js):

`var contacts = {"name": "John Doe", "address": "jdoe@example.com", ... }`

An attacker can include the following script from their own site, so that when the user visits the attacker's site while logged in to the contact management application, the attacker can read the variable contacts and get access to all of the victim's contact information.

`<script src="http://www.example.com/contacts.js"></script>`

**Do either of the following statements describe your application?**
{{<c/choices auths_authorization_XSSI multi >}}
* (jsonp) Our application makes use of [JSONP](http://en.wikipedia.org/wiki/JSONP).
* (no) Our application uses another format that sets variables or calls functions with non-public information.
{{</c/choices >}}

{{<c/show `{auths_authorization_XSSI} has 'no'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Web applications that transmit private information must be protected against XSSI, to prevent attackers from stealing the private data.\
\
**If you are using an alternative, effective method to protect against XSSI, describe it:**
{{<c/text "auths_authorization_XSSI_no_alternative" multi />}}
{{%/notice%}}
{{</c/show >}}






#### Clickjacking
**Depending on the nature of your application and the actions that can be taken in it, you may need to protect against [clickjacking](https://www.owasp.org/index.php/Clickjacking).**

**If you don't typically need to frame web pages, your application should use the [X-Frame-Options response header](https://developer.mozilla.org/en/the_x-frame-options_response_header) to tell the browser not to render any page that's framed from a different origin:**

`X-Frame-Options: SAMEORIGIN`

{{<c/choices auths_authorization_clickjacking  >}}
* (handled) Our application employs protections against clickjacking (such as using the `X-Frame-Options` header).
* (no) Our application does not have such protections.
{{</c/choices >}}

{{<c/show `{auths_authorization_clickjacking} has 'no'` >}}
{{%notice%}}
**Tip**\
\
Clickjacking is difficult to address. But in high-risk applications, clickjacking protection is essential.\
\
**Explain why you consider clickjacking protection unnecessary**
{{<c/text "auths_authorization_clickjacking_no_details" multi />}}
{{%/notice%}}
{{</c/show >}}