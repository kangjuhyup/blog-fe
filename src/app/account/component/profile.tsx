"use client";

import { useAccount } from "wagmi";
import Avatar from "boring-avatars";
import { useGetInfo } from "@/common/hooks/profile/getInfo";
import { useEffect } from "react";

const Profile = () => {
    const { address } = useAccount();
    const { user, getInfo } = useGetInfo();

    useEffect(() => {
        getInfo();
    },[])

    return (
        <div style={{ width: '100%', height: '600px', position: 'relative', background: 'transparent' }}>
            <div style={{width: '100%', height: '470px', position: 'relative', background: 'red'}}>
                
                <div style={{
                    background: 'blue',
                    position: 'absolute',
                    left: '20px',
                    bottom: '-40px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <Avatar size={200} variant="marble" name={address} />
                </div>
                <div style={{
                    width: '100vw',
                    height: 'auto',
                    position: 'absolute',
                    background: 'transparent',
                    bottom: '-130px',
                    padding: '10px'
                }}
                >
                    <p style={{ fontWeight: 'bolder', fontSize: '20pt', color: 'white' }}>UnNamed</p>
                    <p style={{ color: 'gray' }}>{address}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;