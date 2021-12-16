import React, { useCallback, useContext, useState } from 'react'
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
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

import { Nft } from 'config/constants/types'
import { useHistory } from 'react-router-dom'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getNewNftContract } from '../../utils/contracts'
import ClaimNftModal from './ClaimNftModal'

interface GiftNft extends Nft {
  isClaimed: boolean
  tokenId: number
}
interface NftCardProps {
  nft: GiftNft
}

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
padding:0 24px 24px:`

const Value = styled(Text)`
  font-weight: 600;
`
const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: false,
    nftCount: 0,
    nftBurnCount: 0,
  })
  const [maxMint, setMaxMint] = useState(0)

  const TranslateString = useI18n()

  const { reInitialize } = useContext(NftProviderContext)
  const { account } = useWallet()
  const history = useHistory()
  const { nftId, name, previewImage, originalImage, description, tokenAmount, tokenSupply, isClaimed } = nft
  const loggedIn = account != null

  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

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

  const handleClaimNft = () => reInitialize()

  const fetchDetails = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      const { methods } = getNewNftContract()
      const nftCount = await methods.nftCount(nftId).call()
      const nftBurnCount = await methods.nftBurnCount(nftId).call()

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isDataFetched: true,
        nftCount: parseInt(nftCount, 10),
        nftBurnCount: parseInt(nftBurnCount, 10),
      }))
    } catch (err) {
      console.error(err)
    }
  }, [nftId])

  const [onClaimNft] = useModal(<ClaimNftModal nft={nft} onSuccess={handleClaimNft} />)
  // console.log(nft)
  return (
    <Card>
      <Image src={`/images/nfts/${previewImage}`} alt={name} />

      <CardBody>
        <Header>
          <Heading>{name}</Heading>{' '}
        </Header>
        {loggedIn && isClaimed && (
          <Button fullWidth variant="primary" mt="24px" disabled>
            Already Claimed
          </Button>
        )}
        {loggedIn && !isClaimed && (
          <Button fullWidth variant="primary" mt="24px" onClick={onClaimNft}>
            Claim NFT
          </Button>
        )}
      </CardBody>
      <CardFooter p="2">
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
