// QuillEditor.js
// import React from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// function QuillEditor({ value, onChange }) {
//   const handleEditorChange = (content) => {
//     onChange(content);
//   };

//   // Custom Quill options
//   const quillOptions = {
//     modules: {
//       toolbar: [
//         [{ header: [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ list: 'ordered' }, { list: 'bullet' }],
//         ['link', 'image'],
//         ['clean'],
//       ],
//     },
//     formats: ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image'],
//   };

//   return <ReactQuill value={value} onChange={handleEditorChange} {...quillOptions} />;
// }

// export default QuillEditor;

// -----------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the default editor theme CSS

// The Editor component class
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '', theme: 'snow' };
    this.handleChange = this.handleChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
    if (newTheme === 'core') newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    return (
      <div>
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

// Quill modules to attach to the editor
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video', 'position'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

// Quill editor formats
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'position',
];

// PropType validation
Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;