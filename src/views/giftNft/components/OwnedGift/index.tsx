import React, { useContext } from 'react'

import NftList from './NftList'

import { NftProviderContext } from '../../contexts/NftProvider'

const OwnedGift = () => {
  const { myNftdetails } = useContext(NftProviderContext)

  return (
    <div>
      <NftList nfts={myNftdetails} />
    </div>
  )
}

export default OwnedGift
