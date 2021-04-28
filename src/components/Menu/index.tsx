import React, { useContext } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu, Button } from '@pancakeswap-libs/uikit'
import config from './config'
import './style.css'
import bscscanLogo from './bscscan.png'
import pancakeLogo from './pancake.png'
import telegramLogo from './telegram.svg'
import twitterLogo from './twitter.svg'
import mediumLogo from './medium.svg'
import vladLogo from './vlad-circle.png'
import alifeLogo from './alife.png'
import lifeLogo from './life.png'
import bgFooter from './bg-footer.jpg'
import soundCloudLogo from './soundcloud.png'

const Footer = styled.div`
  height: 400px;
  background: #171717;
  width: 100%;
  text-align: center;
  padding: 20px;
  background: url(${bgFooter}) no-repeat;
  background-size: cover;
  background-position: 100% 0;
`

const Social = styled.div`
  display: inline-block;
`

const SocialHeader = styled(Social)`
  float: right;
  padding: 10px;
`

const SocialFooter = styled(Social)`
  width: 100%;
  text-align: center;
  padding: 30px;

  @media (max-width: 678px) {
    padding: 0px;
  }
`

const Container = styled.div`
  margin-top: 45px;
`

const SocialImageHeader = styled.img`
  margin-right: 10px;
  width: 23px;
`

const SocialImageFooter = styled.img`
  width: 40px;
  margin: 10px;
  @media (max-width: 678px) {
    width: 32px;
  }
`

const Logo = styled.img`
  width: 70px;
  margin: 20px;
`

const LiveLinkGroup = styled.div`
  margin: 20px;

  @media (max-width: 678px) {
    margin: 20px 0;
    font-size: 12px;
  }
`

const LiveLink = styled.a`
  color: white;
  margin: 10px;
  display: inline-block;
`

const SocialLink = styled.a`
  color: 'white';
`

const FooterCopyRight = styled.div`
  color: white;
`

const InlineDiv = styled.div`
  display: inline;
`

const AudioPlayer = styled.audio`
  margin-right: 10px;
  @media (max-width: 1300px) {
    width: 100px;
  }
`

const AudioDescription = styled.span`
  font-size: 11px !important;
`

const AudioDescriptionA = styled.a`
  font-size: 11px !important;
`

const CustomButton = styled(Button)`
  height: 22px;
  margin-left: 10px;
`

const CustomI = styled.i`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`

