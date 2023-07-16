"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Profile } from "./profile";
import HoverLink from "./hover.link";
import { useSignIn } from "../hooks/wallet/signIn";

const WalletComponent = () => {
  const { isConnected } = useAccount();
  const { signIn, isError, isSuccess, isLoading, isPrepare } = useSignIn();
  const { disconnect } = useDisconnect();

  const [isOpened, setOpened] = useState(false);

  const handleConnect = () => {
    setOpened(true);
  };

  useEffect(() => {
    disconnect();
  },[isError])

  useEffect(() => {
    if (isConnected && isPrepare && !isSuccess ) {
      setOpened(false);
      signIn();
    }
  }, [isConnected, isPrepare])

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
          <HoverLink style={{
            position: 'relative',
            width: '30px',
            border: 'solid',
            borderRadius: '4px',
            borderColor: 'orange',
            padding: '2px',
          }}
            hoverEvent={() => {
              console.log('hover')
            }}
            href={"/"}
            hoverChildren={
              <div style={{
                position: 'absolute', width: '200px', height: '450px', top: '0px', right: '0px', background: 'transparent', paddingTop: '50px'
              }}>
                <li style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '10px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  listStyle: 'none',
                  color : 'black'
                }}>
                  <ul style={{ margin: 0, padding: 0 }}>
                    <li style={{
                      padding: '5px 0',
                      
                    }}><Link href={"/account"}>계정 정보</Link></li>
                    <li style={{
                      padding: '5px 0',
                    }}
                    onClick={() => disconnect()}
                    >로그 아웃</li>
                  </ul>
                </li>
              </div>
            }>
            <img src="account.svg" />
          </HoverLink>
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
          onClick={() => handleConnect()}
        >
          Connect Wallet
        </button>

      )}
      {isOpened ? <Profile /> : <></>}
    </>
  );
};

export default WalletComponent;
