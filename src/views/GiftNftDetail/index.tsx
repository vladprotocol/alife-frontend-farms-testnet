import React from 'react'
import styled from 'styled-components'
import { Heading, LogoIcon, Text, Button } from '@pancakeswap-libs/uikit'
import nfts from 'config/constants/giftnfts'
import Page from 'components/layout/Page'
import GiftProvider from './contexts/GiftProvider'

import NftCard from './components/NftCard'
import GiftForm from './components/SendGiftFormCard'

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
  height: 50%;
`
const Section = styled.div`
  width: 50%;
  padding: 10px;
  margin:auto;
`

const Detail = (props) => {
  const { match } = props
  const id = parseInt(match.params.id)
  const nft1 = nfts.filter((nft) => nft.nftId === id)

  return (
    <GiftProvider>
      <Page>
        <StyledHero>
          <CustomHeading as="h1" size="xxl" color="#9f0d0d" mb="24px">
            Gift NFT
          </CustomHeading>
        </StyledHero>

        <Grid>
          <Section>
            <NftCard nft={nft1[0]} />
          </Section>
          <Section>
            <GiftForm nft={nft1[0]} />
          </Section>
        </Grid>
      </Page>
    </GiftProvider>
  )
}

export default Detail
