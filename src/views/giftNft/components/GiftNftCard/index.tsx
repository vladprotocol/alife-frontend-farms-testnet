import React, { useState, useContext, useCallback, useEffect } from 'react'
import _ from 'lodash'
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
} from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import { useHistory } from 'react-router-dom'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'

interface NftCardProps {
  nft: Nft
}

const Header = styled(InfoRow)`
  min-height: 44px;
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

const ViewNft = styled(Text)`
  @media (max-width: 1300px) {
    font-size: 11px;
  }
`

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: false,
    nftCount: 0,
    nftBurnCount: 0,
  })
  const TranslateString = useI18n()
  const {
    isInitialized} = useContext(NftProviderContext)
  const { account } = useWallet()
  const history = useHistory()


  const { nftId, name, previewImage, description, } = nft

  const goGiftNft = () => history.push(`/gift-nft-detail/${nftId}`)
  

  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

  
  const fetchDetails = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))

    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
    } catch (err) {
      console.error(err)
    }
  }, [])

  const handleClick = async () => {
    if (state.isOpen) {
      setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
    } else {
      try {
        await fetchDetails()
      } catch (err) {
        console.error(err)
      } finally {
        setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
      }
    }
  }
  
  return (
    <Card >
      <Image src={`/images/nfts/${previewImage}`} alt={name} />
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
          {isInitialized && (
            <Tag outline variant="success">
              {TranslateString(526, 'Available')}
            </Tag>
          )}
        </Header>

        <Button fullWidth onClick={goGiftNft} mt="24px">
          {TranslateString(999, 'Gift this NFT')}
        </Button>
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
    </Card>
  )
}

export default NftCard
