import React from 'react'
import { Card, CardBody, Heading, Text, Button } from '@pancakeswap-libs/uikit'
import { Link } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import CardContent from './CardContent'
import InfoRow from './InfoRow'

const NftInWalletCard = ({ balanceOf }) => {
  const TranslateString = useI18n()

  return (
    <Card>
      <CardBody>
        <CardContent imgSrc="/images/present.svg">
          <Heading mb="8px">{TranslateString(999, 'NFT in wallet')}</Heading>
          <InfoRow>
            <Text>{TranslateString(999, 'Total Owned by Me: ')}</Text>
            <Text>
              <strong>{balanceOf}</strong>
            </Text>
            <Button variant="secondary">
              <Link to="/my-collection">View My NFTs</Link>
            </Button>
          </InfoRow>
        </CardContent>
      </CardBody>
    </Card>
  )
}

export default NftInWalletCard
