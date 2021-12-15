import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getContract } from 'utils/erc20'
import { provider } from 'web3-core'
import styled from 'styled-components'
import { Card, CardBody, Button, CardFooter, Input } from '@pancakeswap-libs/uikit'
import Tokens from 'config/constants/tokens'
import { GiftProviderContext } from 'views/GiftNftDetail/contexts/GiftProvider'

import InfoRow from '../InfoRow'

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.input};
  border-radius: ${(props) => props.theme.radii.default};
  display: flex;
  height: 48px;
  width: 100%;
  padding: 10px;
`

const StyledSelect = styled.select`
  width: 100%;
  background: ${(props) => props.theme.colors.input};
  border: 0;
  color: white !important;
  font-size: 18px;
  flex: 1;
  margin: 0;
  padding: 0;
  outline: none;
`
const StyledSelectOptions = styled.option`
  width: 100%;
  background: none;
  border: 0;
  color: white !important;
  font-size: 18px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
  outline: none;
`
function SendGiftForm({ nft }) {
  const { checkAllowance } = useContext(GiftProviderContext)
  const { account, ethereum } = useWallet()
  const [tokens, setTokens] = useState(null)
  const [selectedToken, setSelectedToken] = useState(null)
  const [form, setForm] = useState(null)

  const getTokens = useCallback(() => {
    console.log('get tokens called')
    setTimeout(() => setTokens(Tokens), 500)
  }, [])

  const onChange = (e) => {
    setForm((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : { [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    async function onTokenChange() {
      await checkAllowance(selectedToken)
    }

    onTokenChange()
  }, [selectedToken, ethereum, account, checkAllowance])

  useEffect(() => getTokens(), [getTokens])

  return (
    <Card>
      <CardBody>
        <InfoRow>
          <Input
            onChange={onChange}
            name="reciever"
            value={form && form.reciever ? form.reciever : ''}
            placeholder="To ETH address"
          />
        </InfoRow>

        <InfoRow>
          <StyledInputWrapper>
            <StyledSelect
              placeholder="Token"
              onChange={(e) => setSelectedToken(e.target.value)}
              name="token"
              value={selectedToken}
            >
              <StyledSelectOptions value="">None</StyledSelectOptions>

              {tokens && tokens.length > 0
                ? tokens.map((tkn, index) => (
                    <StyledSelectOptions
                      value={tkn.contractAddress}
                      key={tkn.contractAddress}
                    >{`${tkn.name} (${tkn.symbol})`}</StyledSelectOptions>
                  ))
                : null}
            </StyledSelect>
          </StyledInputWrapper>
        </InfoRow>

        <InfoRow>
          <Input
            type="number"
            onChange={onChange}
            name="tokenAmount"
            value={form && form.tokenAmount ? form.tokenAmount : ''}
            placeholder="Gift Amount - (0 is possible)"
          />
        </InfoRow>

        <InfoRow>
          <Input
            onChange={onChange}
            name="giftName"
            value={form && form.giftName ? form.giftName : ''}
            placeholder="Gift Name"
          />
        </InfoRow>

        <InfoRow>
          <Input
            onChange={onChange}
            name="message"
            value={form && form.message ? form.message : ''}
            placeholder="Message"
          />
        </InfoRow>
      </CardBody>
      <CardFooter>
        <Button fullWidth variant="primary" mt="24px">
          Approve Transfer
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SendGiftForm
