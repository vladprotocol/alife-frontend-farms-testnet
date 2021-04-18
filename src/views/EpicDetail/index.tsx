import React from 'react'
import styled from 'styled-components'
import { Heading, LogoIcon, Text, Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import nfts from 'config/constants/epic'
import NftCard from './components/NftCard'
import NftList from './components/NftList'
import NftProvider from './contexts/NftProvider'
import NftInfo from './components/NftInfo'

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

const Detail = (props) => {
  const TranslateString = useI18n()
  const { match } = props
  const id = parseInt(match.params.id)

  const nft1 = nfts.filter((nft) => nft.nftId === id)

  if (nft1[0]) {
    return (
      <NftProvider>
        <Page>
          <StyledHero>
            <CustomHeading as="h1" size="xxl" color="#5ca269" mb="24px">
              {nft1[0] && nft1[0].name}
            </CustomHeading>
          </StyledHero>
          <NftCard nft={nft1[0]} />
        </Page>
      </NftProvider>
    )
  }

  return (
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading size="xxl">404</Heading>
        <Text mb="16px">{TranslateString(999, 'Oops, page not found.')}</Text>
        <Button as="a" href="/" size="sm">
          {TranslateString(999, 'Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default Detail
