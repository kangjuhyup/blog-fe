"use client";

import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import WriteButton from './write.button';
import EditorController from './controller/editor.controller';
import TransactionDialog from '@/common/component/tx.dialog';


const QuillWrapper = dynamic(() => import("react-quill"), {
   ssr: false ,
   loading : () => <p>Loading...</p>
  });


const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
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
]

const EditorComponent = () => {
  
  const { handleClick, handleChange,hash } = EditorController();

  useEffect(() => {
    if(!hash) return;

  },[hash])
  
  return (
    <div style={{height:'100%'}}>  
      <QuillWrapper style={{height:'100%', background:'white'}} modules={modules} formats={formats} theme='snow' onChange={(content, delta, source, editor) => handleChange(editor.getHTML())}/>
      <WriteButton clickHandler={handleClick}/>
      <TransactionDialog isVisible={hash!==undefined} hash={hash}/>
    </div>
  );
};

export default EditorComponent;
