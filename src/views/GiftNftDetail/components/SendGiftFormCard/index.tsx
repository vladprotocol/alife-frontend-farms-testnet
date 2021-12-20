import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getContract } from 'utils/erc20'
import { provider } from 'web3-core'
import styled from 'styled-components'
import { ethers } from 'ethers'

import ContractAddresses from 'config/constants/contracts'

import { Card, CardBody, Button, CardFooter, Input, useModal } from '@pancakeswap-libs/uikit'
import Tokens from 'config/constants/tokens'
import { GiftProviderContext } from 'views/GiftNftDetail/contexts/GiftProvider'
import { useNftGift, useERC20 } from 'hooks/useContract'

import GiftNftModal from '../GiftNftModal'
import ApproveTokenModal from '../ApproveTokenModal'

import InfoRow from '../InfoRow'

const chainId = process.env.REACT_APP_CHAIN_ID


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
  const { checkAllowance, isApproved, isInitialized, tokenContract } = useContext(GiftProviderContext)
  const giftContract = useNftGift()
  const { name, originalImage, nftId } = nft
  const { account, ethereum } = useWallet()
  const loggedIn = account !== null
  const [tokens, setTokens] = useState(null)
  const [state, setState] = useState({
    isLoading: false,
  })
  const [selectedToken, setSelectedToken] = useState(null)
  const [form, setForm] = useState(null)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [error, setError] = useState(null)
  const getTokens = useCallback(() => {
    setTimeout(() => setTokens(Tokens), 500)
  }, [])

  const onChange = (e) => {
    setForm((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : { [e.target.name]: e.target.value }))
  }

  const setLoading = (val) => setState((prev) => ({ ...prev, isLoading: val }))

  const handleApprove = useCallback(async () => {
    try {
      if (!tokenContract) return
      setLoading(true)
      await tokenContract.methods
        .approve(ContractAddresses.giftNFT[chainId], ethers.constants.MaxUint256)
        .send({ from: account })
      await checkAllowance(selectedToken)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }, [tokenContract, selectedToken, account, checkAllowance])
  const formValidation = useCallback(() => {
    const KEYS = ['reciever', 'tokenAmount', 'giftName', 'message']
    if (!form) return false
    console.log(Object.keys[form])
    const hasAllKeys = KEYS.every((item) => {
      return Object.keys(form).includes(item)
    })
    return hasAllKeys
  }, [form])

  const handleSendGift = useCallback(async () => {
    try {
      if (!selectedToken) return

      const hasAllData = formValidation()
      console.log({ hasAllData })
      if (!hasAllData) {
        setError('All fields should be filled !!!')

        setTimeout(() => setError(null), 1500)
        return
      }
      setLoading(true)
      const tokenAmount = ethers.utils.parseUnits(form.tokenAmount, 'ether')
      const tx = await giftContract.methods
        .mint(form.reciever, selectedToken, tokenAmount, parseInt(nftId), form.giftName, form.message, originalImage)
        .send({ from: account })
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log({ e })
      console.error(e)
    }
  }, [account, selectedToken, form, formValidation, nftId, originalImage, giftContract])

  const [onSendGift] = useModal(
    <GiftNftModal nft={nft} Tokens={Tokens} form={form} selectedToken={selectedToken} onSuccess={handleSendGift} />,
  )
  const [onApproveToken] = useModal(
    <ApproveTokenModal
      token={Tokens.find((item) => item.contractAddress === selectedToken)}
      onSuccess={handleApprove}
    />,
  )

  useEffect(() => {
    async function onTokenChange() {
      setLoading(true)
      await checkAllowance(selectedToken)
      setLoading(false)
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
        {error ? <p>{error}</p> : ''}
        {state && state.isLoading && <p>Loading....</p>}
        {isInitialized && loggedIn && !isApproved && !state.isLoading && (
          <Button onClick={onApproveToken} fullWidth variant="primary" mt="24px">
            Approve Transfer
          </Button>
        )}
        {isInitialized && loggedIn && isApproved && !state.isLoading && (
          <Button fullWidth variant="primary" mt="24px" onClick={onSendGift}>
            Send Gift
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default SendGiftForm
