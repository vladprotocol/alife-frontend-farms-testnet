import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Modal, Text, Input } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { NftFarm, AMOUNT_TO_CLAIM } from 'config/constants/newnfts'
import { getLifeAddress } from 'utils/addressHelpers'
import { Nft } from 'config/constants/types'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useERC20, useNFTFarmV2Contract } from 'hooks/useContract'
import InfoRow from './InfoRow'
import { useNftAllowance } from '../../../hooks/useAllowance'
import { useNftApprove } from '../../../hooks/useApprove'
import NftCard from './NftCard'

interface ClaimNftModalProps {
  nft: Nft
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
  min-width: 20rem;
`

const ModalGrid = styled.div`
  display: flex;
  width: 100%;
`
const Section = styled.div`
  width: 50%;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`
const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`

const ClaimNftModal: React.FC<ClaimNftModalProps> = ({ nft, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const nftMintingContract = useNFTFarmV2Contract(NftFarm)
  const contraToken = useERC20(getLifeAddress())
  const allowance = useNftAllowance(contraToken, NftFarm, pendingTx)
  const onApprove = useNftApprove(contraToken, NftFarm)
  const cakeBalance = useTokenBalance(getLifeAddress())
  const cakeInWallet = getBalanceNumber(cakeBalance)

  // console.log('getLifeAddress', getLifeAddress(), NftFarm, allowance)
  // console.log('allowance', allowance)

  const handleConfirm = async () => {
    if (allowance === null) {
      return
    }

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
      //       setError('Unable to gift NFT')
      //       setIsLoading(false)
      //     })
    } catch (err) {
      console.error('Unable to gift NFT:', err)
    }
  }

  useEffect(() => {
    if (cakeInWallet === 0) {
      setError(`You must have ALIFE balance to gift NFT`)
    }
  }, [cakeInWallet, setError])

  return (
    <Modal title="Gift NFT" onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}

        <ModalGrid>
          <Section>NftCard</Section>
          <Section>
            <InfoRow>
              <Label htmlFor="transferAddress">{TranslateString(999, 'Receiving address')}:</Label>

              <Input
                id="transferAddress"
                name="address"
                type="text"
                placeholder={TranslateString(999, 'Paste address')}
                isWarning={error}
                disabled={isLoading}
              />
            </InfoRow>
          </Section>
        </ModalGrid>
      </ModalContent>
      <Actions>
        <Button
          fullWidth
          disabled={!account || pendingTx || isLoading || allowance > 0}
          onClick={async () => {
            try {
              setPendingTx(true)
              await onApprove()
              setPendingTx(false)
            } catch (e) {
              setPendingTx(false)
              console.error(e)
            }
          }}
        >
          Approve
        </Button>

        <Button
          fullWidth
          onClick={handleConfirm}
          disabled={!account || isLoading || cakeInWallet <= 0 || allowance <= 0}
        >
          {TranslateString(464, 'Confirm')}
        </Button>
      </Actions>
    </Modal>
  )
}

export default ClaimNftModal
