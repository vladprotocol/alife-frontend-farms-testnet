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

  const checkAllowance = useCallback(
    async (tokenAddress) => {
      if (!account) return
      const contract = await getContract(ethereum as provider, tokenAddress)
      const allowance = await contract.methods.allowance(account, ContractAddresses.busd[97]).call()
      console.log({ allowance })
    },
    [ethereum, account],
  )

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <GiftProviderContext.Provider value={{ ...state, reInitialize, checkAllowance }}>
      {children}
    </GiftProviderContext.Provider>
  )
}

export default GiftProvider
