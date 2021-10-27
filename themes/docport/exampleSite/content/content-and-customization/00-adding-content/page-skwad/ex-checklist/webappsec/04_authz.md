---
hidden: true
ignoresearch: true
---

**To get started, tell us a little about your application so we can ask you the right questions.**
{{<c/choices Auths_basic_infos multi >}}
* (login_required) Our application requires regular users to log in. Most features aren't available without logging in.
* (isolated_admin_ui) In addition to an interface for regular users, our application provides an administration interface.
* (rbac_model) Our application features complex user management. Various roles can be assigned to user accounts.
{{</c/choices >}}

{{<c/show `{Auths_basic_infos} has 'rbac_model'` >}}
**Briefly describe the different roles your application provides. If your application also offers custom role definitions, be sure to mention that.**
{{<c/text "Auths_rbac_details" multi />}}
{{</c/show >}}




{{<c/show `{Auths_basic_infos} has 'login_required' or {Auths_basic_infos} has 'isolated_admin_ui'` >}}
**Is your application integrated with any of the following single sign-on (SSO) mechanisms?**
{{<c/choices Auths_sso_mechanisms multi >}}
* (SAML2) SAML 2.0
* (OpenIDConnectOAuth2) OpenID Connect / OAuth2 Login
* (OpenID2) OpenID 2.0
* (LDAP) LDAP / Active Directory
* (other) Other
* (none) None of the above
{{</c/choices >}}

{{<c/show `{Auths_sso_mechanisms} has 'other'` >}}
**What other SSO mechanisms does the application support?**
{{<c/text "Auths_sso_other_details" multi />}}
{{</c/show >}}

{{<c/show `{Auths_sso_mechanisms} has 'OpenID2' and !({Auths_sso_mechanisms} has 'OpenIDConnectOAuth2')` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
OpenID 2.0 has been replaced by OpenID Connect (also called OAuth2 Login). We recommend updating your application's SSO integration to support OpenID Connect.
{{%/notice%}}
{{</c/show >}}

{{<c/show `{Auths_sso_mechanisms} has 'LDAP'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Integrating with LDAP and/or Active Directory has a significant downside: any application that integrates with it has to receive the user's SSO password. As a result, a vulnerability in any integrated application puts the password at risk for all other applications. We recommend using an SSO mechanism that does not require the password to be sent anywhere other than a central authentication system.
{{%/notice%}}
{{</c/show >}}

{{<c/show `{Auths_sso_mechanisms} has 'OpenIDConnectOAuth2'` >}}
### OAuth2 Login
{{%include 04_authz_OAuth2Login.md%}}
{{</c/show >}}





**Does any part of the application employ username/password-based authentication?**
{{<c/choices Auths_handle_password  >}}
* (yes) Yes
* (no) No, all authentication is based on single sign-on (SSO).
{{</c/choices >}}

{{<c/show `{Auths_handle_password} == 'yes'` >}}
### Username/Password Authentication
{{%include 04_authz_UsernamePasswordAuthentication.md%}}
{{</c/show >}} <!-- `{Auths_handle_password} == 'yes'`s -->

{{</c/show >}} <!-- `{Auths_basic_infos} has 'login_required' or {Auths_basic_infos} has 'isolated_admin_ui'` -->













{{<c/show `{Auths_basic_infos} has 'login_required' or {Auths_basic_infos} has 'isolated_admin_ui' ` >}}
### Authentication Cookies and Sessions
{{%include 04_authz_AuthenticationCookiesandSessions.md%}}
{{</c/show >}}        




{{<c/show `{Auths_basic_infos} has 'login_required' or {Auths_basic_infos} has 'isolated_admin_ui' ` >}}
### Authorization
{{%include 04_authz_Authorization.md%}}
{{</c/show >}}   






{{<c/show `{Auths_basic_infos} has 'login_required' or {Auths_basic_infos} has 'isolated_admin_ui' ` >}}
### Authorization-Related Web Vulnerabilities
{{%include 04_authz_AuthorizationRelatedWebVulnerabilities.md %}}
{{</c/show >}} <!-- Authorization-Related Web Vulnerabilities -->












