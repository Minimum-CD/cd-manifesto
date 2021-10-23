---
hidden: true
ignoresearch: true
---
**What username/password-based logins does the application use? For example, if there's a separate administrator authentication, mention that.**
{{<c/text "Auths_handle_password_details" multi />}}

**Does your application allow users to change their passwords?**
{{<c/choices Auths_handle_password_allowusechange  >}}
* (yes) Yes
* (no) No
{{</c/choices >}}
{{<c/show `{Auths_handle_password_allowusechange} == 'no'` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Allowing users to change their passwords is important. A user might be recovering from a compromise, or might have accidentally typed the password elsewhere.
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "Auths_handle_password_allowusechange_compensatingcontrols" multi />}}
{{%/notice%}}
{{</c/show >}}


**Does the application enforce minimum password security requirements (e.g., a certain length, character classes, etc.)?**
{{<c/choices Auths_handle_password_policyenforced  >}}
* (yes) Yes
* (no) No
{{</c/choices >}}
{{<c/show `{Auths_handle_password_policyenforced} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Please help protect users from themselves by enforcing certain minimum password requirements. It's up to you to determine the details of these requirements, but they should account for the sensitivity of the information and should conform to industry standards.
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "Auths_handle_password_policyenforced_compensatingcontrols" multi />}}
{{%/notice%}}
{{</c/show>}}




#### Password Storage
**How does the application store passwords?**
{{<c/choices Auths_handle_password_storage  >}}
* (plaintext) In plain text (unencrypted)
* (reversible) Using reversible encryption (e.g., DES, 3DES, AES, etc.).
* (hashnosalted) Using a secure cryptographic one-way hash function (such as SHA-256) of the password, without the use of a salt
* (hashsalted) Using a secure cryptographic one-way hash function (such as SHA-256) of the salted password
* (keyderivationcypher) Using a dedicated password-based key derivation function, such as bcrypt, PBKDF2 or scrypt
* (none) None of the above
{{</c/choices >}}

{{<c/show `{Auths_handle_password_storage} == 'none'` >}}
**Explain how your application stores passwords:**
{{<c/text "Auths_handle_password_storage_details" multi />}}
{{</c/show>}}

{{<c/show `{Auths_handle_password_storage} == 'plaintext' or {Auths_handle_password_storage} == 'reversible' or {Auths_handle_password_storage} == 'hashnosalted'` >}}
{{%alert danger%}}**Warning — possible critical-risk issue**{{%/alert%}}
{{%notice danger%}}
Passwords should be stored in such a way that the original passwords cannot be easily recovered, even if an attacker manages to get access to the storage location (e.g., through a SQL injection vulnerability). At a minimum, passwords should be secured using a cryptographic one-way hash function and a salt. We strongly recommended using password-based key derivation function like bcrypt PBKDF2 or scrypt instead; they were specifically designed for this use case and make it significantly harder for attackers to crack password hashes.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "Auths_handle_password_allowusechange_compensatingcontrols" multi />}}
{{%/notice%}}
{{</c/show >}}







#### Setting an Initial Password
**How do users get their initial passwords?**
{{<c/choices Auths_handle_password_init_process  >}}
* (selfset) Users self-register and set their passwords online directly within the application.
* (linktoset) The initial password or a link to set the initial password is sent to users by email.
* (physical) The initial password is provided in a (physical) letter sent to a verified address.
* (none) None of the above.
{{</c/choices >}}

{{<c/show `{Auths_handle_password_init_process} == 'none'` >}}
**Explain how users get their initial passwords:**
{{<c/text "Auths_handle_password_init_process_details" multi />}}
{{</c/show>}}

{{<c/show `{Auths_handle_password_init_process} == 'linktoset'` >}}
{{%notice%}}
**Tip**\
\
If passwords are sent by email, make sure users are required to change their initial passwords when they first log in.
{{%/notice%}}
{{</c/show>}}


**When the user gets their initial password, will their account be prepopulated with any confidential information? For example, in an online payroll portal, a user can typically access previous pay statements even when the account is brand new.**
{{<c/choices Auths_handle_password_init_dataavailable  >}}
* (yes) Yes, when users log in for the first time, confidential information will already be present.
* (no) No, at the initial login, no confidential information will be available to the user.
{{</c/choices >}}




#### Account Recovery
**When the user gets their initial password, will their account be prepopulated with any confidential information? For example, in an online payroll portal, a user can typically access previous pay statements even when the account is brand new.**
{{<c/choices Auths_handle_password_recovery multi  >}}
* (questions) The user is asked questions that were set up when the account was created.
* (resetlink) A password reset link is sent via email to the user's registered email address.
* (newpassbymail) A new password is sent via email to the user's registered email address.
* (none) None of the above.
{{</c/choices >}}

{{<c/show `{Auths_handle_password_recovery} has 'none'` >}}
**Describe your password recovery mechanism:**
{{<c/text "Auths_handle_password_recovery_details" multi />}}
{{</c/show>}}

{{<c/show `{Auths_handle_password_recovery} has 'questions' and  !({Auths_handle_password_recovery} has 'resetlink') and !({Auths_handle_password_recovery} has 'newpassbymail') ` >}}
{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Recovery questions alone should not be sufficient for resetting a password. The answers to these questions are often not as secret as they might seem; in particular, friends and family can often easily guess the answers.
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
\
{{<c/text "Auths_handle_password_recovery_questions_compensatingcontrols" multi />}}
{{%/notice%}}
{{</c/show>}}

{{<c/show `{Auths_handle_password_recovery} has 'newpassbymail'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Sending passwords by email is rarely a good idea. Email is generally unencrypted, so it should not be used for sensitive information. Instead, we recommend sending a token that can be used to set the actual password. Although an attacker with the token could still reset the password, the user would at least become aware of the reset when they later attempted to log in.
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "Auths_handle_password_recovery_email_compensatingcontrols" multi />}}
{{%/notice%}}
{{</c/show>}}

