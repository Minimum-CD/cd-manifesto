---
hidden: true
ignoresearch: true
---

**You mentioned previously that your application allows users to upload files. Where does the application store those files?**

{{<c/choices webvuln_upload_storage   >}}
* (fs) On the file system
* (db) In a database
* (other) Somewhere else
{{</c/choices >}}

{{<c/show `{webvuln_upload_storage} == 'other'` >}}
**Explain where the uploaded files are stored:**
{{<c/text "webvuln_upload_storage_other_details" multi />}}
{{</c/show >}}


{{<c/show `{webvuln_upload_storage} == 'fs'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Storing uploaded files on the file system can be dangerous. Here are a few issues that can occur:\
\
* Path traversal: The names of uploaded files must be carefully sanitized to prevent attackers from uploading files with paths in the name, such as `../../../../some_existing_file.html`. Files like these can end up in the wrong directory.
* Null bytes: The names of uploaded files must be examined for null bytes, which can cause file names to be truncated (e.g., a file called `evilfile.exe[0x00].gif` might become `evilfile.exe` when stored on disk).
* Interpretation: Files on the file system are much more likely to end up being interpreted. For example, if an attacker manages to store an uploaded file somewhere underneath the web root and names it `evilfile.php`, it might be executed as PHP code by the web server.
\
To prevent issues like these, store user-uploaded content in a database instead. If your application stores files on the file system, be sure to implement careful handling, validation, and sanitization of uploaded files.
{{%/notice%}}
{{</c/show >}}




**In most cases, file type restrictions should be in place for uploads. What types of files does your application white-list?**
{{<c/text "webvuln_upload_storage_types"  />}}

**How does the application enforce these file type restrictions?**
{{<c/choices webvuln_upload_storage_type  multi >}}
* (extension) We verify the file type by checking the file extension on the server side.
* (contenttype) We look at the content type that is sent by the user.
* (reencoding) We decode and re-encode the file, storing only the result.
* (other) We employ another method to verify the file type.
{{</c/choices >}}













{{<c/show `{webvuln_upload_storage} == 'other'` >}}
**Explain how you verify the file type and enforce the whitelist:**
{{<c/text "webvuln_upload_storage_type_other_details" multi />}}
{{</c/show >}}






{{<c/show `{webvuln_upload_storage_type} has 'extension' and {webvuln_upload_storage} == 'fs'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Some web servers are configured by default to allow double file extensions. For example, if a user uploads a file called `malicious.php.gif`, it might actually be executed as PHP code upon retrieval. Because you store uploaded files on the file system, this issue may affect your application. Make sure your web server uses only the last extension (i.e., the part after the right-most dot in the file name) when determining how to process the file.\

{{%/notice%}}
{{</c/show >}}




{{<c/show `{webvuln_upload_storage_type} has 'reencoding'` >}}
{{%notice warning%}}
**Warning — possible medium-risk issue**\
\
Re-encoding files uploaded by users is usually a very good approach. However, note that because the decoding and re-encoding works on untrusted user input (and because parsing is difficult and error-prone), it's best to perform these operations in a sandbox. That way, even if an attacker successfully exploits a vulnerability in the parser, the effects would be constrained to the sandboxed environment. Various sandboxing APIs are available, such as the [Seccomp library](http://sourceforge.net/projects/libseccomp/) for Linux.\
You could also run the decoder/encoder on an isolated virtual machine that's regularly reset to a predefined state. Note, however, that a successful attacker would still be able to observe all incoming and outgoing files, unless the reset happens after each individual file operation\
Even with a sandboxed encoder, some attacker-provided content may survive the re-encoding. For example, in images, the EXIF metadata may be left intact. If this occurs and the content type is incorrectly set (or browser content-sniffing behavior kicks in), cross-site scripting vulnerabilities can result.\
\
**Describe the steps you're taking to protect against vulnerabilities in the decoding and parsing code:**
{{<c/text "webvuln_upload_storage_type_reencoding_details" multi />}}
{{%/notice%}}
{{</c/show >}}


{{<c/show `{webvuln_upload_storage_type} has 'contenttype' and !({webvuln_upload_storage_type} has 'reencoding') and !({webvuln_upload_storage_type} has 'extension')` >}}

{{%notice danger%}}
**Warning — possible high-risk issue**\
\
Unfortunately, verifying the content type of uploaded files is generally not sufficient for enforcing a whitelist. Because the content type is a field in the HTTP request sent by the user, it can be arbitrarily set by an attacker (for example, by using an interception proxy). At a minimum, the application should also verify the extension at the very end of the file name and check it against the whitelist.\
\
**If you have compensating controls in place or feel that this issue does not constitute a risk in your specific circumstances, please explain below. If you're working to address this issue, include an estimate of when it will be resolved:**
{{<c/text "webvuln_upload_storage_type_contentypeonly_conpensating_controls" multi />}}
{{%/notice%}}




{{</c/show >}}
