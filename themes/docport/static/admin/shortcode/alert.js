CMS.registerEditorComponent({
  // Internal id of the component
  id: "alert",
  // Visible label
  label: "Alert",
  hint:"",
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
  		{ label: 'Text', name: 'text', widget: 'markdown' }
  	],
  // Pattern to identify a block as being an instance of this component
  pattern: /{{% alert theme="(\w+)" %}}(.*?){{% \/alert %}}/s,

  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      theme: match[1],
      text: match[2]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return '{{% alert theme="'+obj.theme+'" %}}'+obj.text+'{{% /alert %}}';
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<strong> alert '+obj.theme+' -- '+obj.text+'</strong>'
    );
  }
});