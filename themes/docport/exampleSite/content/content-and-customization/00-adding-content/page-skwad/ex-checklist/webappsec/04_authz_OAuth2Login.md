---
hidden: true
ignoresearch: true
---

**Implementing OAuth2 Login / OpenID Connect from scratch is fairly complex and error-prone, and mistakes can result in security vulnerabilities. Select the option that best describes your implementation:**
{{<c/choices Auths_oauth2_impl  >}}
* (very_secure) Very secure: We're using a standard OAuth2 library, and we update it when security fixes are released.
* (secure) Secure: We implemented OAuth2 on our own, but our employees are experts and we're convinced that it is implemented securely.
* (own_impl) Not sure: We implemented OAuth2 on our own, and it seemed simple at the time. I'm not sure about the security of our implementation
{{</c/choices >}}


{{<c/show `{Auths_oauth2_impl} == 'secure'` >}}
{{%notice%}}
**Tip**\
\
If your employees really are OAuth2 experts, you're probably fine. But note that even standard libraries have had vulnerabilities due to the intricacies of the standard. Be sure to ask your penetration testing provider to take a look at the OAuth2 implementation.
{{%/notice%}}
{{</c/show>}}


{{<c/show `{Auths_oauth2_impl} == 'own_impl'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Implementing OAuth2 on your own is extremely dangerous. Even the experts on the OAuth2 standards panel concluded that the only way to securely implement it is through a well-known and well-tested library. Some of these libraries are very easy to use (e.g., the [Google Identity Toolkit](https://developers.google.com/identity/toolkit/)), so replacing your custom implementation should be feasible.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "Auths_oauth2_impl_compensatingcontrols" multi />}}
{{%/notice%}}
{{</c/show >}}