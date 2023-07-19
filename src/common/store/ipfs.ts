import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createHelia } from 'helia'

interface IpfsState {
    helia: any;
    id: string | undefined;
    isOnline: boolean | undefined;
    setIpfs: () => void;
}

export const useIpfsStore = create<IpfsState>()(
    devtools(
        (set) => ({
            helia: undefined,
            id: undefined,
            isOnline: false,
            async setIpfs() {
                const heliaNode = await createHelia();
                const nodeId = heliaNode.libp2p.peerId.toString()
                const nodeIsOnline = heliaNode.libp2p.isStarted()
                set({
                    helia: heliaNode,
                    id: nodeId,
                    isOnline: nodeIsOnline,
                })
            }
        })
    )
)
