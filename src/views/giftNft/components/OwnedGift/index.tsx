import React, { useContext, useEffect } from 'react'

import NftList from './NftList'

import { NftProviderContext } from '../../contexts/NftProvider'

const OwnedGift = () => {
  const { myNftdetails,getNftRecievedDetails } = useContext(NftProviderContext)

  useEffect (()=>{
   return  getNftRecievedDetails()

  },[getNftRecievedDetails])

  

  return (
    <div>
      <NftList nfts={myNftdetails} />
    </div>
  )
}

export default OwnedGift
