import React, { useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Modal, Text } from '@pancakeswap-libs/uikit'

import { Nft } from 'config/constants/types'

import useI18n from 'hooks/useI18n'

import InfoRow from './InfoRow'

interface GiftNftProps {
  nft: Nft
  form: any
  selectedToken: string
  Tokens: any
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const GiftNftModal: React.FC<GiftNftProps> = ({ nft, Tokens, selectedToken, form, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [completedTx, setCompleteTx] = useState(false)

  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()

 

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      await onSuccess()
      setError('Successfully gifted NFT')
      setCompleteTx(true)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setError('Unable to gift NFT')
    }
  }

  return (
    <Modal title="Gift NFT" onDismiss={onDismiss} hideCloseButton>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'You will send')}:</Text>
          <Value>{`1x "${nft.name}" NFT`}</Value>
        </InfoRow>
        <InfoRow>
          <Text>This NFT binds:</Text>
          <Value>{`${form && form.tokenAmount ? form.tokenAmount : ''} ${
            selectedToken ? Tokens.find((tkn) => tkn.contractAddress === selectedToken).name : ''
          }`}</Value>
        </InfoRow>
      </ModalContent>
      <Actions>
        {completedTx && (
          <Button fullWidth onClick={onDismiss}>
            Done
          </Button>
        )}
        {!completedTx && (
          <Button fullWidth onClick={handleConfirm} disabled={!account || isLoading}>
            {TranslateString(464, 'Confirm')}
          </Button>
        )}
        {!completedTx && (
          <Button fullWidth onClick={onDismiss} disabled={!account || isLoading}>
            Cancel
          </Button>
        )}
      </Actions>
    </Modal>
  )
}

export default GiftNftModal
