import React, { useEffect, useCallback, useState, useContext } from 'react'
import styled from 'styled-components'
import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, Link } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, usePriceVladBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'
import NftProvider from './contexts/NftProvider'
import EpicProvider from './contexts/EpicProvider'

export interface FarmsProps {
  tokenMode?: boolean
}

const CustomA = styled.a`
  color: white;
`

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const vladPrice = usePriceVladBusd()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const history = useHistory()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { tokenMode } = farmsProps

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  // const activeFarms = farmsLP.filter(
  //   (farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X' && farm.lpSymbol !== 'BNB-BUSD LP',
  // )
  // const inactiveFarms = farmsLP.filter(
  //   (farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X' && farm.lpSymbol !== 'BNB-BUSD LP',
  // )

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X' && farm.lpSymbol !== 'BNB-BUSD LP')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X' && farm.lpSymbol !== 'BNB-BUSD LP')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.tokenPerBlock || 1)
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear)

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          vladPrice={vladPrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, vladPrice, ethereum],
  )

  return (
    <EpicProvider>
      <NftProvider>
        <Page>
          <Heading as="h1" size="xl" color="primary" mb="50px" style={{ textAlign: 'center' }}>
            ALIFE FARMING HAS STARTED
          </Heading>
          <Heading as="h2" size="sm" color="primary" mb="50px" style={{ textAlign: 'center' }}>
            Only holders of genesis NFTs can stake: MINT yours here &nbsp;
            <Link href="nft" style={{ display: 'unset' }}>
              [link]
            </Link>
            &nbsp;to access these pools
          </Heading>

          <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} />
          <div>
            <Divider />
            <FlexLayout>
              <Route exact path={`${path}`}>
                {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
              </Route>
              <Route exact path={`${path}/history`}>
                {farmsList(inactiveFarms, true)}
              </Route>
            </FlexLayout>
          </div>
          <Image src="/images/alife/8.png" alt="illustration" width={1352} height={587} responsive />
        </Page>
      </NftProvider>
    </EpicProvider>
  )
}

export default Farms
