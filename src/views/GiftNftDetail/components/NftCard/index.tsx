import React, { useState, useContext, useCallback } from 'react'
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share'

import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
  LogoIcon,
} from '@pancakeswap-libs/uikit'

import useI18n from 'hooks/useI18n'

import InfoRow from '../InfoRow'
import Image from '../Image'

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 0 24px 24px;
`

const Value = styled(Text)`
  font-weight: 600;
`

const DetailCard = styled(Card)`
  text-align: center;
`

const CustomButton = styled(Button)`
  margin-left: 10px;
`
const Grid = styled.div`
  display: flex;
  float: right;
  width: 50%;
`
const Section = styled.div`
  width: 50%;
  margin-top: 10px;
`

const NftCard = ({ nft }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: true,
    nftCount: 0,
    nftBurnCount: 0,
  })
  const TranslateString = useI18n()
  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

  // maxMintPerNft limit max amount that a nft can be minted
  // maxMintByNft array containing individual amount of mint per nft index
  // prices array containing individual prices of a mint per nft index
  // tokenPerBurn global price

  const { nftId, name, previewImage, originalImage, description, tokenAmount, tokenSupply } = nft

  const fetchDetails = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))

    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleClick = async () => {
    if (state.isOpen) {
      setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
    } else {
      try {
        await fetchDetails()
      } catch (error) {
        console.error(error)
      } finally {
        setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
      }
    }
  }

  return (
    <DetailCard>
      <Image src={originalImage} alt={name} />

      <CardBody>
        <Header>
          <Heading>{name} </Heading>

          <Grid>
            <Section>
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </Section>
            <Section>
              <TelegramShareButton url={window.location.href}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </Section>
            <Section>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </Section>
          </Grid>
        </Header>
      </CardBody>
      <CardFooter p="0">
        <DetailsButton endIcon={<Icon width="24px" color="primary" />} onClick={handleClick}>
          {state.isLoading ? TranslateString(999, 'Loading...') : TranslateString(999, 'Details')}
        </DetailsButton>
        {state.isOpen && (
          <InfoBlock>
            <Text as="p" color="textSubtle" mb="16px" style={{ textAlign: 'center' }}>
              {description}
            </Text>
          </InfoBlock>
        )}
      </CardFooter>
    </DetailCard>
  )
}

export default NftCard
