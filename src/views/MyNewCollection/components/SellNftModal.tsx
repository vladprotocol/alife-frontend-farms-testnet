import React, { useState } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Input, Modal, Text } from '@pancakeswap-libs/uikit'
import { NFT, NftFarm } from 'config/constants/newnfts'
import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useNFTFarmV2Contract } from 'hooks/useContract'
import InfoRow from './InfoRow'

interface SellNftModalProps {
  nft: Nft
  tokenIds: number[]
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

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`
const SellNftModal: React.FC<SellNftModalProps> = ({ nft, tokenIds, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    price: 0,
    tokenId: tokenIds[0],
    tradeId: nft.tradeId,
  })
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()

  const NFTFarmV2Contract = useNFTFarmV2Contract(NftFarm)

  const handleConfirm = async () => {
    try {

      if (!values.price) {
        setError(TranslateString(999, 'Please enter a valid price'))
      } else {
        const tradeId = nft.tradeId
        const sellingPrice: any = new BigNumber((values.price * (10 ** 18)))
        await NFTFarmV2Contract.methods
          .sell(tradeId, sellingPrice)
          .send({ from: account })
          .on('sending', () => {
            setIsLoading(true)
          })
          .on('receipt', () => {
            onDismiss()
            onSuccess()
          })
          .on('error', () => {
            console.error(error)
            setError('Unable to sell NFT')
            setIsLoading(false)
          })
      }
    } catch (err) {
      console.error('Unable to sell NFT:', err)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue, name } = evt.target
    setValues({ ...values, [name]: inputValue })
  }

  return (
    <Modal title={TranslateString(999, 'Sell NFT')} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'Selling')}:</Text>
          <Value>{`1x "${nft.name}" NFT`}</Value>
        </InfoRow>
        <Label htmlFor="price">{TranslateString(999, 'Selling Price')}:</Label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder={TranslateString(999, 'Enter Price')}
          value={values.price}
          onChange={handleChange}
          isWarning={error}
          disabled={isLoading}
        />
      </ModalContent>
      <Actions>
        <Button fullWidth variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button fullWidth onClick={handleConfirm} disabled={!account || isLoading || !values.price}>
          {TranslateString(464, 'Confirm')}
        </Button>
      </Actions>
    </Modal>
  )
}

export default SellNftModal
