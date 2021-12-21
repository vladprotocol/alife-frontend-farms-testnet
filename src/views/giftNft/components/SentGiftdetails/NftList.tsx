import React, { useContext, useEffect, useState } from 'react'
import Page from 'components/layout/Page'
import styled from "styled-components"
import { Heading } from '@pancakeswap-libs/uikit'
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
const[nftdata,setNftData] = useState(null);

    const {myGiftsdetails,getNftSentDetails} = useContext(NftProviderContext)
  
    useEffect(()=> getNftSentDetails(),[getNftSentDetails])
    useEffect(()=>{
      if(!myGiftsdetails && myGiftsdetails.length<1) return

      const nft1 = myGiftsdetails.find((nft)=>Number(nft.tokenId) === id)
      setNftData(nft1);
    },[id,myGiftsdetails])


    

  return (
    <div>
      {nftdata && (
        <Page>
        <StyledHero>
        <CustomHeading as="h1" size="xxl" color="#9f0d0d" mb="24px">
                {nftdata.name}
          </CustomHeading>              
           </StyledHero>
           <NftCard nft={nftdata}/>
            </Page>
      )}
        
    </div>
  )
}

export default SentGift
