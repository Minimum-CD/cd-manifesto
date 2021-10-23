---
description: Very long and Complex example, with file save/load on client side 
hidden: true
hide:
- nextpage
- nav
- breadcrumb

title: WebApp Security Assessment
weight: 99

skwad:
  clientside: true
---

{{%notice success%}}
This is a demo of a [skwad page]({{%ref "content-and-customization/00-adding-content/page-skwad"%}})
{{%/notice %}}

## Application Metadata
{{%include "webappsec/01_appmetadata.md"%}}


## Vulnerability Reporting and Management
{{%include "webappsec/02_vulnerabilityreporting.md"%}}


## HTTPS and Mixed-Content Risks
{{%include "webappsec/03_https.md"%}}


## Authentication and Authorization
{{%include "webappsec/04_authz.md"%}}


## Common Web Vulnerabilities
{{%include "webappsec/05_commonvuln.md"%}}


## Testing, QA, and Monitoring
{{%include "webappsec/06_testing.md"%}}

## Additional Notes
Provide any additional information about the security of your application:
{{<c/text additional_notes multi />}}

## Security Contacts
List the email addresses of people we should contact about any security issues in the application:
{{<c/text security_contacts  />}}

## Feedback
Congratulations! You've made it to the end of this questionnaire. If you can spare another minute, please let us know how we can improve it. Your feedback is highly appreciated.
{{<c/text feedback multi  />}}

---

{{%notice info%}}
**Licence Info :** this checklist was made from the VSAQ Vendor Security Assessment Questionnaire, licensed with Apache License 2.0 -- More info here : https://github.com/google/vsaq
{{%/notice %}}

{{<c/show `false` >}}
## Show 
{{<c/choices mychoices >}}
* (aa) Show a block.
* (no) Another block
* (foo) No Block
* (two) Show the two blocks
{{</c/choices>}}

### show 1

{{<c/show `{mychoices} == 'aa' or {mychoices} == 'two'` >}}
{{%notice%}}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{%/notice%}}
{{</c/show>}}

{{<c/show `{mychoices} == 'no'  or {mychoices} == 'two' ` >}}
{{%alert%}}No Alert selected !{{%/alert%}}
{{</c/show>}}



## text

Quel est le code du projet ?



{{<columns>}}
**Simple**
{{<c/text "app_name*" />}}
<--->
**Multiple**
{{<c/text "app_name_multi*" multi >}}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. 
{{</c/text>}}
{{</columns>}}

## Choices

Les enjeux de sécurité ont été identifiés par la SSI ?

{{<columns>}}
**Simple**

{{<c/choices app_vulnerability >}}
	* (yes) Yes, we have a published security email contact, or we provide another way for users to report security issues. Incoming reports are timely reviewed and triaged.
	* (no) No, we do not currently offer a way to report security vulnerabilities for priority handling
	* i don't know
{{</c/choices>}}

<--->

**Multiple**


{{<c/choices app_vulnerabilitymulti multi >}}
	* (yes) Yes, we have a published security email contact, or we provide another way for users to report security issues. Incoming reports are timely reviewed and triaged.
	* (no) No, we do not currently offer a way to report security vulnerabilities for priority handling
	* i don't know
{{</c/choices>}}
{{</columns>}}

{{<c/show `{app_vulnerability} == 'no' and {app_vulnerabilitymulti}  has 'no' ` >}}
{{%alert danger%}}OK !{{%/alert%}}
{{</c/show>}}


## List
{{<columns>}}
**Simple**
{{<c/list select_from_list >}}
    * (czero) C0
	* (cun) C1
	* (cdeux) C2
{{</c/list >}}

<--->

**Multiple**
{{<c/list multiselect multi >}}
	* All
	* (czero) C0
	* (cun) C1
	* (cdeux) C2
{{</c/list >}}
{{</columns>}}

## Checkbox

{{%c/check mycheck %}}J'ai tout compris 1{{%/c/check %}}

## switch

{{%c/switch myswitch %}}Activer le truc{{%/c/switch %}}






## Code
{{%expand%}}
Change on any element form
```js
	var form = document.querySelector('form');
	form.addEventListener('change', function(e,v) {
    	console.log("element changed", e.target,v)
	});

````

Get all data
```js
	$("form[name=myform]").serializeArray()
```

Download file :
* date
* ref
* url
* data
* hash or signature
```js
function downloadFile() {
    var obj = {a: 123, b: "4 5 6"};
    var filename = "download.json";
    var blob = new Blob([JSON.stringify(obj)], {type: 'text/plain'});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else{
        var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
}
````

load file 1 :
```js
input.addEventListener('change', () => { 
    let files = input.files; 
  
    if (files.length == 0) return; 
  
    /* If any further modifications have to be made on the 
       Extracted text. The text can be accessed using the  
       file variable. But since this is const, it is a read  
       only variable, hence immutable. To make any changes,  
       changing const to var, here and In the reader.onload  
       function would be advisible */
    const file = files[0]; 
  
    let reader = new FileReader(); 
  
    reader.onload = (e) => { 
        const file = e.target.result; 
  
        // This is a regular expression to identify carriage  
        // Returns and line breaks 
        const lines = file.split(/\r\n|\n/); 
        textarea.value = lines.join('\n'); 
  
    }; 
  
    reader.onerror = (e) => alert(e.target.error.name); 
  
    reader.readAsText(file); 
}); 
````

load file 2 :
```js
function onFileLoad(elementId, event) {
    document.getElementById(elementId).innerText = event.target.result;
}

function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
}
```
```html
<input type='file' onchange='onChooseFile(event, onFileLoad.bind(this, "contents"))' />
<p id="contents"></p>
```
{{%/expand%}}
{{</c/show>}}
