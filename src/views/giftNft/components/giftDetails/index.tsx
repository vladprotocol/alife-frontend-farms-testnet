import React,{useContext} from "react"
import styled from "styled-components"
import { Heading, LogoIcon, Text, Button } from '@pancakeswap-libs/uikit'
import nfts from 'config/constants/giftnfts'
import Page from 'components/layout/Page'
import NftProvider from '../../contexts/NftProvider'
import NftPage from './NftPage'

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


const NFTDetail = (props) => {
    const { match } = props
    const id = parseInt(match.params.id)
    // const nft1 = nfts.filter((nft) => nft.nftId === id)
    
    return(
          
        <NftProvider>
            <Page>
               <NftPage id={id}/>
            </Page>
        </NftProvider>
    )}
    export default NFTDetail