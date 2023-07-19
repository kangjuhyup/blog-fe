"use client";

import { useIpfsStore } from "@/common/store/ipfs"
import { strings } from '@helia/strings'

export const useUpload = () => {
    const { helia } = useIpfsStore();

    const upload = async (article:string) => {
        const s = strings(helia)
        const immutable = await s.add(article);
        console.log('immutable => ' , immutable);
        return immutable;
    }

    return {
        upload
    }
}