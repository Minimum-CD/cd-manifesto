---
hidden: true
ignoresearch: true
---
In most applications, certain information should only be accessible to certain users. For example, in most applications that require authentication, only the currently logged-in user should be able to change master data (such as the username, the associated email address, or the account password). When an application has data that should not be available to other users or should be restricted to certain roles, authorization must be enforced on the server side.


**Horizontal Access Control: Horizontal access control refers to isolation between users of the same role. For example, consider an application that allows users to access their payroll statements. The application must ensure that a user cannot access another user's statements; i.e., if the user's statement for the month of May is found at `statement.html?id=8372&month=5`, it shouldn't be possible to see someone else's pay stub simply by loading `statement.html?id=8373&month=5`.**
{{<c/choices auths_authorization_isolation_data  >}}
* (handled) Our application enforces these restrictions on the server side. We have processes in place to make sure nothing slips through the cracks.
* (no) It's possible that we missed checks like this in a few places.
{{</c/choices >}}

{{<c/show `{auths_authorization_isolation_data} == 'no'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Applications must have controls in place that help protect all data from unauthorized access. We recommend that you thoroughly audit your code for vulnerabilities resulting from inadequate access control.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "auths_authorization_isolation_data_no_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}





**Vertical Access Control: When an application supports multiple roles, users should not be able to gain privileges or perform unauthorized actions by loading pages or features that should only be available to users in a different role. Throughout your application, have you ensured that users can perform only those actions that are appropriate for their roles?**
{{<c/choices auths_authorization_isolation_features  >}}
* (handled) Our application enforces these restrictions on the server side. We have processes in place to make sure nothing slips through the cracks.
* (no) It's possible that we missed checks like this in a few places.
{{</c/choices >}}

{{<c/show `{auths_authorization_isolation_features} == 'no'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Applications must have controls in place that protect all functionality from unauthorized access. We recommend that you thoroughly audit your code for vulnerabilities resulting from inadequate access control.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "auths_authorization_isolation_features_no_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}

