import React, { useEffect, useCallback, useState, useContext } from 'react'
import styled from 'styled-components'
import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Card, CardBody, Image, Heading, Link, Text, Button } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceLifeBusd, usePriceBnbBusd, usePriceCakeBusd, usePriceVladBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import InfoRow from 'views/Nft/components/InfoRow'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'
import NftProvider from './contexts/NftProvider'
import EpicProvider from './contexts/EpicProvider'

export interface FarmsProps {
  tokenMode?: boolean
}

const CustomCard = styled(Card)`
  margin-bottom: 20px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(110 80 20 / 40%), inset 0 -2px 5px 1px rgb(139 66 8),
    inset 0 -1px 1px 3px rgb(250 227 133);
  background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
  border: 1px solid #a55d07;
  color: red;
  text-shadow: 0 2px 2px #b90d0d;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-size: 100% 100%;
  background-position: center;
`

const CustomText = styled(Text)`
  font-size: 18px;
  font-weight: bolder;
  text-shadow: 1px 2px 2px #b90d0d;
`

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const vladPrice = usePriceVladBusd()
  const lifePrice = usePriceLifeBusd()
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

  const activeFarms = farmsLP.filter(
    (farm) => farm.multiplier !== '0X' && farm.lpSymbol !== 'BNB-BUSD LP' && farm.lpSymbol !== 'BUSD-ALIFE LP',
  )
  const inactiveFarms = farmsLP.filter(
    (farm) => farm.multiplier === '0X' && farm.lpSymbol !== 'BNB-BUSD LP' && farm.lpSymbol !== 'BUSD-ALIFE LP',
  )

  const NFTFarms = localStorage.getItem('activeInactiveIndex') === '0' ? activeFarms : inactiveFarms

  const baseNFTFarms = NFTFarms.filter((farm) => farm.mustHaveNft === 1)
  const rareNFTFarms = NFTFarms.filter((farm) => farm.mustHaveNft === 2)
  const eliteNFTFarms = NFTFarms.filter((farm) => farm.mustHaveNft === 3)

  const getStackedOnlyFarms = (allFarms) => {
    const stakedOnlyFarms = allFarms.filter(
      (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
    )
    return stakedOnlyFarms
  }

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
          apy = apy.times(3)
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
          lifePrice={lifePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, vladPrice, lifePrice, ethereum],
  )

  return (
    <EpicProvider>
      <NftProvider>
        <Page>
          <Heading as="h1" size="xl" color="primary" mb="70px" style={{ textAlign: 'center' }}>
            NEW ALIFE FARMING HAS STARTED
          </Heading>

          <Button
            as="a"
            size="sm"
            href="https://app1.vlad.finance/farms/history"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginBottom: '10px' }}
          >
            Unstake Old Masterchef
          </Button>

          <CustomCard style={{ marginBottom: '20px' }}>
            <CardBody>
              <InfoRow>
                <CustomText>
                  ONLY HOLDERS OF GENESIS NFTs CAN STAKE: MINT YOURS &nbsp;
                  <Link href="nft" style={{ display: 'unset' }}>
                    HERE
                  </Link>
                  &nbsp;TO ACCESS THESE POOLS
                </CustomText>
              </InfoRow>
            </CardBody>
          </CustomCard>

          <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} />

          <div>
            <Divider />
            <FlexLayout>
              <Route exact path={`${path}`}>
                {stakedOnly ? farmsList(getStackedOnlyFarms(activeFarms), false) : farmsList(activeFarms, false)}
              </Route>
              <Route exact path={`${path}/history`}>
                {farmsList(inactiveFarms, true)}
              </Route>
              <Route exact path={`${path}/all`}>
                {stakedOnly ? farmsList(getStackedOnlyFarms(NFTFarms), false) : farmsList(NFTFarms, false)}
              </Route>
              <Route exact path={`${path}/base`}>
                {stakedOnly ? farmsList(getStackedOnlyFarms(baseNFTFarms), false) : farmsList(baseNFTFarms, false)}
              </Route>
              <Route exact path={`${path}/rare`}>
                {stakedOnly ? farmsList(getStackedOnlyFarms(rareNFTFarms), false) : farmsList(rareNFTFarms, false)}
              </Route>
              <Route exact path={`${path}/elite`}>
                {stakedOnly ? farmsList(getStackedOnlyFarms(eliteNFTFarms), false) : farmsList(eliteNFTFarms, false)}
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
