"use client";

import Link from "next/link";
import { WagmiConfig } from "wagmi";
import { wagmi_config } from "../config/wagmi";
import { HEADER_HEIGHT } from "../const";
import WalletComponent from "./wallet";
const HeaderComponent = (props: { title: string }) => {
  return (
    <WagmiConfig config={wagmi_config}>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: HEADER_HEIGHT,
          top: "0",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Link
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
          href="/"
        >
          <img style={{ width: "40px" }} src="pentacle-coin.svg"></img>
          <p
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "orange",
              alignItems: "center",
            }}
          >
            {props.title}
          </p>
        </Link>
        <WalletComponent />
      </div>
    </WagmiConfig>
  );
};
export default HeaderComponent;
