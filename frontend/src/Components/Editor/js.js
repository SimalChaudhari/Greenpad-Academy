import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill styles

const FontEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');
  const [selectedFont, setSelectedFont] = useState('Arial');

  const handleFontChange = (font) => {
    setSelectedFont(font);
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'font': [] }],
      ],
      handlers: {
        'font': handleFontChange,
      },
    },
  };

  return (
    <div>
      <div className="font-picker">
        <select
          value={selectedFont}
          onChange={(e) => handleFontChange(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Calibri">Calibri</option>
        </select>
      </div>
      <ReactQuill
        value={editorHtml}
        onChange={setEditorHtml}
        modules={modules}
        style={{ fontFamily: selectedFont + ', sans-serif' }}
      />
    </div>
  );
};

export default FontEditor;
