import React,{useContext} from "react"
import styled from "styled-components"
import { Heading, LogoIcon, Text, Button } from '@pancakeswap-libs/uikit'
import nfts from 'config/constants/giftnfts'
import Page from 'components/layout/Page'
import NftProvider from '../../contexts/NftProvider'
import NftList from './NftList'

// import GiftProvider from "../../contexts/GiftProvider"
// import NftCard from './NftCard'

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

const Detail = (props) => {
    const { match } = props
    const id = parseInt(match.params.id)
    // const nft1 = nfts.filter((nft) => nft.nftId === id)
    
    return(
        <NftProvider>
            <Page>
                <StyledHero>
                {/* <CustomHeading as="h1" size="xxl" color="#9f0d0d" mb="24px">
                {nft1[0] && nft1[0].name}
          </CustomHeading>                */}
           </StyledHero>
           {/* <Grid> */}
               <NftList id={id}/>
           {/* </Grid> */}
            </Page>
        </NftProvider>
    )}
    export default Detail