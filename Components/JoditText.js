import React, { useState, useRef, useMemo } from "react";
const importJodit = () => import('jodit-react');

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(importJodit, {
    ssr: false,
});

export default function JoditText({ placeholder })  {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo( () => ({
      height: "auto",
      readonly: false,
	  
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
}
