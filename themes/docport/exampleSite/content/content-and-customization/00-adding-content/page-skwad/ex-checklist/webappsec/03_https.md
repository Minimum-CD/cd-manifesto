---
hidden: true
ignoresearch: true

---


**Select the option that best describes your web application:**
{{<c/choices https_exposition >}}
* (https) The web application is reachable exclusively over HTTPS. Even if the user manually edits the URL to start with `http://`, it won't work or it will redirect to `https://`.
* (http_https) The web application is flexible — users can reach it over HTTP or over HTTPS.
* (http_only) The web application supports HTTP only, and can't be reached over HTTPS even if you edit the URL.
{{</c/choices>}}

{{<c/show `{https_exposition} == 'http_https' or {https_exposition} == 'http_only'` >}}
{{<c/hidden warn_https_exposition `Unencrypted application network traffic`>}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
It's often extremely easy for attackers to eavesdrop on packets transmitted between users and web applications (for example, on public Wi-Fi networks). To avoid exposing sensitive data in transit, any application that allows users to log in — or contains anything but public data — should be available solely over HTTPS. It's also fine to use a web server that listens on port 80 (plain HTTP) and redirects users to the SSL version; this method can make it easier for users to access the application.
\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below.**
{{<c/text "https_exposition_countermeasures*" multi />}}

{{%/notice%}}
{{</c/show>}}

{{<c/show `{https_exposition} == 'https' or {https_exposition} == 'http_https'` >}}

### Configuring SSL/TLS

**Have you recently reviewed your SSL configuration to ensure that only secure protocols and ciphers are offered to clients?**

{{<c/choices https_conf >}}
* (yes)  Yes, we regularly review the cipher suite advertised by the server and the protocols it uses.
* (not_sure)  We're not sure whether our SSL/TLS configuration is secure.
{{</c/choices>}}

{{<c/show `{https_conf} == 'not_sure'` >}}
{{%notice%}}
**Tip**\
\
Detailed guidance on SSL/TLS and cipher suites is beyond the scope of this questionnaire. A very good and well-maintained resource is [Mozilla's SSL/TLS configuration wiki page](https://wiki.mozilla.org/Security/Server_Side_TLS), which gives up-to-date recommendations for the most common use cases. Another good resource for reviewing the security of your SSL/TLS server is [SSL Labs' server test](https://www.ssllabs.com/ssltest/).
{{%/notice%}}
{{</c/show>}}


**Does your server offer [forward secrecy](https://en.wikipedia.org/wiki/Forward_secrecy) for clients that support it?**

{{<c/choices https_forward_secrecy >}}
* (yes) Yes, the server supports ECDHE and DHE ciphers that offer forward secrecy.
* (no)  No, no ciphers providing forward secrecy are enabled.
{{</c/choices>}}
{{<c/show `{https_forward_secrecy} == 'no'` >}}
{{%notice%}}
**Tip**\
\
In ciphers that support forward secrecy, an ephemeral key is negotiated for each connection, using the Diffie-Hellman algorithm. This key is used for a limited period of time, after which it is "forgotten." Even if the private SSL key is later compromised, an attacker who recorded conversations between the server and clients won't be able to decrypt those conversations without also breaking the associated ephemeral keys. Enabling ciphers that offer forward secrecy can protect your users against future disclosure of the information transmitted between them and your server.
{{%/notice%}}
{{</c/show>}}


**Are your SSL/TLS private keys appropriately protected on your web servers?**
{{<c/choices https_private_keys >}}
* (yes)  Yes, we have taken all necessary steps to protect our private keys.
* (no)   I'm not sure how well protected they are.
{{</c/choices>}}
{{<c/show `{https_private_keys} == 'no'` >}}
{{%notice%}}
**Tip**\
\
Make sure private SSL/TLS keys are, at a minimum, protected through file system permissions. It's important to make sure the user account that's used to serve web pages does not have access; otherwise, a vulnerability in the web app could easily lead to a compromise of the keys. If you are using an SSL certificate with a wildcard CN (e.g., *.example.net), ensure that the private key is well protected on all the servers it resides on (not just your most important server).
{{%/notice%}}
{{</c/show>}}


**Where is the SSL connection between the user and your application terminated?**
{{<c/choices https_termination >}}
* (appserver) At the application server
* (loadbalancer) At the load balancer
* (somewhere) Somewhere else
{{</c/choices>}}

{{<c/show `{https_termination} == 'somewhere'` >}}
**Provide more details on the termination point:**
{{<c/text "https_termination_somewhere_details" multi />}}
{{</c/show>}}


{{<c/show `{https_termination} == 'loadbalancer'` >}}
**How is traffic between the load balancer and the application servers protected?**
{{<c/choices https_termination_lb_traffic >}}
* (encrypted) Traffic is encrypted and certificates between load balancer and application servers are validated.
* (unencrypted-trusted) Traffic is unencrypted, but all networks transited between load balancers and application servers are owned and exclusively used by us.
* (unencrypted-untrusted) Traffic is unencrypted, and traffic has to transit through networks not owned and exclusively used by us.
* (other) Through other means.
{{</c/choices>}}
{{</c/show>}}

{{<c/show `{https_termination_lb_traffic} == 'unencrypted-untrusted'` >}}
{{%notice%}}
**Tip**\
\
Because user traffic appears to transit networks behind your load balancer that are not fully owned and operated by you, we strongly recommend that you establish another SSL/TLS connection between the load balancer and the servers that actually serve the application. Otherwise, an attacker who can listen in on the traffic behind your load balancers will be able to see unencrypted user data.
{{%/notice%}}
{{</c/show>}}

{{<c/show `{https_termination_lb_traffic} == 'other'` >}}
**Describe how the traffic is protected:**
{{<c/text "https_termination_lb_traffic_details" multi />}}
{{</c/show>}}



**Applications served over SSL may still be vulnerable to attacks if resources (often JavaScript, style sheets, or other active content) are included over plain HTTP. This defeats the purpose of SSL, because the active content loaded through plain HTTP will have access to the DOM of content protected by SSL. Make sure no resources are included from plain HTTP sites. Typically, browsers will help identify cases where resources from non-SSL sites are included, by displaying [mixed content](https://developer.mozilla.org/en-US/docs/Security/MixedContent) warnings.**

**To avoid these issues, do you have checks in place to ensure that all references to resources either point to SSL or are protocol-relative?**
{{<c/choices https_mixedcontent >}}
* (yes) Yes, we are very careful and have specific controls in place to prevent mixed-content issues.
* (no) It wouldn't be too difficult for something to fall through the cracks and introduce mixed-content bugs.
{{</c/choices>}}

{{<c/show `{https_mixedcontent} == 'no'` >}}
{{<c/hidden warn_https_mixedcontent `Mixed content issue`>}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Mixed content is a big deal, and it's becoming more problematic as an increasing number of users roam on public Wi-Fi and other insecure networks. We recommend cleaning up your codebase to avoid this kind of issue, and establishing procedures to help guard against new instances.
\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below.**
{{<c/text "https_mixedcontent_details*" multi />}}
{{%/notice%}}
{{</c/show>}}



{{</c/show>}} <!-- {https_exposition} == 'https' or {https_exposition} == 'http_https -->
