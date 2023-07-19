'use client';

import { createHelia } from 'helia'
import { useState, useEffect } from 'react'
import { useIpfsStore } from '../store/ipfs';

const IpfsComponent = () => {
    const { setIpfs,id,isOnline } = useIpfsStore();

    useEffect(() => {
        setIpfs();
    },[])

  return (
    <div style={{ background: 'black',color:'orange'}}>
      <h4>ID: {id?.toString()}</h4>
      <h4 >Status: {isOnline ? 'Online' : 'Offline'}</h4>
    </div>
  )
}

export default IpfsComponent