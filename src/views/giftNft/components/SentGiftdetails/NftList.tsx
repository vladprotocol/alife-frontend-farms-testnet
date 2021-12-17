import React, { useContext, useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Nfts from 'config/constants/newnfts'
import Page from 'components/layout/Page'
import styled from "styled-components"
import { Heading, LogoIcon, Text, Button } from '@pancakeswap-libs/uikit'
import { NftProviderContext } from '../../contexts/NftProvider'
import NftCard from './NftCard'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const CustomHeading = styled(Heading)`
  text-align: center;
`

const Grid = styled.div`
  display: flex;
  width: 100%;
`
const Section = styled.div`
  width: 50%;
  padding: 10px;
`

const SentGift = (props) => {
const {id} = props
console.log(id)

    const { myGifts, myNfts, myGiftsdetails,getNftSentDetails } = useContext(NftProviderContext)
    useEffect(()=> getNftSentDetails,[getNftSentDetails])
    console.log(myGiftsdetails)
    const nft1 = myGiftsdetails.filter((nft)=>nft.nftId === id)

  return (

    <div>
      { myGiftsdetails &&(
        <Page>
                <StyledHero>
                  
                <CustomHeading as="h1" size="xxl" color="#9f0d0d" mb="24px">
                {nft1[0] && nft1[0].name}
          </CustomHeading>              
           </StyledHero>
           
               <NftCard nft={nft1[0]}/>
            </Page>)}


        
      {/* <NftList nfts={myGiftsdetails} /> */}
    </div>
  )
}

export default SentGift
