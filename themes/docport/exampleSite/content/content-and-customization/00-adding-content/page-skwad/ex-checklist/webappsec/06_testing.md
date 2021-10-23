---
hidden: true
ignoresearch: true
---
Security testing can be part of standard application tests. Here are some examples:

* **Simple unit tests**: Unit tests are typically used to confirm that the basic building blocks of the application work as expected. Unit tests are easy to repeat — they can run whenever new code is checked into the repository, to confirm that the code still behaves as expected. Unit tests can also check for security features. For example, they can be used to confirm that requests fail without XSRF tokens; that authentication is required to access user data; or that unexpected HTML tags can't get through input filters or escaping routines.
* **Release testing**: Before a new version of a product is released, human testers typically go through the application, try the new features, and make sure previous features still work correctly (regression testing). Security testing should be included in this process as well. For example, release testing is a great time to verify that user A cannot access the data of user B.
* **Monitoring**: Once the application is deployed, the focus usually shifts from testing to monitoring. Watch out for unexpected spikes in error rates, sandbox violations, and other flaky or inexplicable behavior (including intermittent test failures) — and before you dismiss an anomaly, check with your security team. Crashes and flakiness can indicate a race condition or a memory corruption bug.


The next few questions assess the testing and monitoring of your application.

**Are you using unit tests or similar methods?**
{{<c/choices application_testing_unit >}}
* (yes) Yes
* (no) No
{{</c/choices >}}

{{<c/show `{application_testing_unit} == 'yes'` >}}
### Unit Testing
**How would you describe the code coverage of your unit tests?**
{{<c/choices application_testing_unit_coverage >}}
* (large) Robust - The vast majority of our code is tested through unit tests; code coverage is at least &gt;80%.
* (med) Weak - We have some unit testing, but much of the code is not tested.
* (small) Nonexistent - We have no (or almost no) unit tests.
{{</c/choices >}}
{{<c/show `{application_testing_unit_coverage} == 'med' or {application_testing_unit_coverage} == 'small'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Unit tests have become quasi-standard for testing the functionality of software at a low level. Although this questionnaire focuses on security, the functional correctness of the application is also important. Particularly for web applications, where it is difficult (often impossible) to fall back to a previous version, functional bugs can cause problems with both integrity and availability. Consider implementing unit tests.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "application_testing_unit_coverage_low_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}

{{<c/show `{application_testing_unit_coverage} == 'med' or {application_testing_unit_coverage} == 'large'` >}}
**Do you have special unit tests in place for testing the security of your code? For example, unit tests can be used to do the following:**
* Verify that XSRF tokens are required for all state-changing actions
* Confirm that user input is correctly escaped and/or sanitized
* Check that the application enforces access control (e.g., user A doesn't have access to user B's data)
{{<c/choices application_testing_unit_security >}}
* (yes) Yes
* (no) No
{{</c/choices >}}
{{<c/show `{application_testing_unit_security} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Scalable security depends on engineers doing their part — and common-sense, low-overhead unit tests are one of the most cost-efficient defenses available. Unit tests can help validate security parameters and avoid regressions that reintroduce security bugs. We strongly recommend including security checks in your unit tests.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "application_testing_unit_security_no_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}


{{</c/show >}} <!-- Do you have special unit tests in place for testing -->




{{</c/show >}} <!-- Unit Testing -->


**Do your engineers and your QA team look for potential security issues during release testing, and have they been trained to do so?**
{{<c/choices application_testing_qa_security >}}
* (yes) Yes, our QA process explicitly includes testing for security issues that might have been introduced in the new version.
* (no) This is an area where we have some room for improvement.
{{</c/choices >}}
{{<c/show `{application_testing_qa_security} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Your engineering and QA teams are in the best position to understand how all parts of the application work, what has changed since the previous iteration, and how the changes might introduce security vulnerabilities. Release testing is typically done under considerable time pressure, but it's the last chance to catch security vulnerabilities internally. When your teams are already focused on testing, adding a few security tests won't increase the effort by much.\
\
Engineers and testers who have been trained to look for security issues can make all the difference between a secure product and a serious vulnerability.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "application_testing_qa_security_no_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}


### Post-Launch Monitoring

**How would you describe your post-launch monitoring?**
{{<c/choices application_monitoring >}}
* (robust) Robust - We have procedures in place to log and monitor for unexpected crashes, exceptions, and other error conditions. If something looks suspicious, a security-conscious engineer evaluates it.
* (weak) Weak - If something goes terribly wrong, such as massive spikes in crash rates or other large-scale anomalies, we will probably notice. But our monitoring is fairly coarse, and there is room for improvement.
* (none) Nonexistent - At the moment, we are not doing any kind of post-release monitoring that looks for signs of exploitation or increases in crashes/exceptions.
{{</c/choices >}}
{{<c/show `{application_monitoring} == 'robust'` >}}
{{%notice%}}
**Tip**\
\
Thank you for putting effort into post-launch monitoring. Exceptions often indicate an underlying security problem, and close monitoring goes a long way toward quickly identifying and subsequently fixing vulnerabilities.
{{%/notice%}}
{{</c/show >}}

{{<c/show `{application_monitoring} == 'weak' or {application_monitoring} == 'none' ` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Exceptions and crashes often indicate an underlying security problem. Monitoring the deployed application can go a long way toward quickly identifying and subsequently fixing vulnerabilities. In carefully designed software products, exceptions should be a fairly rare occurrence; it therefore usually does not introduce significant overhead to monitor for them.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "application_monitoring_weak_compensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}
