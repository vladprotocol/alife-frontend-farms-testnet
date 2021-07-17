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
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { List } from 'antd'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import { AMOUNT_TO_CLAIM, NftFarm, NFT } from 'config/constants/newnfts'
import { useHistory } from 'react-router-dom'
import { usePancakeRabbits } from 'hooks/useContract'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getNewNftContract } from '../../utils/contracts'
import ClaimNftModal from '../ClaimNftModal'
import BurnNftModal from '../BurnNftModal'
import TransferNftModal from '../TransferNftModal'

interface NftCardProps {
  nft: Nft
}

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

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

const SmallCard = styled(Card)`
  width: 500px;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 320px;
  }
`

const CustomButton = styled(Button)`
  margin-left: 10px;
`

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: true,
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

  const { nftId, name, previewImage, originalImage, description, tokenAmount, fileType, tokenSupply } = nft

  const firstCharOfAccount = account != null && account.slice(0, 4)
  const lastCharOfAccount = account != null && account.slice(-4)

  const accountName = account != null && `${firstCharOfAccount}...${lastCharOfAccount}`

  const loggedIn = account !== null

  // console.log('?hasClaimed', hasClaimed)
  // console.log('?ownerById', ownerById)

  const nftIndex = hasClaimed && hasClaimed.indexOf(nftId)

  const MINTS = myMints[nftIndex] || 0

  // not sure about this, you need to check if this oser own this nft in the view nft page.
  // const youAreTheLastOwner = ownerById && ownerById[nftIndex] && ownerById[nftIndex].toString() === account.toString()

  const MINTED = amounts[nftIndex] ? parseInt(amounts[nftIndex].toString()) : 0

  const walletCanClaim = maxMintPerNft === 0 || MINTED === undefined || MINTED < maxMint

  // console.log('CONTRACT/GALLERY INFO:', totalSupplyDistributed, rarity, priceMultiplier, maxMintPerNft, tokenPerBurn)
  // console.log('LIMITS BY NFT:', tokenPerBurn, amounts, maxMintByNft, prices)
  // console.log(nftId, 'walletCanClaim', walletCanClaim, maxMintPerNft, MINTED, MAX_MINT)

  const tokenIds = getTokenIds(nftId)
  // const isSupplyAvailable = currentDistributedSupply < totalSupplyDistributed

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
  })

  const isSupplyAvailable = minted < maxMint
  // const walletOwnsNft = tokenIds && tokenIds.length > 0
  const walletOwnsNft = MINTS > 0

  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

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

  const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} price={price} onSuccess={handleSuccess} />)
  const [onPresentBurnModal] = useModal(<BurnNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )

  return (
    <SmallCard isActive={walletOwnsNft}>
      {fileType === 'mp4' && (
        <video height="500px" width="100%" loop autoPlay muted>
          <source src={originalImage} type="video/mp4" />
          <track kind="captions" />
        </video>
      )}
      {fileType !== 'mp4' && (
        <Image src={originalImage} alt={name} originalLink={walletOwnsNft ? originalImage : null} />
      )}
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
          {isInitialized && walletCanClaim && (
            <Tag outline variant="success">
              {TranslateString(526, 'Available')}
            </Tag>
          )}
          {isInitialized && !walletCanClaim && (
            <Tag outline variant="failure">
              Sold Out
            </Tag>
          )}
          {isInitialized && loggedIn && walletOwnsNft && (
            <Tag outline variant="secondary">
              {TranslateString(999, 'In Wallet')}
            </Tag>
          )}
        </Header>
        {isInitialized && loggedIn && walletCanClaim && isSupplyAvailable && (
          <Button onClick={onPresentClaimModal} mt="24px">
            {TranslateString(999, 'Claim this NFT')} for {price.toString()} ALIFE
          </Button>
        )}
        {isInitialized && walletCanClaim && isSupplyAvailable && (
          <CustomButton
            onClick={() =>
              window.open(
                'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x42bA7BbDDEcb471c1e1Fe08636918952b6C19019',
                '_blank',
              )
            }
            mt="24px"
          >
            {TranslateString(999, 'Buy ALIFE')}
          </CustomButton>
        )}
        {isInitialized && loggedIn && walletOwnsNft && !isApproved && (
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
        {isInitialized && loggedIn && walletOwnsNft && isApproved && (
          <Button fullWidth variant="secondary" mt="24px" onClick={onPresentTransferModal}>
            {TranslateString(999, 'Transfer')}
          </Button>
        )}
        {/* {isInitialized && canBurnNft && walletOwnsNft && (
          <Button variant="danger" fullWidth onClick={onPresentBurnModal} mt="24px">
            {TranslateString(999, 'Trade in for ALIFE')}
          </Button>
        )} */}
      </CardBody>
      <CardFooter p="2">
        {state.isOpen && (
          <InfoBlock>
            <List
              size="small"
              dataSource={description.split('.')}
              renderItem={(item) => (
                <Text as="p" color="textSubtle" mb="16px" style={{ textAlign: 'left' }}>
                  {item}
                </Text>
              )}
            />
            <InfoRow>
              <Text>{TranslateString(999, 'Number minted')}:</Text>
              <Value>
                {MINTED}/{maxMint}
              </Value>
            </InfoRow>
            <InfoRow>
              <Text>Owned By Me:</Text>
              <Value>{MINTS}</Value>
            </InfoRow>
          </InfoBlock>
        )}
      </CardFooter>
    </SmallCard>
  )
}

export default NftCard
