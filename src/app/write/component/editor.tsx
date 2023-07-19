"use client";

import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import WriteButton from './write.button';
import EditorController from './controller/editor.controller';
import TransactionDialog from '@/common/component/tx.dialog';
import { useWrite } from '@/common/hooks/article/write';
import { useUpload } from '@/common/hooks/ipfs/upload';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';


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
  
  const { mint } = useWrite();
  const { upload } = useUpload();
  const [value, setValue] = useState<string | undefined>();
  const [hash,setHash] = useState<`0x${string}`|undefined>();
  const [cids,setCids] = useState<string|undefined>()

  const { address } = useAccount();
  const { config, error: prepareError, isError: isPrepareError, isSuccess:prepareSuccess } = usePrepareContractWrite({
    address: '0x476059cD57800DB8eB88f67c2Aa38A6fCf8251e0',
    abi: [
        {
            "inputs": [
                {
                    internalType: "address",
                    name: "to",
                    type: "address"
                },
                {
                    internalType: "string",
                    name: "uri",
                    type: "string"
                }
            ],
            name: "safeMint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        },
    ],
    functionName: 'safeMint',
    args: [address!, cids?cids:''],
    enabled: Boolean(cids),
})
const { data, write } = useContractWrite(config);
const { isLoading:txLoading, isSuccess:txSuccess } = useWaitForTransaction({
  hash : data?.hash
})

  const handleChange = (newValue: string | undefined) => {
      setValue(newValue);
  }

  const handleClick = async () => {        
      if (!value) return;
      console.log('[handleClick]');
      setCids((await upload(value)).toString());            
  }

  useEffect(() => {
    if(!hash) return;

  },[hash])

  useEffect(() => { 
    if(prepareSuccess){
      write?.();
    } 
  },[prepareSuccess])

  useEffect(() => {
    if(txLoading) {
      console.log('tx Loading ...')
    }
    if(txSuccess) {
      console.log('tx Success!')
    }
  },[txLoading,txSuccess])
  
  return (
    <div style={{height:'100%'}}>  
      <QuillWrapper style={{height:'100%', background:'white'}} modules={modules} formats={formats} theme='snow' onChange={(content, delta, source, editor) => handleChange(editor.getHTML())}/>
      <WriteButton clickHandler={handleClick}/>
      <TransactionDialog isVisible={txLoading} hash={data?.hash}/>
    </div>
  );
};

export default EditorComponent;
