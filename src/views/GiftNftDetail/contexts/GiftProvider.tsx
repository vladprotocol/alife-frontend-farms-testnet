import React, { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { ethers } from 'ethers'

import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import ContractAddresses from 'config/constants/contracts'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getContract } from 'utils/erc20'

interface GiftProviderProps {
  children: ReactNode
}

type State = {
  isInitialized: boolean
  isApproved: boolean
}

// type Context = {
//   // getTokenIds: (nftId: number) => number[]
//   reInitialize: () => void
//   checkAllowance: () => any
// } & State

export const GiftProviderContext = createContext(null)

const GiftProvider: React.FC<GiftProviderProps> = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    isApproved: false,
  })
  const { account, ethereum } = useWallet()

  const reInitialize = useCallback(() => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }, [])

  const checkAllowance = useCallback(
    async (tokenAddress) => {
      if (!account) return
      if (!tokenAddress) return
      reInitialize()
      console.log({ account, tokenAddress })
      const contract = await getContract(ethereum as provider, tokenAddress)
      setState((prev) => ({ ...prev, isInitialized: true }))
      const allowance = await contract.methods.allowance(account, ContractAddresses.giftNFT[97]).call()
      if (allowance > 0) setState((prev) => ({ ...prev, isApproved: true }))
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
      }}
    >
      {children}
    </GiftProviderContext.Provider>
  )
}

export default GiftProvider
