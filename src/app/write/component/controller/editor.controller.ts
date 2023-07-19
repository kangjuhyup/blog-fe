import { useWrite } from "@/common/hooks/article/write"
import { useUpload } from "@/common/hooks/ipfs/upload";
import { useState } from "react";
import { useWaitForTransaction } from "wagmi";

const EditorController = () => {
    const { mint, wait, write } = useWrite();
    const { upload } = useUpload();
    const [value, setValue] = useState<string | undefined>();
    const [hash,setHash] = useState<`0x${string}`|undefined>();

    const handleChange = (newValue: string | undefined) => {
        setValue(newValue);
    }

    const handleClick = async () => {        
        if (!value) return;
        console.log('[handleClick]');
        const cids = (await upload(value)).toString();      
        console.log('cids => ', cids)  ;
        setHash(await mint(cids));
    }

    return {
        handleChange,
        handleClick,
        hash,
    }
}

export default EditorController;