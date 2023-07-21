import { useWaitForTransaction } from "wagmi"

interface props {
    isVisible: boolean
    hash: `0x${string}`|undefined
}

const TransactionDialog = ({ isVisible, hash }: props) => {
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: hash
    })

    return (
        <>
            {
                isVisible ?
                    <div style={{ width: '100vw', height: '100vh', background: 'gray' }}>
                        <div style={{ width: '400px', height: '400px', position: 'fixed', top: '50%', 'left': '50%' }} >
                            {
                                isLoading ?
                                    <p>{hash} Loading...</p>
                                    : <></>
                            }
                            {
                                isSuccess ?
                                    <p>Success!</p>
                                    : <></>
                            }
                        </div>
                    </div>
                    : <></>
            }
        </>
    )

}

export default TransactionDialog