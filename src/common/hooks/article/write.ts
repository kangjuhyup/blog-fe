import axios from "axios";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const useWrite = () => {
    const { address } = useAccount();
    const [state, setState] = useState<{
        loading?: boolean;
        success?: boolean;
        error?: boolean;
    }>({});

    const write = async (cids: string, hash: string) => {
        setState((x) => ({ ...x, loading: true }))
        await axios
            .post(`http://localhost:8000/api/article/write`, {
                address,
                cids,
            })
    }

    const mint = async (cids: string) => {
        setState((x) => ({ ...x, loading: true }))
        const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
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
            args: [address!, cids],
            enabled: Boolean(cids),
        })

        if (isPrepareError) {
            setState((x) => ({ ...x, loading: false }))
            throw prepareError;
        }
        const { data, write } = useContractWrite(config);
        write?.();
        return data?.hash;
    }



    return {
        mint,
        write
    }
}

