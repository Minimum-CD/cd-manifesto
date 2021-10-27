---
hidden: true
ignoresearch: true
---
**Cookies can be decorated with a special keyword, `HttpOnly`. If this keyword is set, the browser will not allow JavaScript to access the cookie. Even if the application has a cross-site scripting vulnerability, this keyword makes it much harder for an attacker to steal the session cookie.**

{{<c/choices auths_cookies_sessions_httponly  >}}
* (handled) The `HttpOnly` keyword is set for all our authentication cookies.
* (no) Our application does not make use of this defense-in-depth mechanism.
{{</c/choices >}}

{{<c/show `{auths_cookies_sessions_httponly} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Setting the `HttpOnly` attribute is a very simple defense-in-depth mechanism. We highly recommended making use of it.
\
**If there are specific reasons why this is not possible in your case please explain below**
{{<c/text "auths_cookies_sessions_httponly_why" multi />}}
{{%/notice%}}
{{</c/show >}}


**Session IDs can be constructed in many ways. Select the methods used in your application:**
{{<c/choices auths_cookies_sessions_id multi  >}}
* (framework) The web application framework we use has a built-in session ID mechanism.
* (randomalphanum) Our session IDs are randomly generated strings or numbers.
* (signedcookie) We store a signed token as a cookie to indicate that the user is successfully logged in.
* (other) We use some other mechanism.
{{</c/choices >}}

{{<c/show `{auths_cookies_sessions_id} has 'other'` >}}
**Describe the mechanism you're using**
{{<c/text "auths_cookies_sessions_id_no_details" multi />}}
{{</c/show >}}

{{<c/show `{auths_cookies_sessions_id} has 'framework'` >}}
**What's the name of the framework that generates your session IDs**
{{<c/text "auths_cookies_sessions_id_framework_name"  />}}
{{</c/show >}}

{{<c/show `{auths_cookies_sessions_id} has 'randomalphanum' or {auths_cookies_sessions_id} has 'signedcookie'` >}}
**Do sessions automatically time out after a specified period of inactivity**
{{<c/choices auths_cookies_sessions_timeout >}}
* (yes) Yes
* (no) No
{{</c/choices >}}

{{<c/show `{auths_cookies_sessions_timeout} == 'yes' or {auths_cookies_sessions_id} has 'framework'` >}}
**How long is the session timeout?**
{{<c/text "application_auth_cookies_timeout_length"  />}}
{{</c/show >}}

{{</c/show >}}

{{<c/show `{auths_cookies_sessions_timeout} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
If you don't specify a session timeout, an attacker who has stolen a session ID once will have a permanent back door to the application. Be sure to implement a timeout — even if it's fairly long, it's still better than no timeout at all).
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "auths_cookies_sessions_timeout_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}



{{<c/show `{auths_cookies_sessions_id} has 'randomalphanum'` >}}
**Does the application use a secure [cryptographic pseudo random number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator#Cryptographically_secure_pseudorandom_number_generators) (PRNG) to generate session IDs? The PRNG should not allow the state of the generator to be recalculated from its output, and the entropy of the session ID should be sufficient to make brute-forcing infeasible.**
{{<c/choices auths_cookies_sessions_prng >}}
* (yes) Yes, we use a PRNG that meets these criteria
* (no) No, we don't use a PRNG, or our PRNG doesn't meet these criteria.
{{</c/choices >}}

{{<c/show `{auths_cookies_sessions_prng} == 'no'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
If you're not using a cryptographic PRNG, an attacker can recalculate the state of the generator in order to guess subsequent session IDs and steal those users' sessions. Many programming languages already have a secure PRNG built in (e.g., Java has `java.security.SecureRandom`; C# has `System.Security.Cryptography.RNGCryptoServiceProvider`; Python has `os.urandom`), and in most cases it is as easy to use as a less secure option.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "auths_cookies_sessions_prng_no_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}

{{</c/show >}}


**Does your application offer a "log out" button or link that, when clicked, not only terminates the session (deletes cookies from the client) but also invalidates the entire session ID?**
{{<c/choices auths_cookies_sessions_logoutexists  >}}
* (yes) Yes
* (no) No
{{</c/choices >}}

{{<c/show `{auths_cookies_sessions_logoutexists} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Unless sessions are invalidated on logout, an attacker who has stolen a session ID will have access to the user's data until the session expires. Make sure all logout actions invalidate the session ID.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "auths_cookies_sessions_logoutexists_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}