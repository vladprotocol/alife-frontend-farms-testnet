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
  useModal,
} from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import {  NftFarm, NFT } from 'config/constants/newnfts'
import { useHistory } from 'react-router-dom'
import { usePancakeRabbits } from 'hooks/useContract'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getNewNftContract } from '../../utils/contracts'


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
  console.log({nft})
  const [state, setState] = useState({
    isLoading: false,
    isOpen: false,
    nftCount: 0,
    nftBurnCount: 0,
  })
  const [minted, setMinted] = useState(0)
  const [maxMint, setMaxMint] = useState(0)
  const [price, setPrice] = useState(new BigNumber(0))
  const TranslateString = useI18n()
  const {
    isInitialized,
    getTokenIds,
    reInitialize, 
    isApproved,
  } = useContext(NftProviderContext)
  const { account } = useWallet()
  const history = useHistory()

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState(null)
  
  const { nftId, name, previewImage, originalImage, description, tokenAmount, tokenSupply } = nft

  const firstCharOfAccount = account != null && account.slice(0, 4)
  const lastCharOfAccount = account != null && account.slice(-4)

  const accountName = account != null && `${firstCharOfAccount}...${lastCharOfAccount}`

  const loggedIn = account !== null

  const tokenIds = getTokenIds(nftId)

  useEffect(() => {
    const getNftInfoState = async () => {
      const newFarmContract = getNewNftContract()
      const nftInfoState = await newFarmContract.methods.nftInfoState(nftId).call()
      const { minted: mintedValue, maxMint: maxMintValue, price: priceValue } = nftInfoState
      setMinted(parseInt(mintedValue))
      setMaxMint(parseInt(maxMintValue))
      setPrice(new BigNumber(priceValue).div(new BigNumber(10).pow(18)))
    }
    getNftInfoState()
  }, [nftId, isInitialized])

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

  const nftContract = usePancakeRabbits(NFT)

  const handleApprove = useCallback(async () => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }))
      setRequestedApproval(true)
      await nftContract.methods
        .setApprovalForAll(NftFarm, 'true')
        .send({ from: account })
        .on('sending', () => {
          setIsLoading(true)
        })
        .on('receipt', () => {
          console.log('receipt')
        })
        .on('error', () => {
          setError('Unable to transfer NFT')
          setIsLoading(false)
        })
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isDataFetched: true,
      }))

      fetchDetails()
      reInitialize()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [account, nftContract, reInitialize, fetchDetails])

  const handleSuccess = () => {
    fetchDetails()
    reInitialize()
  }


  return (
    <Card >
      <Image src={`/images/nfts/${previewImage}`} alt={name} />
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
          {isInitialized  && (
            <Tag outline variant="success">
              {TranslateString(526, 'Available')}
            </Tag>
          )}
          {isInitialized  && (
            <Tag outline variant="failure">
              Sold Out
            </Tag>
          )}
          {isInitialized && loggedIn && (
            <Tag outline variant="secondary">
              {TranslateString(999, 'In Wallet')}
            </Tag>
          )}
        </Header>
        {isInitialized && loggedIn  && !isApproved && (
          <Button
            fullWidth
            variant="primary"
            mt="24px"
            onClick={() => {
              handleApprove()
            }}
          >
            Approve Transfer
          </Button>
        )}
        {isInitialized && (
          <Button fullWidth onClick={() => history.push(`shibari-detail/${nftId}`)} mt="24px">
            <ViewNft>
              View NFT 
            </ViewNft>
          </Button>
        )}
        
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
            <InfoRow>
              <Text>{TranslateString(999, 'Number minted')}:</Text>
              <Value>
              </Value>
            </InfoRow>
            <InfoRow>
              <Text>Owned By Me:</Text>
            </InfoRow>
          </InfoBlock>
        )}
      </CardFooter>
    </Card>
  )
}

export default NftCard
