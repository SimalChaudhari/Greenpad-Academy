import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import {Alignment} from '@ckeditor/ckeditor5-alignment';
// import { Highlight } from '@ckeditor/ckeditor5-highlight';
// import { FontFamily } from '@ckeditor/ckeditor5-font';

export default function App() {
  useEffect(() => {
    console.log("Effect ran only once after initial render");
  }, []); // Pass an empty dependency array to run the effect only once

  const [data, setData] = useState("");
  const handleChange = (event, editor) => {
    setData(editor.getData());
  };
  return (
    <>
      <div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            // plugins: [Highlight], // Add plugins to the configuration
            toolbar: [
              "heading",
              "bold",
              "italic",
              "link",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "highlight",
              "fontFamily",
              "|",
              "undo",
              "redo",
            ], // Customize the toolbar
          }}
          onChange={(event, editor) => {
            handleChange(event, editor);
          }}
        />
      </div>
      <div>{data}</div>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
}