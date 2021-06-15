import React, { useContext } from 'react'
import { Card, CardBody, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import nfts from 'config/constants/epic'
import { NftProviderContext } from '../contexts/NftProvider'
import InfoRow from './InfoRow'

const NftProgressSimple = () => {
  const TranslateString = useI18n()
  const { isInitialized, currentDistributedSupply, totalSupplyDistributed, countBurnt, myMints } =
    useContext(NftProviderContext)

  let myNFTs = 0

  nfts.forEach(function (nft, key) {
    const { nftId } = nft
    const MINTS = myMints[nftId] || 0
    myNFTs += MINTS
  })

  return (
    <Card>
      <CardBody>
        <InfoRow>
          <Text>{TranslateString(999, 'My Epic NFTs')}:</Text>
          <Text>
            <strong>{myNFTs}</strong>
          </Text>
        </InfoRow>
      </CardBody>
    </Card>
  )
}

export default NftProgressSimple
