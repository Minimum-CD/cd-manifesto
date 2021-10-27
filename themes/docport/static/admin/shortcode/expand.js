CMS.registerEditorComponent({
  // Internal id of the component
  id: "expand",
  // Visible label
  label: "Expand",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
  		{ label: 'Label', name: 'label', default:'Expand me !', widget: 'string' },
  		{ label: 'Text to expand', name: 'text', widget: 'markdown' }
  	],
  // Pattern to identify a block as being an instance of this component
  pattern: /^{{% expand "(\w+)" %}}(.*?){{% \/expand %}}/s,


  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      label: match[1],
      text: match[2]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return '{{% expand "'+obj.label+'" %}}'+obj.text+'{{% /expand %}}';
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<strong> expand : '+obj.label+' -- '+obj.text+'</strong>'
    );
  }
});