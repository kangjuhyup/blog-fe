
import WagmiProvider from "../common/component/wagmi"
import React from "react"

const RootProvider = ({children} : { children : React.ReactNode }) => {
    return (
        <WagmiProvider>
            {children}
        </WagmiProvider>
    )
}

export default RootProvider;