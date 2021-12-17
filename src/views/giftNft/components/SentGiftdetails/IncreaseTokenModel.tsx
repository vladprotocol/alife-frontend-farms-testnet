import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Modal, Text ,Input} from '@pancakeswap-libs/uikit'

import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useNftGift } from 'hooks/useContract'
import InfoRow from '../InfoRow'

interface GiftNft extends Nft{
    isClaimed:boolean
    tokenId:number
}
interface IncreaseTokenModalProps {
  nft: GiftNft
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
`
const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`
const IncreaseTokenModal:React.FC<IncreaseTokenModalProps> = ({nft,onSuccess,onDismiss})=>{
    const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const giftContract = useNftGift()
    return(
        <Modal title="Claim this NFT " onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'Increasing..')}:</Text>
          <Value>{`${nft.name} NFT`}</Value>
        </InfoRow>
        <Label htmlFor='increaseAmount'>{TranslateString(999,'Increasing Amount')}</Label>
        <Input id="increaseAmount"
        name="Amount"/>
      </ModalContent>
      <Actions>

        <Button
          fullWidth
        //   onClick={handleConfirm}
          disabled={!account || isLoading }
        >
          {TranslateString(464, 'Confirm')}
        </Button>
        <Button 
            fullWidth
            disabled ={!account || isLoading}>
            {TranslateString(464,"Cancel")}
            </Button>
      </Actions>
    </Modal>
    )

}
export default IncreaseTokenModal