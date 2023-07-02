import { InjectedConnector } from "@wagmi/core";
import { configureChains, createConfig, createStorage } from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { karam } from "./chain";


const { chains, publicClient } = configureChains(
  [karam],
  [publicProvider()]
)

export const wagmi_config = createConfig({
    autoConnect : true,
    connectors : [new InjectedConnector({chains})],
    publicClient,
    storage: createStorage({ storage: window.localStorage }),
  })