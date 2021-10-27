CMS.registerEditorComponent({
  // Internal id of the component
  id: "button",
  // Visible label
  label: "Button",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    	{
  		label: 'Theme', 
  		name: 'theme', 
  		widget: 'select',
      	default:'info', 
  		options: [
  			{ label: "info", value: "info" },
  			{ label: "success ", value: "success" }, 
  			{ label: "warning", value: "warning" }, 
  			{ label: "danger", value: "danger" }
  			]
  		},
  		{ label: 'Link', name: 'href', widget: 'string' },
  		{ label: 'Text to display', name: 'label', widget: 'string' }
  	],
  // Pattern to identify a block as being an instance of this component
  pattern: /^{{\< button href="(.*?)" theme="(\w+)" \>}}(.*?){{\< \/button \>}}/s,

  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      href: match[1],
      theme: match[2],
      label: match[3]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return '{{< button href="'+obj.href+'" theme="'+obj.theme+'" >}}'+obj.label+'{{< /button >}}'
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<strong> button['+obj.label+'] --> '+obj.href+'</strong><br/>'
    );
  }
});