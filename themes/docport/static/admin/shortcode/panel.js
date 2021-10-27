CMS.registerEditorComponent({
  // Internal id of the component
  id: "panel",
  // Visible label
  label: "Panel",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
  		{
  		name: 'theme', 
  		label: 'Theme', 
  		widget: 'select', 
  		default:'info', 
  		options: [
  			{ label: "info", value: "info" },
  			{ label: "success ", value: "success" }, 
  			{ label: "warning", value: "warning" }, 
  			{ label: "danger", value: "danger" }
  			]
  		},
  		{ label: 'Header', name: 'header', default:'', widget: 'string' },
  		{ label: 'Footer', name: 'footer', default:'', widget: 'string' },
  		{ label: 'Text to expand', name: 'text', widget: 'markdown' }
  	],
  // Pattern to identify a block as being an instance of this component
  // pattern: /^{{% expand "(\w+)" %}}(.*?){{% \/expand %}}/s,
  pattern: /^{{% panel theme="(\w+)" header="(\w+)" footer="(\w+)" %}}(.*?){{% \/panel %}}/s,


  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      theme: match[1],
      header: match[2],
      footer: match[3],
      text: match[4]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
	return '{{% panel theme="'+obj.theme+'" header="'+obj.header+'" footer="'+obj.footer+'" %}}'+obj.text+'{{% /panel %}}';
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<strong> panel : '+obj.header+' -- '+obj.text+'</strong>'
    );
  }
});