let vladValue = 0

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()

  fetch('https://api.coingecko.com/api/v3/simple/price?ids=vlad-finance&vs_currencies=usd')
    .then((res) => res.json())
    .then(
      (result) => {
        vladValue = Math.round(result['vlad-finance'].usd * 100) / 100
      },
      (error) => {
        vladValue = 0
      },
    )

  return (
    <div className="body-bg">
      <section className="topsmnav-bg mb-4">
        <div className="container">
          <nav className="tp-sm-wrap">
            <div className="row">
              <div className="tp-vlad">
                <ul>
                  <li>
                    <a href="https://vlad.finance" target="_blank" rel="noreferrer">
                      Vlad.Finance
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tp-audio">
                <div className="tp-inner">
                  <ul>
                    <li>
                      <AudioDescription>
                        Listen to DJ Ezra - Live From $VLADHalla
                        <AudioPlayer controls>
                          <source src="./dj-erza.mp3" type="audio/mpeg" />
                          <track kind="captions" />
                        </AudioPlayer>
                        <AudioDescriptionA href="https://soundcloud.app.goo.gl/kHiyk" target="_blank" rel="noreferrer">
                          Enjoying $ALIFE! by DJ Ezra Is Back! on #SoundCloud
                        </AudioDescriptionA>
                      </AudioDescription>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="top-sm-nav">
                <ul>
                  <SocialHeaderLink link="https://t.me/VladFinanceOfficial" src={telegramLogo} alt="Telegram" />
                  <SocialHeaderLink link="https://vlad-finance.medium.com" src={mediumLogo} alt="Medium" />
                  <SocialHeaderLink link="https://twitter.com/VladFinance" src={twitterLogo} alt="Twitter" />
                  <SocialHeaderLink
                    link="https://bscscan.com/token/0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
                    src={vladLogo}
                    alt="Vlad Token"
                  />
                  <SocialHeaderLink
                    link="https://bscscan.com/token/0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
                    src={lifeLogo}
                    alt="Life Token"
                  />
                  <SocialHeaderLink
                    link="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
                    src={pancakeLogo}
                    alt="Buy Vlad"
                  />
                  <SocialHeaderLink
                    link="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
                    src={pancakeLogo}
                    alt="Buy Life"
                  />
                  <CustomButton variant="primary">
                    <CustomI>
                      <img src={vladLogo} className="img-fluid" alt="Vlad Token" />
                    </CustomI>
                    $ {vladValue}
                  </CustomButton>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </section>
      <Container>
        <UikitMenu
          account={account}
          login={connect}
          logout={reset}
          isDark={isDark}
          currentLang={selectedLanguage && selectedLanguage.code}
          langs={allLanguages}
          setLang={setSelectedLanguage}
          cakePriceUsd={cakePriceUsd.toNumber()}
          links={config}
          priceLink="https://bscscan.com/token/0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
          {...props}
        />
      </Container>
      <Footer>
        <SocialFooter>
          <SocialFooterLink link="https://t.me/VladFinanceOfficial" src={telegramLogo} alt="Telegram" />
          <SocialFooterLink link="https://vlad-finance.medium.com" src={mediumLogo} alt="Medium" />
          <SocialFooterLink link="https://twitter.com/VladFinance" src={twitterLogo} alt="Twitter" />
          <SocialFooterLink
            link="https://bscscan.com/token/0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
            src={vladLogo}
            alt="Vlad Token"
          />
          <SocialFooterLink
            link="https://bscscan.com/token/0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
            src={lifeLogo}
            alt="Life Token"
          />
          <SocialFooterLink
            link="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
            src={pancakeLogo}
            alt="Buy Vlad"
          />
          <SocialFooterLink
            link="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
            src={pancakeLogo}
            alt="Buy Life"
          />
        </SocialFooter>
        <Logo src={vladLogo} alt="vlad.finance" />
        <LiveLinkGroup>
          <RankingLink link="https://www.coingecko.com/en/coins/vlad-finance" name="CoinGecko" />
          <RankingLink
            link="https://goswappcharts.web.app/?isbsc=true&tokenId=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
            name="GoSwapp"
          />
          <RankingLink link="https://nomics.com/assets/vlad-vlad-finance" name="Nomics" />
          <RankingLink link="https://www.livecoinwatch.com/price/VladFinance-VLAD" name="LiveCoinWatch" />
          <RankingLink link="https://coinmarketcap.com/currencies/vlad-finance" name="CoinMarketCap" />
        </LiveLinkGroup>
        <FooterCopyRight>© Vlad Finance. All Rights Reserved</FooterCopyRight>
      </Footer>
    </div>
  )
}

export default Menu

const RankingLink = (value) => {
  const link = value.link
  const name = value.name
  return (
    <LiveLink target="_blank" href={link}>
      {name}
    </LiveLink>
  )
}

const SocialFooterLink = (value) => {
  const link = value.link
  const src = value.src
  const alt = value.alt
  return (
    <SocialLink target="_blank" title={alt} href={link}>
      <SocialImageFooter src={src} alt={alt} />
    </SocialLink>
  )
}

const SocialHeaderLink = (value) => {
  const link = value.link
  const src = value.src
  const alt = value.alt
  return (
    <li>
      <a href={link} title={alt} target="_blank" rel="noreferrer">
        <div>
          <img src={src} className="img-fluid" alt={alt} />
        </div>
      </a>
    </li>
  )
}
