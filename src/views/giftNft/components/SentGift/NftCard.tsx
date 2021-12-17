import React, { useCallback, useContext, useEffect, useState } from 'react'
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
import { getNewNftContract,getNftwithTokenContract } from '../../utils/contracts'


interface GiftNft extends Nft {
  isClaimed: boolean
  tokenname: string
  amount: number
  tokenminted:number
  giftName: string
  giftMessage: string
}
interface NftCardProps {
  nft: GiftNft
}

const Header = styled(InfoRow)`
  min-height: 28px;
  flex-direction: column;
  justify-content: space-evenly;
`
const CustomRow = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
`

const CustomTag = styled(Tag)`
  margin-top: 10px;
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
  const [maxMint, setMaxMint] = useState(0)
  // const[tokenName,setTokenName] = useState("");
  // const[TokenAmount,setamount] = useState("");

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
  const { nftId,name,previewImage, originalImage, description, tokenAmount, tokenSupply,isClaimed,tokenname,amount,tokenminted,giftName,giftMessage} = nft
  const loggedIn = account != null

  const nftIndex = hasClaimed && hasClaimed.indexOf(nftId)

  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

  const MINTS = myMints[nftIndex] || 0

  // not sure about this, you need to check if this oser own this nft in the view nft page.
  // const youAreTheLastOwner = ownerById && ownerById[nftIndex] && ownerById[nftIndex].toString() === account.toString()

  const MINTED = amounts[nftIndex] ? parseInt(amounts[nftIndex].toString()) : 0

  const walletCanClaim = maxMintPerNft === 0 || MINTED === undefined || MINTED < maxMint

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
  return (
    <Card isActive={walletOwnsNft}>
      <Image src={`/images/nfts/${previewImage}`} alt={name} />
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
          <CustomTag>{`${amount} ${tokenname}`}</CustomTag>
          </Header>

          {isInitialized && (
          <Button fullWidth onClick={() => history.push(`/sent-gift-nft-detail/${nftId}`)} mt="24px">
            <ViewNft>
              View NFT 
            </ViewNft>
          </Button>
        )}
      </CardBody>
      <CardFooter p="2">
        <DetailsButton endIcon={<Icon width="24px" color="primary" />} onClick={handleClick}>
          {state.isLoading ? TranslateString(999, 'Loading...') : TranslateString(999, 'Details')}
        </DetailsButton>
        {state.isOpen && (
          <>
          {' '}
          <InfoBlock>
            <Text as="p" color="textSubtle" mb="16px" style={{ textAlign: 'center' }}>
              {description}
            </Text>
          </InfoBlock>
          <CustomRow>
            <Text as="p" color="textSubtle" style={{ textAlign: 'center', minWidth: 'max-content' }}>
              Gift Name :
            </Text>
            <Heading>{giftName}</Heading>
          </CustomRow>
          <CustomRow>
            <Text as="p" color="textSubtle" mb="16px" style={{ textAlign: 'center', minWidth: 'max-content' }}>
              Gift Message :
            </Text>

            <InfoBlock>
              <Text bold mb="16px" style={{ textAlign: 'center' }}>
                {giftMessage}
              </Text>
            </InfoBlock>
          </CustomRow>
        </>)}        
      </CardFooter>
    </Card>
  )
}
export default NftCard
