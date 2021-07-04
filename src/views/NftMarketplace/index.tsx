import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Button } from '@pancakeswap-libs/uikit'
import nftFarmV2 from 'config/abi/NftFarmV2.json'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import nfts from 'config/constants/newnfts'
import NftList from './components/NftList'
import NftProvider from './contexts/NftProvider'
import NftInfo from './components/NftInfo'
import { getNftContract, getFromWei, getToFloat, getToInt, getFromWayArray, getNewNftContract } from './utils/contracts'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const CustomButton = styled(Button)`
  margin-right: 20px;
`

const GoldenButton = styled(Button)`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(110, 80, 20, 0.4), inset 0 -2px 5px 1px rgba(139, 66, 8, 1),
    inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
  background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
  border: 1px solid #a55d07;
  color: rgb(120, 50, 5);
  text-shadow: 0 2px 2px rgba(250, 227, 133, 1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-size: 100% 100%;
  background-position: center;

  &:focus,
  &:hover {
    background-size: 150% 150%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23), inset 0 -2px 5px 1px #b17d10,
      inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
    border: 1px solid rgba(165, 93, 7, 0.6);
    color: rgba(120, 50, 5, 0.8);
  }
  &:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(110, 80, 20, 0.4), inset 0 -2px 5px 1px #b17d10,
      inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
  }
`

const NftMarketplace = () => {
  const TranslateString = useI18n()

  const [NFTs, setNFTs] = useState(nfts)

  const filterNFTs = useCallback(async (rarity = '') => {

    const filteredNFTs = rarity !== '' ? nfts.filter((nft) => nft.rarity === rarity) : nfts;

    const newNftContract = getNewNftContract()

    const sellableNFTs = [];
    filteredNFTs.forEach(async (nft) => {
      const nftSecondaryMarket = await newNftContract.methods.nftSecondaryMarket(nft.nftId).call()
      const { nftId, allowSell, sellMinPrice, totalArtistFee, totalGovernanceFee, lastSellIn, lastSellPrice, qtdSells, totalCollected, totalDevFee } = nftSecondaryMarket;
      if(nftSecondaryMarket.allowSell === true) {
        const sellableTradeIds = await newNftContract.methods.getListOpenTradesByNftId(nft.nftId).call()
        const totalQuantity = Array.isArray(sellableTradeIds) && sellableTradeIds.length
        console.log("sellableTradeIds", sellableTradeIds, totalQuantity)
        const tmpObj = {...nft, allowSell, sellMinPrice, totalArtistFee, totalGovernanceFee, lastSellIn, lastSellPrice, qtdSells, totalCollected, totalDevFee, sellableTradeIds, totalQuantity}
        if(totalQuantity > 0) {
          sellableNFTs.push(tmpObj);
        }
      }
    })
    console.log("test", sellableNFTs);
    setNFTs(sellableNFTs)
  }, [])

  useEffect(() => {
    filterNFTs()
  }, [filterNFTs])

  return (
    <NftProvider>
      <Page>
        <StyledHero>
          <Heading as="h1" size="xl" color="#9f0d0d" mb="24px">
            NFT Marketplace
          </Heading>
          <Heading as="h2" size="lg" color="#9f0d0d">
            {TranslateString(999, 'Trade in for ALIFE, or keep for your collection!')}
          </Heading>
          <CustomButton onClick={() => filterNFTs('Base')} mt="24px">
            Base NFTs
          </CustomButton>
          <CustomButton variant="success" onClick={() => filterNFTs('Rare')} mt="24px">
            Rare NFTs
          </CustomButton>
          <CustomButton variant="subtle" onClick={() => filterNFTs('Epic')} mt="24px">
            Epic NFTs
          </CustomButton>
          <GoldenButton onClick={() => filterNFTs('Legendary')} mt="24px">
            Legendary NFTs
          </GoldenButton>
        </StyledHero>

        <NftInfo />
        <NftList data={NFTs} />
      </Page>
    </NftProvider>
  )
}

export default NftMarketplace
