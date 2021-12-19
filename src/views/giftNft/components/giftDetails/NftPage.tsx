import React, { useContext, useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Nfts from 'config/constants/giftnfts'
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
const[nftdata,setNftData] = useState(null);

const {fetchNftData} = useContext(NftProviderContext)
  
useEffect(()=>{

    (async () => {
        const nft1 = await fetchNftData(Number(id));
        setNftData(nft1);
      })();
     
    },[fetchNftData,id]) 


    

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
