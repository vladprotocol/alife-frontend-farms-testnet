import React from 'react'
import orderBy from 'lodash/orderBy'
import newnfts from 'config/constants/newnfts'
import NftCard from './NftCard'
import NftGrid from './NftGrid'

const NftList = () => {
  return (
    <NftGrid>
      {orderBy(newnfts, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <NftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default NftList
