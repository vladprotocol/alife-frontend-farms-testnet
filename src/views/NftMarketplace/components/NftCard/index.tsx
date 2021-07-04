import React, { useState, useContext, useCallback, useEffect } from 'react'
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
import _ from 'lodash'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { Nft, SellableNft } from 'config/constants/types'
import { AMOUNT_TO_CLAIM, NftFarm, NFT } from 'config/constants/newnfts'
import { useHistory } from 'react-router-dom'
import { usePancakeRabbits, useNFTFarmV2Contract } from 'hooks/useContract'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getNewNftContract } from '../../utils/contracts'

interface NftCardProps {
  nft: SellableNft
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
  const [minted, setMinted] = useState(0)
  const [maxMint, setMaxMint] = useState(0)
  const [price, setPrice] = useState(new BigNumber(0))
  const TranslateString = useI18n()
  const {
    isInitialized,
    hasClaimed,
    ownerById,
    canBurnNft,
    totalSupplyDistributed,
    currentDistributedSupply,
    getTokenIds,
    reInitialize,
    allowMultipleClaims,
    rarity,
    priceMultiplier,
    maxMintPerNft,
    tokenPerBurn,
    amounts,
    maxMintByNft,
    prices,
    myMints,
    isApproved,
  } = useContext(NftProviderContext)
  const { account } = useWallet()
  const history = useHistory()

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState(null)
  // maxMintPerNft limit max amount that a nft can be minted
  // maxMintByNft array containing individual amount of mint per nft index
  // prices array containing individual prices of a mint per nft index
  // tokenPerBurn global price

  const { nftId, name, previewImage, originalImage, description, tokenAmount, tokenSupply, sellMinPrice, sellableTradeIds, totalQuantity } = nft
  const PRICE = prices[nftId] || tokenPerBurn // here we get the price

  let minTradeId:number;
  if(typeof sellableTradeIds === 'object' && _.size(sellableTradeIds) > 0) {
    minTradeId = Math.min( ...sellableTradeIds )
  }

  const firstCharOfAccount = account != null && account.slice(0, 4)
  const lastCharOfAccount = account != null && account.slice(-4)

  const nftIndex = hasClaimed && hasClaimed.indexOf(nftId)

  const MINTS = myMints[nftIndex] || 0


  const MINTED = amounts[nftIndex] ? parseInt(amounts[nftIndex].toString()) : 0
  const MAX_MINT = maxMintByNft[nftIndex] ? parseInt(maxMintByNft[nftIndex].toString()) : maxMintPerNft


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

  // const walletOwnsNft = tokenIds && tokenIds.length > 0
  const walletOwnsNft = MINTS > 0

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

  const newFarmContract = useNFTFarmV2Contract(NftFarm)
  const handleBuy = useCallback(async () => {
    try {

      setState((prevState) => ({ ...prevState, isLoading: true }))
      await newFarmContract.methods
        .buy(minTradeId)
        .send({ from: account })
        .on('sending', () => {
          setIsLoading(true)
        })
        .on('receipt', () => {
          console.log('receipt')
        })
        .on('error', () => {
          setError('Unable to buy NFT')
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
  }, [account, newFarmContract, reInitialize, fetchDetails, minTradeId])


  return (
    <Card isActive={walletOwnsNft}>
      <Image src={`/images/nfts/${previewImage}`} alt={name} originalLink={walletOwnsNft ? originalImage : null} />
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
          <Tag outline variant="failure">
            {totalQuantity} {' for Sale'}
          </Tag>
        </Header>

        <Header>
          <Tag outline variant="primary">
            {sellMinPrice / 10 ** 18}
          </Tag>
        </Header>
        {isInitialized && walletOwnsNft && !isApproved && (
          <Button
            fullWidth
            variant="primary"
            mt="24px"
            onClick={() => {
              handleApprove()
            }}
          >
            Approve
          </Button>
        )}
        {isInitialized && walletOwnsNft && isApproved && (
          <Button fullWidth variant="secondary" mt="24px" onClick={() => {
            handleBuy()
          }}>
            {TranslateString(999, 'Buy')}
          </Button>
        )}
      </CardBody>
    </Card>
  )
}

export default NftCard
