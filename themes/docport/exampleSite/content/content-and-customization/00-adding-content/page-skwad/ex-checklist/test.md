---
hide:
- nextpage

title: Test Form
weight: 99

checklist: true
---

{{<c/hidden _confirmTo `/checklist/confirm?toto=OUI`>}}
{{<c/hidden _errorTo `http://google.fr/checklist/confirm`>}}
{{<c/hidden warn_app_vuln_report_way_no `No external security contact published`>}}

Name ?
{{<c/text "app_name*" />}}

A brief description:
{{<c/text "app_description*" multi >}}
Lorem placeholder
{{</c/text>}}



**Do you ?**
{{<c/choices vuln_report_way >}}
    * (yes) Yes, we have a published security email contact, or we provide another way for users to report security issues. Incoming reports are timely reviewed and triaged.
    * (no) No, we do not currently offer a way to report security vulnerabilities for priority handling.
{{</c/choices>}}


{{<c/choices sso_mechanisms multi >}}
* (SAML2) SAML 2.0
* (OpenIDConnectOAuth2) OpenID Connect / OAuth2 Login
* (OpenID2) OpenID 2.0
* (LDAP) LDAP / Active Directory
* (other) Other
* (none) None of the above
{{</c/choices >}}


<select name="test" multiple="">
	<option>A</option>
	<option>B</option>
	<option>C</option>
</select>
