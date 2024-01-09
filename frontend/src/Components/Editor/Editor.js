import { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./css.css";

Quill.register("modules/imageResize", ImageResize);

var Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: props.initialContent || '' };
    // this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    this.props.value(html);
  }

  render() {
    return (
      <>
        {/* <Ribbon /> */}
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={"#root"}
          placeholder={this.props.placeholder}
        />
      </>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ font: ["", "serif", "monospace", 'calibri', 'impact', 'roboto'] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "code-block"],
    [{ background: [] }],
    [{ color: [] }],
    ["shape"],
    // [ { shape: [] } ],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};
const fontAttributor = Quill.import("attributors/class/font");
fontAttributor.whitelist = ["", "serif", "monospace", "calibri", "impact", "roboto", "Raleway", "Montserrat","Rubik"];
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block",
  "align",
  "video",
  "background",
  "color",
  "shape",
];

export default Editor;

