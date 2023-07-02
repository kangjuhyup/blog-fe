import { Chain } from "wagmi";

export const karam = {
     id: 47,
     name: "Karam",
     network: "Karam",
     nativeCurrency: {
         decimals: 18,
         name: "KARA",
         symbol: "KARA",
    },
     rpcUrls: {
         default: {
             http:  ["https://karam.carrieverse.com"],
        },
         public: {
             http:  ["https://karam.carrieverse.com"],
        },
    },
     blockExplorers: {
         default: {
             name: "Karam Explorer",
             url: "https://karamscan.carrieverse.com",
        },
    },
    contracts: {
    },
}  as const satisfies Chain