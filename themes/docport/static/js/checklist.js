
var formConditions = [];

$( document ).ready(function() {
    $.each($("#TableOfContents ul li a"), function(i) {
        id = $(this).attr("href")
        id = id.substring(1);
        $(this).parent().attr('id','toc-'+id)
        $(this).before('<input type="checkbox" disabled readonly>');
    });
});

function formValue(fieldName) {
    var formID = "6d2ab01b-fad4-4e70-83a8-b910ca848fec"
    // var formElm = $('[name='+fieldName+']').parents('form');
	var val = ""
	var field = $("#"+formID +' [name='+fieldName+']')
	if (field.attr("multiple") !== undefined) {
		//multiple returns array
		val = []
		$.each(field.serializeArray(), function() {
			if (this.name == fieldName) {
				val.push(this.value)
			}
		});
	}else{
		//single return one scalar value
		$.each($("#"+formID).serializeArray(), function() {
			if (this.name == fieldName) {
				val = this.value
			}
		});
	}
	
	return val
}

function formChange(id){
    $.each(formConditions, function(i) {
        conditionEvaluation = eval(this.condition)
        var showDiv = $('#'+this.id)
        var showDivFields = showDiv.find('input, select, textarea')
        if (conditionEvaluation) {
          showDiv.show()
          showDivFields.prop("disabled", false);
        }else{
          showDiv.hide()
          showDivFields.prop("disabled", true);
          showDivFields.prop("checked",false)
        }
    });
    updateTOC(id)
}

function updateTOC(formID) {
    $.each($("#"+formID).children(), function(i) {
        var zone = $(this).attr("ref")
        var countNames = 0
        var started = 0
        if (zone !== undefined){
            // Selectionne les input/select/textarea d'une zone
            var lastName = ""
            $.each($(this).find('input:not([disabled]), select:not([disabled]), textarea:not([disabled])'), function(j){
                var name = $(this).attr("name")
                if ( name != lastName ){
                    lastName = name
                    countNames++
                    if  (this.tagName == "INPUT" && ($(this).attr("type") == "radio" || $(this).attr("type") == "checkbox") ){
                        if ($("#"+formID+" input[name="+name+"]:checked").length > 0){
                            started++
                        }
                        return
                   }
                } else {
                   return
                }

                var tagName =  this.tagName
                if (tagName == 'INPUT'){
                    var type = $(this).attr("type")
                    if (type == "text"){
                        if ($(this).val() != ''){
                            started++
                        }    
                    }else if (type == "radio" || type == "checkbox") {
                        if ($(this).prop("checked")){
                            started++
                        }
                    }
                }else if (tagName == 'SELECT'){
                    if ($(this).attr("multiple")!==undefined){
                        if ($(this).val().length > 0){
                            started++
                        }
                    }else{
                        if ($(this).val() != ''){
                            started++
                        }    
                    }
                }else if (tagName == 'TEXTAREA'){
                    if ($(this).val() != ''){
                        started++
                    }
                }else{

                }
            });
            if (countNames > 0 ) {
                var status = "ready"
                if (started == countNames) {
                    status = "done"
                    $("#TableOfContents #toc-"+zone+" input").attr('checked',true)
                    $("#TableOfContents #toc-"+zone+" input").prop("indeterminate", false)
                }else if (started >0){
                    status = "doing"
                    $("#TableOfContents #toc-"+zone+" input").attr('checked',false)
                    $("#TableOfContents #toc-"+zone+" input").prop("indeterminate", true)
                }else{
                    status = "ready"
                    $("#TableOfContents #toc-"+zone+" input").attr('checked',false)
                    $("#TableOfContents #toc-"+zone+" input").prop("indeterminate", false)
                }
                $("#TableOfContents #toc-"+zone+"").removeClass('cl-ready cl-doing cl-done').addClass('cl-'+status);
            }
        }
    });
}


function listenFormChange(id){
    // Wrap each Zone with a div
    var formChildren = $("#"+id).children()
    var formChildrenLen = formChildren.length;
    $.each(formChildren, function(i) {
        if (this.tagName == "H2" || i+1 == formChildrenLen) {
            this.parentNode.appendChild(newWrap);
            // console.log("zone",newWrap)
            // this.parentNode.appendChild(this); // decommenter si on veut sortir les h1
            newWrap = wrap(this) 
        }else{
            newWrap = wrap(this, newWrap) 
        }
    });    
    
    // Register Conditions
    $.each($("#"+id+" div[cond]"), function(i) {
         formConditions.unshift({id:$(this).attr('id'), condition:$(this).attr('cond')});
    });


    // on form change update display
	$("#"+id).bind('change', function(e) {
	  formChange(id)
	});

    // initial update display
    formChange(id)
}

function slugify(a) { 
    return a.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); 
} 


function downloadFile(formID){
	var fileName = slugify($("#"+formID).attr("ref"))
    var obj = {
    	at: new Date().toISOString(),
    	ref: "TODO",
    	url: document.location.protocol+"//"+document.location.host+document.location.pathname,
    	data: $("#"+formID).serializeArray()
    };
    var filename = fileName+".checklist.json";
    var blob = new Blob([JSON.stringify(obj)], {type: 'application/json'});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else{
        var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['application/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
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




function fillForm(formID){
    return function (e,o){
        jsonData = e.target.result
        let obj = JSON.parse(jsonData)

        currentUrl = document.location.protocol+"//"+document.location.host+document.location.pathname
        if (obj.url != currentUrl) {
            alert("Warning : this answer file was saved from a different page")
        }
        // check url with 

        $("#"+formID).deserialize(obj.data);
        formChange(formID)
    }
}


jQuery.fn.deserialize = function (data) {
    var f = this,
        map = {},
        find = function (selector) { return f.is("form") ? f.find(selector) : f.filter(selector); };

    jQuery.each(data, function () {
            n = this.name
            v = this.value
        if (!(n in map)) {
            map[n] = [];
        }
        map[n].push(v);
    })
    //Set values for all form elements in the data
    jQuery.each(map, function (n, v) {
        find("[name='" + n + "']").val(v);
    })
    //Clear all form elements not in form data
    find("input:text,select,textarea").each(function () {
        if (!(jQuery(this).attr("name") in map)) {
            jQuery(this).val("");
        }
    })
    find("input:checkbox:checked,input:radio:checked").each(function () {
        if (!(jQuery(this).attr("name") in map)) {
            this.checked = false;
        }
    })
    return this;
};


        
        var wrap = function (toWrap, wrapper) {
            wrapper = wrapper || document.createElement('div');
            if (toWrap.tagName==='H2'){
                $(wrapper).attr("ref",$(toWrap).attr("ref"))
                $(wrapper).attr("todo","10")
                $(wrapper).attr("raf","9") // reste à faire
                $(wrapper).attr("raf_req","2") // reste à faire obligatoire
                $(wrapper).attr("id","zone-"+$(toWrap).attr("ref"))
                $(wrapper).attr("class","checklist-zone")
            }
            
            wrapper.appendChild(toWrap);    // mettre else si on veut sortir les h1
            return wrapper
        };

        var newWrap 
