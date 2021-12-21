import React, { useContext, useEffect, useState } from 'react'
import NftList from './NftList'
import { NftProviderContext } from '../../contexts/NftProvider'

const SentGift = () => {
  const { myGiftsdetails,getNftSentDetails } = useContext(NftProviderContext)

  useEffect(()=> getNftSentDetails(),[getNftSentDetails])
  return (
    <div>
      <NftList nfts={myGiftsdetails} />
    </div>
  )
}

export default SentGift
