import axios from "axios";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const useWrite = () => {
    const { address } = useAccount();
    const [state, setState] = useState<{
        loading?: boolean;
        success? : boolean;
        error? : boolean;
      }>({});

    const write = async (cids:string, hash:string) => {
        setState((x) => ({...x,loading:true}))
        await axios
        .post(`http://localhost:8000/api/article/write`, {
            address,
            cids,
        })
    }

    const mint = async (cids:string) => {
        setState((x) => ({...x,loading:true}))
        const { config , error:prepareError, isError : isPrepareError } = usePrepareContractWrite({
            address : '0x...',
            abi : [
                {
                    name :'mint',
                    type :'function',
                    stateMutability: 'nonpayable',
                    inputs: [
                        { internalType : 'string', name: 'cids', type: 'string'}
                    ],
                    outputs: [],
                }
            ],
            functionName: 'mint',
            args : [cids],
            enabled : Boolean(cids),            
        })
        
        if(isPrepareError) {
            setState((x) => ({...x,loading:false}))
            throw prepareError;
        }
        const { data, write } = useContractWrite(config);
        write?.();
        return data?.hash;
    }

    const wait = (hash:`0x${string}`) => useWaitForTransaction({
        hash: hash
    })


    return {
        mint,
        wait,
        write
    }
}

