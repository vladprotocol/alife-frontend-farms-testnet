import React from 'react'
import orderBy from 'lodash/orderBy'
import NftCard from './NftCard'
import NftGrid from '../NftGrid'

const NftList = (props) => {
  const { nfts } = props
  console.log(nfts)
  return (
    <NftGrid>
      {orderBy(nfts, 'sortOrder').map((nft) => (
        <div key={nft.nftId}>
          <NftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}
export default NftList
