import React, { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'

import { provider } from 'web3-core'
import ContractAddresses from 'config/constants/contracts'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getContract } from 'utils/erc20'

const chainId = process.env.REACT_APP_CHAIN_ID

interface GiftProviderProps {
  children: ReactNode
}

// type Context = {
//   // getTokenIds: (nftId: number) => number[]
//   reInitialize: () => void
//   checkAllowance: () => any
// } & State

export const GiftProviderContext = createContext(null)

const GiftProvider: React.FC<GiftProviderProps> = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState({
    isInitialized: false,
    isApproved: false,
    tokenContract: null,
    tokenBalance: null,
  })
  const { account, ethereum } = useWallet()

  const reInitialize = useCallback(() => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false, isApproved: false, tokenBalance: null }))
    }
  }, [])

  const checkAllowance = useCallback(
    async (tokenAddress) => {
      if (!account) return
      if (!tokenAddress) {
        setState((prev) => ({ ...prev, isApproved: false }))
        return
      }
      reInitialize()
      const contract = await getContract(ethereum as provider, tokenAddress)
      setState((prev) => ({ ...prev, isInitialized: true, tokenContract: contract }))
      const allowance = await contract.methods.allowance(account, ContractAddresses.giftNFT[chainId]).call()
      const tokenBalance = await contract.methods.balanceOf(account).call()
      if (allowance > 0) {
        setState((prev) => ({ ...prev, isApproved: true, tokenBalance }))
      } else {
        setState((prev) => ({ ...prev, isApproved: false, tokenBalance }))
      }
      // Approve Max i.e ethers.constants.MaxUint256
    },
    [ethereum, account, reInitialize],
  )

  return (
    <GiftProviderContext.Provider
      value={{
        ...state,
        reInitialize,
        checkAllowance,
        isApproved: state.isApproved,
        isInitialized: state.isInitialized,
        tokenContract: state.tokenContract,
      }}
    >
      {children}
    </GiftProviderContext.Provider>
  )
}

export default GiftProvider
