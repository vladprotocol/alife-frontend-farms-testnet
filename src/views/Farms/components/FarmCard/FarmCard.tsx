import React, { useMemo, useState, useContext } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import { NftProviderContext } from '../../contexts/NftProvider'
import { EpicProviderContext } from '../../contexts/EpicProvider'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  vladPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, bnbPrice, vladPrice, ethereum, account }) => {
  const TranslateString = useI18n()

    const { myMints, hasClaimed } = useContext(NftProviderContext)
    const { myEpicMints, epicHasClaimed } = useContext(EpicProviderContext)
    let mustHaveNft = 0

  if(farm.mustHaveNft === 1) {
    const nftIndex1 = hasClaimed && hasClaimed.indexOf(0)
    const nftIndex2 = hasClaimed && hasClaimed.indexOf(1)
    const nftIndex3 = hasClaimed && hasClaimed.indexOf(2)

    const MINTS1 = myMints[nftIndex1] || 0
    const MINTS2 = myMints[nftIndex2] || 0
    const MINTS3 = myMints[nftIndex3] || 0
    
    mustHaveNft = MINTS1 || MINTS2 || MINTS3
  } else if(farm.mustHaveNft === 2) {
    const nftIndex4 = hasClaimed && hasClaimed.indexOf(3)
    const nftIndex5 = hasClaimed && hasClaimed.indexOf(4)
    const nftIndex6 = hasClaimed && hasClaimed.indexOf(5)

    const MINTS4 = myMints[nftIndex4] || 0
    const MINTS5 = myMints[nftIndex5] || 0
    const MINTS6 = myMints[nftIndex6] || 0
    
    mustHaveNft = MINTS4 || MINTS5 || MINTS6
  } else if(farm.mustHaveNft === 3) {
    const nftIndex7 = epicHasClaimed && epicHasClaimed.indexOf(0)
    const nftIndex8 = epicHasClaimed && epicHasClaimed.indexOf(1)
    const nftIndex9 = epicHasClaimed && epicHasClaimed.indexOf(2)
    const nftIndex10 = epicHasClaimed && epicHasClaimed.indexOf(3)
    const nftIndex11 = epicHasClaimed && epicHasClaimed.indexOf(4)
    const nftIndex12 = epicHasClaimed && epicHasClaimed.indexOf(5)

    const MINTS7 = myEpicMints[nftIndex7] || 0
    const MINTS8 = myEpicMints[nftIndex8] || 0
    const MINTS9 = myEpicMints[nftIndex9] || 0
    const MINTS10 = myEpicMints[nftIndex10] || 0
    const MINTS11 = myEpicMints[nftIndex11] || 0
    const MINTS12 = myEpicMints[nftIndex12] || 0
    
    mustHaveNft = MINTS7 || MINTS8 || MINTS9 || MINTS10 || MINTS11 || MINTS12
  } else if (farm.mustHaveNft === 0) {
    mustHaveNft = 1
  }

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmImage = farm.isTokenOnly
    ? farm.tokenSymbol.toLowerCase()
    : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.VLAD) {
      return vladPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [vladPrice, bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'

  const lpLabel = farm.lpSymbol
  const earnLabel = 'ALIFE'
  const farmAPY =
    farm.apy &&
    farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm

  return (
    <FCard>
      {farm.tokenSymbol === 'ALIFE' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        risk={risk}
        depositFee={farm.depositFeeBP}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{TranslateString(352, 'APR')}:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apy ? (
              <>
                <ApyButton
                  lpLabel={lpLabel}
                  quoteTokenAdresses={quoteTokenAdresses}
                  quoteTokenSymbol={quoteTokenSymbol}
                  tokenAddresses={tokenAddresses}
                  cakePrice={cakePrice}
                  apy={farm.apy}
                />
                {farmAPY}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text>{TranslateString(318, 'Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text>{TranslateString(10001, 'Deposit Fee')}:</Text>
        <Text>{farm.depositFeeBP ? farm.depositFeeBP / 100 : '0'}%</Text>
      </Flex>

      {mustHaveNft > 0 && (
        <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />
      )}
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          isTokenOnly={farm.isTokenOnly}
          bscScanAddress={
            farm.isTokenOnly
              ? `https://bscscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              : `https://bscscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAdresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
