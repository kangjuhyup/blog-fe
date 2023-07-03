import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { configureChains, createConfig, createStorage } from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { karam } from "./chain";



const { chains, publicClient, webSocketPublicClient } = configureChains(
  [karam],
  [publicProvider()]
)


 export const wagmi_config = createConfig({
    autoConnect : true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
})


  