"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

export const useGetInfo = () => {
  const { address } = useAccount();

  const [user,setUser] = useState({});

  const [state, setState] = useState<{
    prepare? : boolean
    loading?: boolean;
    success? : boolean;
    error? : boolean;
  }>({});





  const getInfo = async () => {
    console.log('[getInfo]')
    if (!address) {
      return;
    }

    setState((x) => ({ ...x, loading: true }));


    await axios
      .get(`http://localhost:8000/api/user/info?address=${address}`, {
      })
      .catch((error:any) => {
        console.log('error => ' , error);
        setState((x) => ({...x,loading:false, nonce: undefined, error : true, prepare: false}))
      })
      .then((response:any) => {
        console.log('response => ' , response)
        if(response.success) {
            setUser(response.user);
            setState((x) => ({...x,loading:false, success:true}))
        } 
      });
  };

  return {
      getInfo,
      isPrepare : state.prepare,
      isError : state.error,
      isSuccess : state.success,
      isLoading : state.loading,
      user,
  }
};
