import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Modal, Text } from '@pancakeswap-libs/uikit'

import BigNumber from 'bignumber.js'

import { Nft } from 'config/constants/types'

import useI18n from 'hooks/useI18n'

import InfoRow from '../InfoRow'

interface ClaimNftModalProps {
  nft: Nft
  onSuccess: () => any
  onDismiss?: () => void
  price?: BigNumber
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

const ClaimNftModal: React.FC<ClaimNftModalProps> = ({ nft, onSuccess, onDismiss, price }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()

  const handleConfirm = async () => {
    try {
      //   await nftMintingContract.methods
      //     .mint(nft.nftId)
      //     .send({ from: account })
      //     .on('sending', () => {
      //       setIsLoading(true)
      //     })
      //     .on('receipt', () => {
      //       onDismiss()
      //       onSuccess()
      //     })
      //     .on('error', () => {
      //       console.error(error)
      //       setError('Unable to claim NFT')
      //       setIsLoading(false)
      //     })
    } catch (err) {
      console.error('Unable to claim NFT:', err)
    }
  }

  return (
    <Modal title={`Claim this NFT`} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'You will receive')}:</Text>
          <Value>{`1x "${nft.name}" NFT`}</Value>
        </InfoRow>
      </ModalContent>
      <Actions>
        <Button fullWidth onClick={handleConfirm} disabled={!account || isLoading}>
          {TranslateString(464, 'Confirm')}
        </Button>
      </Actions>
    </Modal>
  )
}

export default ClaimNftModal
