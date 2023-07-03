"use client";

import React, { useEffect, useState } from 'react';
import { WagmiConfig, createStorage } from 'wagmi';
import { wagmi_config } from '../config/wagmi';

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {

  useEffect(() => {
    wagmi_config.storage = createStorage({ storage: window.localStorage })
  }, []);

  return (
    <>
      <WagmiConfig config={wagmi_config}>{children}</WagmiConfig>

    </>
  );
};

export default WagmiProvider;