import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'

import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Modal, Text ,Input} from '@pancakeswap-libs/uikit'

import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useNftGift } from 'hooks/useContract'
import InfoRow from '../InfoRow'

interface GiftNft extends Nft{
    isClaimed:boolean
    tokenId:number
    tokenname:string
    amount:number
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
  const { account,chainId } = useWallet();
  const giftContract = useNftGift(chainId);
  const [form, setForm] = useState(null)
  
  const handleChange = (e) => {
    setForm((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : { [e.target.name]: e.target.value }))
  }

  const handleConfirm = async()=>{
    try{
      const tokenAmount = ethers.utils.parseUnits(form.amount,"ether")
      await giftContract.methods.increaseAmount(nft.tokenId,tokenAmount).send({from:account}).on('sending',()=>{
        setIsLoading(true)
      }).on('receipt',()=>{
        onDismiss()
        onSuccess()
      }).on("error",()=>{
        console.error(error)
            setError('Unable to increase amount')
            setIsLoading(false)
      })
    }
    catch(err){
      console.error('Unable to increase amount',err)
    }
  }
    return(
        <Modal title="Increase Token in NFT GIFT " onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'GIFT NFT')}:</Text>
          <Value>{`${nft.name} NFT`}</Value>
          
        </InfoRow>
          <InfoRow>
          <Text>{TranslateString(999, 'Current Tokens')}:</Text>
          <Value>{`${nft.amount} ${nft.tokenname}`}</Value>
          </InfoRow>

        <Label htmlFor='increaseAmount'>{TranslateString(999,'Increasing Amount')}</Label>
        <Input id="increaseAmount"
        name="amount"
        type="text"
        onChange={handleChange}
        placeholder={TranslateString(999,"Amount")}
        />
      </ModalContent>
      <Actions>

        <Button
          fullWidth
          disabled={!account || isLoading }
          onClick={handleConfirm}
        >
          {TranslateString(464, 'Confirm')}
        </Button>
        <Button 
            fullWidth
            onClick={onDismiss}>
            Cancel
            </Button>
      </Actions>
    </Modal>
    )

}
export default IncreaseTokenModal