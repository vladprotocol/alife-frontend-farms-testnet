import React, { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import ContractAddresses from 'config/constants/contracts'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getContract } from 'utils/erc20'
import { getContract as getNftContract } from 'utils/web3'
import giftNftAbi from 'config/abi/NftWithToken.json'

interface GiftProviderProps {
  children: ReactNode
}

const CONTRACT_ADDRESS_TEST = 97
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

  const fetchGiftNftContract = useCallback(async () => {
    return getNftContract(giftNftAbi, ContractAddresses.giftNFT[CONTRACT_ADDRESS_TEST])
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
      const allowance = await contract.methods
        .allowance(account, ContractAddresses.giftNFT[CONTRACT_ADDRESS_TEST])
        .call()
      console.log({ allowance })
      if (allowance > 0) {
        setState((prev) => ({ ...prev, isApproved: true }))
      } else {
        setState((prev) => ({ ...prev, isApproved: false }))
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
        fetchGiftNftContract,
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
