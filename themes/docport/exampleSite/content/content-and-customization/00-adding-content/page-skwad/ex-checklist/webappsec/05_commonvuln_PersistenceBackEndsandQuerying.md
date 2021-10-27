---
hidden: true
ignoresearch: true
---

Because your application uses a database or a similar back end to persist data, we need to make sure it's not vulnerable to injection attacks, such as [SQL injection](http://en.wikipedia.org/wiki/SQL_injection)

An application is vulnerable to SQL injection when some portion of user input is interpreted by the database as part of a query. When this occurs, an attacker may be able to read or even write data directly from or to the database.

{{<c/choices webvuln_db_sql  multi >}}
* (orm) Our application uses an object-relational mapping (ORM) framework. When we need to manually construct queries or conditions, we use one of the mechanisms selected below:
* (prepared) We use prepared statements and let the framework take care of correctly escaping the user input.
* (stored) We pass user input to the database via stored procedures.
* (manual) We manually escape user input whenever we need to use it in a database query.
* (other) We do something else.
{{</c/choices >}}


{{<c/show `{webvuln_db_sql} has 'other'` >}}
**Describe the other mechanism you're using to protect against SQL injection:**
{{<c/text "webvuln_db_sql_other_details" multi />}}
{{</c/show >}}

{{<c/show `{webvuln_db_sql} has 'orm'` >}}
{{%notice%}}
**Tip**\
\
Using an ORM layer is generally a good way to protect against SQL injection. However, in most ORM frameworks, it's possible to directly specify parts of the SQL query. Some ORM frameworks also have a special querying language that makes it possible to set the `WHERE` part of the statement. In these cases, you still need to be sure to guard against injection vulnerabilities.
{{%/notice%}}
{{</c/show >}}

{{<c/show `{webvuln_db_sql} has 'orm'` >}}
**What ORM framework are you using ?**
{{<c/text "webvuln_sql_orm" multi />}}
{{</c/show >}}



{{<c/show `{webvuln_db_sql} has 'stored'` >}}
{{%notice%}}
**Tip**\
\
Using stored procedures is generally a good way to protect against SQL injection. But this strategy must be used consistently. Make sure neither the stored procedures themselves nor the calls of the stored procedures are vulnerable to injection attacks.
{{%/notice%}}
{{</c/show >}}

{{<c/show `{webvuln_db_sql} has 'prepared' && !({webvuln_db_sql} has 'manual')` >}}
**Do you take special steps (policies, code reviews, audits, etc.) to ensure that prepared statements are used consistently, and that string concatenation is never used to construct database queries?**
{{<c/choices webvuln_db_sql_prepared >}}
* (yes) Yes, we have all or most of these measures in place, and we're very confident that there are no SQL injection vulnerabilities in our code.
* (no) We try to make our developers use prepared statements, but it may be possible for some string concatenation to slip through.
{{</c/choices >}}
{{</c/show >}}


{{<c/show `{webvuln_db_sql} has 'manual' or {webvuln_db_sql_prepared} == 'no'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Manually escaping SQL (or related) queries is error-prone and very difficult to do consistently. Here are a couple of examples:\
* PHP provides the function `mysql_escape_string` for escaping user input that will be used in a database query. Unfortunately, that function does not take into account the character set of the connection, so it may still be possible to smuggle in user input that will be interpreted as part of the SQL query. Applications should use `mysql_real_escape_string` instead.
* In SQL, numbers do not need to be surrounded with quotation marks when used in a statement. For example, `SELECT username WHERE id=123` is perfectly valid. But if user-provided input that will be used as a number is not confirmed to be actually numeric, the resulting code will be vulnerable to SQL injection (even if the input is escaped).
We highly recommend using something like prepared statements, or using an ORM layer consistently throughout the application. Make sure you have procedures in place to enforce your approach (such as static tests when code is checked into the repository).\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "webvuln_db_sql_prepared_no_conpensating_controls" multi />}}
{{%/notice%}}
{{</c/show >}}
