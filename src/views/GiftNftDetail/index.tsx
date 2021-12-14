import React from 'react'
import styled from 'styled-components'
import { Heading, LogoIcon, Text, Button } from '@pancakeswap-libs/uikit'
import nfts from 'config/constants/giftnfts'

import Page from 'components/layout/Page'
import NftCard from './components/NftCard'

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
`

const Detail = (props) => {
  const { match } = props
  const id = parseInt(match.params.id)
  console.log('Gift nft details', { id })
  const nft1 = nfts.find((nft) => nft.nftId === id)

  return (
    <Page>
      <StyledHero>
        <CustomHeading as="h1" size="xxl" color="#9f0d0d" mb="24px">
          Gift NFT
        </CustomHeading>
      </StyledHero>

      <Grid>
        <Section>
          <NftCard nft={nft1} />
        </Section>
        <Section>Input</Section>
      </Grid>
    </Page>
  )
}

export default Detail
