import React from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/punk'
import NftCard from './NftCard'
import NftGrid from './NftGrid'

const NftList = () => {
  return (
    <NftGrid>
      {orderBy(nfts, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <NftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default NftList
