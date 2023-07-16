"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

export const useSignIn = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const [state, setState] = useState<{
    prepare? : boolean
    loading?: boolean;
    success? : boolean;
    error? : boolean;
    nonce?: string;
  }>({});

  useEffect(() => {
    fetchNonce();
  },[])

  const fetchNonce = async () => {
    console.log('[fetchNonce]')
    const nonceRes = (
      await axios.get(`http://localhost:8000/api/auth/nonce`,{ withCredentials: true })
    );
    if(nonceRes.status === 200) {
      const nonceData = nonceRes.data;
      if(nonceData.success) setState((x) => ({ ...x, nonce :  nonceData.nonce, prepare:true }));
    }
  };

  const signIn = async () => {
    console.log('[signIn]')
    const chainId = chain?.id;
    if (!address || !chainId || !state.nonce) {
      return;
    }

    const data = {
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce: state.nonce,
    }

    setState((x) => ({ ...x, loading: true }));
    const message = new SiweMessage(data);

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });


    await axios
      .post(`http://localhost:8000/api/auth/logIn`, {
        message,
        signature,
      }, { withCredentials: true })
      .catch((error:any) => {
        console.log('error => ' , error);
        setState((x) => ({...x,loading:false, nonce: undefined, error : true, prepare: false}))
        fetchNonce();
      })
      .then((verify:any) => {
        console.log('verify => ' , verify)
        if(verify.success) {
            setState((x) => ({...x,loading:false, success:true}))
        } 
      });
  };

  return {
      signIn,
      isPrepare : state.prepare,
      isError : state.error,
      isSuccess : state.success,
      isLoading : state.loading,
  }
};
