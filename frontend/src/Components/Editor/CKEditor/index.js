// import React, { useState, useEffect, useRef } from "react";
// // import { CKEditor } from "@ckeditor/ckeditor5-react";
// // import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// // import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
// // import { Alignment } from '@ckeditor/ckeditor5-alignment';
// // import { FontFamily } from '@ckeditor/ckeditor5-font';
// // import { FontFamily } from '@ckeditor/ckeditor5-font/src/fontfamily';

// const QuillEditor = React.memo(function Child({
//   name,
//   height,
//   value,
//   changeItem,
// }) {
//   const editorRef = useRef();
//   const [editorLoaded, setEditorLoaded] = useState(false);
//   const { CKEditor, ClassicEditor, FontFamily } = editorRef.current || {};

//   useEffect(() => {
//     console.log("Effect ran only once after initial render");
//   }, []); // Pass an empty dependency array to run the effect only once

//   useEffect(() => {
//     editorRef.current = {
//       CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
//       ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
//     //   FontFamily: require("@ckeditor/ckeditor5-font/src/fontfamily"),
//     //   Alignment: require("@ckeditor/ckeditor5-alignment"),
//     };
//     setEditorLoaded(true);
//   }, [!editorLoaded]);

//   const [data, setData] = useState("");

//   const handleChange = (event, editor) => {
//     setData(editor.getData());
//   };

//   return (
//     <>
//       {editorLoaded ? (
//         <>
//           <div>
//             <CKEditor
//               editor={ClassicEditor}
//               data={data}
//               onReady={(editor) => {
//                 console.log("Editor is ready to use!", editor);
//               }}
//               config={{
//                 // plugins: [FontFamily],
//                 // Customize the toolbar with font style and image resizing options
//                 toolbar: [
//                 "alignment",
//                   "heading",
//                   "|",
//                   "fontFamily",
//                   "fontSize",
//                   "|",
//                   "bold",
//                   "italic",
//                   "link",
//                   "|",
//                   "bulletedList",
//                   "numberedList",
//                   "undo",
//                   "redo",
//                   "|",
//                   "imageUpload",
//                   "imageResize", // Add image resize option
//                 ],
//                 fontFamily: {
//                   options: [
//                     "default",
//                     "Ubuntu, Arial, sans-serif",
//                     "Ubuntu Mono, Courier New, Courier, monospace",
//                   ],
//                 },
//                 fontSize: {
//                   options: [9, 11, 13, "default", 17, 19, 21],
//                 },
//                 image: {
//                   resizeUnit: "px", // Set resizing unit to pixels
//                   resizeOptions: [
//                     {
//                       name: "resizeImage:original",
//                       value: null,
//                       icon: "original",
//                     },
//                     {
//                       name: "resizeImage:50",
//                       value: "50",
//                       icon: "medium",
//                     },
//                     {
//                       name: "resizeImage:75",
//                       value: "75",
//                       icon: "large",
//                     },
//                   ],
//                   toolbar: [
//                     "imageStyle:alignLeft",
//                     "imageStyle:full",
//                     "imageStyle:alignRight",
//                     "|",
//                     "resizeImage:50", // Initial image size option
//                     "resizeImage:75", // Initial image size option
//                     "resizeImage:original", // Original image size option
//                     "|",
//                     "imageTextAlternative",
//                   ],
//                 },
//               }}
//               onChange={(event, editor) => {
//                 handleChange(event, editor);
//               }}
//             />
//           </div>
//           <div>{data}</div><hr/>
//           <div dangerouslySetInnerHTML={{ __html: data }} />
//         </>
//       ) : (
//         <>loading ...</>
//       )}
//     </>
//   );
// });

// export default QuillEditor;


// Editor.js

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
// import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
// import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
// import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
// import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { Heading } from '@ckeditor/ckeditor5-heading';
// import {
//     Image,
//     ImageCaption,
//     ImageStyle,
//     ImageToolbar,
//     ImageUpload
// } from '@ckeditor/ckeditor5-image';
// import { Indent } from '@ckeditor/ckeditor5-indent';
// import { Link } from '@ckeditor/ckeditor5-link';
// import { List } from '@ckeditor/ckeditor5-list';
// import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
// import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
// import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
// import { TextTransformation } from '@ckeditor/ckeditor5-typing';

class Editor extends ClassicEditor {
    static get requires() {
        return [
            Alignment,
            // Autoformat,
            // Bold,
            // Italic,
            // BlockQuote,
            // CloudServices,
            // Essentials,
            // Heading,
            // Image,
            // ImageCaption,
            // ImageStyle,
            // ImageToolbar,
            // ImageUpload,
            // Indent,
            // Link,
            // List,
            // MediaEmbed,
            // Paragraph,
            // PasteFromOffice,
            // Table,
            // TableToolbar,
            // TextTransformation
        ];
    }

    static get plugin() {
        return [...super.plugins, Alignment];
    }

    static get defaultConfig() {
        return {
            toolbar: {
                items: [
                    'alignment',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'imageUpload',
                    'blockQuote',
                    'insertTable',
                    'mediaEmbed',
                    'undo',
                    'redo'
                ]
            },
            // Rest of your configuration options...
        };
    }
}

export default Editor;
