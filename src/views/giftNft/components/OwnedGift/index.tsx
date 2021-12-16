import React, { useContext, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import NftList from './NftList'
import nfts from '../../../../config/constants/newnfts'
import { NftProviderContext } from '../../contexts/NftProvider'



const OwnedGift = ({ nftList }) => {
  const {myGifts,myGiftsdetails} = useContext(NftProviderContext);
  
  return (
    <div>
      <NftList nfts={myGiftsdetails} />
    </div>
  )
}

export default OwnedGift
