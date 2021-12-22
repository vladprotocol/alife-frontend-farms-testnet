import { useCallback, useEffect, useState } from 'react'

declare const window: any
const useChainId = () => {
  const defaultChain = parseInt(process.env.REACT_APP_CHAIN_ID)
  const [chainId, setChainId] = useState(defaultChain)

  const fetchChainId = useCallback(async () => {
    if (window.ethereum) {
      const ethereum = window.ethereum
      let chain = await ethereum.request({
        method: 'eth_chainId',
      })
      chain = parseInt(chain, 16)
      setChainId(chain)

      window.ethereum.on('chainChanged', function (changedChain) {
        const newChain = parseInt(changedChain, 16)
        setChainId(newChain)
      })
    }
  }, [])

  useEffect(() => {
    fetchChainId().catch((err) => console.error(err.stack))

    const refreshChainId = setInterval(fetchChainId, 1000)
    return () => clearInterval(refreshChainId)
  }, [fetchChainId])

  return chainId
}

export default useChainId
