"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import Cookies from 'js-cookie';

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

  const { disconnect } = useDisconnect();


  useEffect(() => {
    const nonce = Cookies.get('nonce')
    if (nonce) setState((x) => ({ ...x, nonce : nonce, prepare:true }));
    else setState((x) => ({...x,loading:false,nonce:undefined, success:false,error:false}))
    
  },[Cookies.get('nonce')])

  const fetchNonce = async () => {
    console.log('[fetchNonce]')
    const cooke_nonce = Cookies.get('nonce')
    if(cooke_nonce) {
      setState((x) => ({ ...x, nonce :  cooke_nonce, prepare:true })); return
    }
    else {
      const nonceRes = (
        await axios.get(`http://localhost:8000/api/auth/nonce`,{ withCredentials: true })
      );
      if(nonceRes.status === 200) {
        const nonceData = nonceRes.data;
        if(nonceData.success) setState((x) => ({ ...x, nonce :  nonceData.nonce, prepare:true }));
      }
    }    
  };

  const signIn = async () => {
    console.log('[signIn]')
    const chainId = chain?.id;
    if (!address || !chainId || !state.nonce) {
      return;
    }
    const swie = Cookies.get('swie')
    if(swie) {
      setState((x) => ({...x,loading:false, success:true}))
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
    }).catch((error) => {
      removeCookies();
      setState((x) => ({...x,loading:false, nonce: undefined, error : true, prepare: false}))
      fetchNonce();
    });


    await axios
      .post(`http://localhost:8000/api/auth/logIn`, {
        message,
        signature,
      }, { withCredentials: true })
      .catch((error:any) => {
        console.log('error => ' , error);
        removeCookies();
        setState((x) => ({...x,loading:false, nonce: undefined, error : true, prepare: false}))
        fetchNonce();
      })
      .then((verify:any) => {
        console.log('verify => ' , verify)
        if(verify.status === 201) {
            setState((x) => ({...x,loading:false, success:true}))
        } 
      });
  };

  const handleDisconnect = () => {
    removeCookies();
    disconnect();    
  }

  const removeCookies = () => {
    Cookies.remove('nonce');
    Cookies.remove('swie');
  }

  return {
      fetchNonce,
      signIn,
      handleDisconnect,
      isPrepare : state.prepare,
      isError : state.error,
      isSuccess : state.success,
      isLoading : state.loading,
  }
};
