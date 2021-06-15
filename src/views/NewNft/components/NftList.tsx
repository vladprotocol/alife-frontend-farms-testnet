import React from 'react'
import orderBy from 'lodash/orderBy'
import NftCard from './NftCard'
import NftGrid from './NftGrid'

const NftList = (props) => {
  const { data: nfts } = props
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
