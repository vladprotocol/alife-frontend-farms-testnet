import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getContract } from 'utils/erc20'
import { provider } from 'web3-core'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useHistory } from 'react-router-dom'

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
const Text = styled.p`
  color: ${(props) => props.theme.colors.textSubtle};
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
  const history = useHistory()
  const { checkAllowance, isApproved, isInitialized, tokenContract, reInitialize, tokenBalance } =
    useContext(GiftProviderContext)
  const giftContract = useNftGift()
  const { name, originalImage, nftId } = nft
  const { account, ethereum } = useWallet()
  // const loggedIn = account !== null
  const [tokens, setTokens] = useState(null)
  const [state, setState] = useState({
    isLoading: false,
  })
  const [selectedToken, setSelectedToken] = useState(null)
  const [form, setForm] = useState(null)
  const [message, setMessage] = useState({
    text: null,
    type: null,
  })
  const getTokens = useCallback(() => {
    setTimeout(() => setTokens(Tokens), 500)
  }, [])

  const onChange = (e) => {
    setForm((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : { [e.target.name]: e.target.value }))
  }

  const setLoading = (val) => setState((prev) => ({ ...prev, isLoading: val }))

  const setNewMessage = useCallback((msg, type) => {
    if (!msg) return setMessage(null)

    setMessage({ text: msg, type })

    return setTimeout(() => {
      setMessage({ text: null, type: null })
    }, 5000)
  }, [])

  const handleApprove = useCallback(async () => {
    try {
      if (!tokenContract) return
      setLoading(true)
      await tokenContract.methods
        .approve(ContractAddresses.giftNFT[chainId], ethers.constants.MaxUint256)
        .send({ from: account })
      await checkAllowance(selectedToken)
      setLoading(false)
      setNewMessage('Successfully approved token', 'success')
    } catch (e) {
      setLoading(false)
      setNewMessage('Couldnot approved token', 'error')
      console.error(e)
    }
  }, [tokenContract, selectedToken, account, checkAllowance, setNewMessage])

  const handleSendGift = useCallback(async () => {
    try {
      if (!selectedToken) return

      setLoading(true)
      const tokenAmount = ethers.utils.parseUnits(form.tokenAmount, 'ether')

      await giftContract.methods
        .mint(form.reciever, selectedToken, tokenAmount, parseInt(nftId), form.giftName, form.message, originalImage)
        .send({ from: account })
      setLoading(false)
      setForm(null)
      setNewMessage('Successfully sent gift', 'success')
    } catch (err) {
      setLoading(false)
      setNewMessage('Couldnot send gift', 'error')
      console.log({ err })
    }
  }, [account, selectedToken, form, nftId, originalImage, giftContract, setNewMessage])

  const [onSendGift] = useModal(
    <GiftNftModal nft={nft} Tokens={Tokens} form={form} selectedToken={selectedToken} onSuccess={handleSendGift} />,
    false,
  )
  const [onApproveToken] = useModal(
    <ApproveTokenModal
      token={Tokens.find((item) => item.contractAddress === selectedToken)}
      onSuccess={handleApprove}
    />,
  )

  const handleTokenChange = (e) => {
    if (e.target.value && e.target.value.length) return setSelectedToken(e.target.value)

    return setSelectedToken(null)
  }

  useEffect(() => {
    async function onTokenChange() {
      reInitialize()
      if (!selectedToken) return
      setLoading(true)
      await checkAllowance(selectedToken)
      setLoading(false)
    }

    onTokenChange()
  }, [selectedToken, ethereum, account, checkAllowance, reInitialize])

  useEffect(() => getTokens(), [getTokens])

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          return onSendGift()
        }}
      >
        <CardBody>
          <InfoRow>
            <Input
              onChange={onChange}
              name="reciever"
              value={form && form.reciever ? form.reciever : ''}
              placeholder="To ETH address"
              required
            />
          </InfoRow>

          <InfoRow>
            <StyledInputWrapper>
              <StyledSelect
                placeholder="Token"
                onChange={(e) => handleTokenChange(e)}
                name="token"
                value={selectedToken}
                required
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
              required
            />
          </InfoRow>

          <InfoRow>
            <Input
              onChange={onChange}
              name="giftName"
              value={form && form.giftName ? form.giftName : ''}
              placeholder="Gift Name"
              required
            />
          </InfoRow>

          <InfoRow>
            <Input
              onChange={onChange}
              name="message"
              value={form && form.message ? form.message : ''}
              placeholder="Message"
              required
            />
          </InfoRow>
        </CardBody>
        <CardFooter>
          {message && message.text && message.type === 'success' && (
            <Text style={{ color: 'greenyellow', marginBottom: '1rem' }}>{message.text}</Text>
          )}

          {message && message.text && message.type === 'error' && (
            <Text style={{ color: 'red', marginBottom: '1rem' }}>{message.text}</Text>
          )}

          {state && state.isLoading && <p>Loading....</p>}
          {tokenBalance && (
            <Text>
              You own {tokenBalance}{' '}
              {selectedToken ? Tokens.find((tkn) => tkn.contractAddress === selectedToken).name : ''}
            </Text>
          )}
          {/* {isInitialized && loggedIn && !isApproved && !state.isLoading && ( */}
          {!state.isLoading && (
            <Button
              onClick={onApproveToken}
              fullWidth
              variant="primary"
              mt="24px"
              disabled={!selectedToken || isApproved}
            >
              Approve Transfer
            </Button>
          )}

          {/* {isInitialized && loggedIn && isApproved && !state.isLoading && ( */}

          {!state.isLoading && (
            <Button
              fullWidth
              variant="primary"
              mt="24px"
              type="submit"
              disabled={!selectedToken || !isApproved || (tokenBalance && form?.tokenAmount > parseInt(tokenBalance))}
            >
              Send Gift
            </Button>
          )}
          {tokenBalance && form?.tokenAmount > parseInt(tokenBalance) && (
            <Text style={{ color: 'red', paddingTop: '1rem' }}>
              You dont own enough{' '}
              {selectedToken ? Tokens.find((tkn) => tkn.contractAddress === selectedToken).name : ''}
              token.
            </Text>
          )}
          {/* )} */}
        </CardFooter>
      </form>
    </Card>
  )
}

export default SendGiftForm
