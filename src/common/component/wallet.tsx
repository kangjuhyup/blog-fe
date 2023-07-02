import { InjectedConnector } from "@wagmi/core";
import Link from "next/link";
import { useAccount, useConnect } from "wagmi";

const WalletComponent = () => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector : new InjectedConnector()
})
  return (
    <>
      {isConnected ? (
        <div
          style={{
            position: "absolute",
            right: "20px",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Link style={{ width: '30px', border: 'solid', borderRadius: '4px', borderColor: 'orange', padding: '2px' }} href={"/account"}>
            <img src="account.svg" />
          </Link>
          <Link style={{ width: '30px', border: 'solid', borderRadius: '4px', borderColor: 'orange', padding: '2px' }} href={"/write"}>
            <img src="write.svg" />
          </Link>
          <Link style={{ width: '30px', border: 'solid', borderRadius: '4px', borderColor: 'orange', padding: '2px' }} href={"/cart"}>
            <img src="cart.svg" />
          </Link>
        </div>
      ) : (
        <button
          style={{
            position: "absolute",
            right: "20px",
            color: "orange",
            fontWeight: "bold",
          }}
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default WalletComponent;
