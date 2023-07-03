"use client";

import Link from "next/link";
import { HEADER_HEIGHT } from "../const";
import WalletComponent from "./wallet";
const HeaderComponent = (props: { title: string }) => {
  return (
    
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
  );
};
export default HeaderComponent;
