import React, { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import GiftNfts from 'config/constants/giftnfts'
import { useNftGift } from 'hooks/useContract'
import { getContract } from 'utils/erc20'
import { provider } from 'web3-core'
import {getFromWei} from '../utils/contracts'



interface NftProviderProps {
  children: ReactNode
}

type NftMap = {
  [key: number]: number[]
}

type State = {
  isInitialized: boolean
  myNfts: number[]
  myGifts: number[]
  myGiftsdetails: any[]
  myNftdetails: any[]
  nftMap: NftMap
  isApproved: boolean
}

type Context = {
  getTokenIds: (nftId: number) => number[]
  reInitialize: () => void
  getNftSentDetails: () => void
  getNftRecievedDetails: () => void
  fetchNftData: (index: number) => any
} & State

export const NftProviderContext = createContext<Context | null>(null)

const NftProvider: React.FC<NftProviderProps> = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    nftMap: {},
    myGifts: [],
    myGiftsdetails: [],
    myNftdetails: [],
    myNfts: [],
    isApproved: false,
  })
  const { account,ethereum ,chainId} = useWallet()

  const { isInitialized } = state
  const giftContract = useNftGift(chainId)



  // Static data
  useEffect(() => {
    const fetchContractData = async () => {
      try {


        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    fetchContractData()
  }, [isInitialized, setState])

  const getTokenIds = (nftId: number) => state.nftMap[nftId]

  const fetchNftData = useCallback(
    async (index: number) => {
      try {
        const data = await giftContract.methods.getNFTdetails(index).call()
        const giftId = Number(data.giftId)
        
        const nftdetails = GiftNfts.find((nft) => nft.nftId === giftId)

        // ToDo
        // handle when nftdetails is not found

        //  to retreive the amount of token locked
        const erc20Contract = await getContract(ethereum as provider,data.token)

        const name = await erc20Contract.methods.name().call()

         // to find the number of nft's minted by given token id
        const tokenminted = await giftContract.methods.listTokenByGiftId(giftId).call()

        const nftdata = {
          ...nftdetails,
          amount: getFromWei(data.amount),
          giftId: nftdetails.nftId,
          tokenId: index,
          tokenname: name,
          isClaimed: data.isClaimed,
          tokenminted: tokenminted.length,
          giftName: data._name,
          giftMessage: data._message,
        }
        return nftdata
      } catch (err) {
        console.log(err)
        return null
      }
    },
    [ethereum,giftContract],
  )

  const getNftSentDetails = useCallback(async () => {
    try {
      if (!account) return
      const dataPromises = []
      if (!giftContract) return
      const nftIdsSent = await giftContract.methods.listTokenByMinter(account).call()
      nftIdsSent.forEach((token) => {
        dataPromises.push(fetchNftData(token))
      })
      const data = [...(await Promise.all(dataPromises))].filter((item) => item !== null)
      setState((prevState) => ({
        ...prevState,
        myNfts: nftIdsSent,
        myGiftsdetails: [...data],
      }))
    } catch (err) {
      console.log(err)
    }
  }, [account, fetchNftData, giftContract])

  const getNftRecievedDetails = useCallback(async () => {
    try {
      if (!account) return
      if (!giftContract) return

      const dataPromises = []
      const nftIdsReceieved = await giftContract.methods.listTokenByOwner(account).call()

      nftIdsReceieved.forEach((token) => {
        dataPromises.push(fetchNftData(token))
      })
      const data = [...(await Promise.all(dataPromises))].filter((item) => item !== null)

      setState((prevState) => ({
        ...prevState,
        myGifts: nftIdsReceieved,
        myNftdetails: data,
      }))
    } catch (err) {
      console.log(err)
    }
  }, [account, fetchNftData, giftContract])


  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <NftProviderContext.Provider
      value={{
        ...state,
        getTokenIds,
        reInitialize,
        getNftSentDetails,
        getNftRecievedDetails,
        fetchNftData,
      }}
    >
      {children}
    </NftProviderContext.Provider>
  )
}

export default NftProvider
