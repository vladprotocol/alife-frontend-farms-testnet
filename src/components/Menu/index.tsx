import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import chains from 'config/constants/chains'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu, Button, Text, Toggle } from '@pancakeswap-libs/uikit'
import config from './config'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import './style.css'
// import './innerpage.css'
import './main.css'
// import './nftfactstyle.css'
// import './owl.css'
import bscscanLogo from './bscan.png'
import pancakeLogo from './pancake1.png'
import telegramLogo from './telegram.svg'
import twitterLogo from './twitter.svg'
import mediumLogo from './medium.svg'
import vladLogo from './vlad-circle.png'
import lifeLogo from './life.png'
import alifeLogo from './alife.png'
import bgFooter from './bg-footer.jpg'
import binanceLogo from './binance-logo.png'
import fantomLogo from './fantom-logo.png'
import soundCloudLogo from './soundcloud.png'

declare const window: any

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
  margin-top: 85px;

  @media (max-width: 667px) {
    margin-top: 167px;
  }

  @media (max-width: 348px) {
    margin-top: 203px!important;
  }

  @media (max-width: 321px) {
    margin-top: 219px!important;
  }
}
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
  font-size: 12px;
  padding: 10px !important;
`

const CustomI = styled.i`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`
const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;

  @media (max-width: 767px) {
    margin-right: 0px;
  }

  ${Text} {
    margin-left: 8px;
  }
`
const NetworkToggle = styled(Button)`
  height: 22px;
  background: #171717;
  margin-right: 10px;
  margin-left: 10px;
  padding: 10px;
`

let vladValue = '0.00'
let lifeValue = '0.00'

fetch(
  'https://api.vlad.finance/price.php?key=6547643&pool=0x60d5e86c0074b56e52a7540b3bf36c399e9f3038&token=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973&decimals=8',
)
  .then((res) => res.json())
  .then(
    (result) => {
      if (result.status === true) {
        vladValue = result.data
      } else {
        vladValue = '0.00'
      }
    },
    (error) => {
      vladValue = '0.00'
    },
  )
  .catch(() => {
    vladValue = '0.00'
  })

fetch(
  'https://api.vlad.finance/price.php?key=6547643&pool=0x5ee167b75118125e7d46add5ce61f749bb977a00&token=0x50f4220c82c9325dc99f729c3328fb5c338beaae&decimals=18',
)
  .then((res) => res.json())
  .then(
    (result) => {
      if (result.status === true) {
        lifeValue = result.data
      } else {
        lifeValue = '0.00'
      }
    },
    (error) => {
      lifeValue = '0.00'
    },
  )
  .catch(() => {
    lifeValue = '0.00'
  })

const Menu = (props) => {
  const { account, connect, reset, chainId } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()

  const [filteredConfig, setFilteredConfig] = useState([])
  const [networkName,setNetworkName] = useState('unknown');
  const [networklogo,setNetworkLogo] = useState(vladLogo);
  const binanceid = process.env.REACT_APP_BINANCE_CHAIN_ID;
  const fantomid = process.env.REACT_APP_FANTOM_CHAIN_ID;


  const getNetworkConnectParams = () => ({
    97: [
      {
        chainId: '0x61',
        chainName: 'Binance Smart Chain Testnet',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'bnb',
          decimals: 18,
        },
        rpcUrls: [
          'https://data-seed-prebsc-1-s1.binance.org:8545/',
          'https://data-seed-prebsc-1-s3.binance.org:8545/',
          'https://data-seed-prebsc-1-s2.binance.org:8545/',
        ],
        blockExplorerUrls: ['https://testnet.bscscan.com'],
      },
    ],
    4002: [
      {
        chainId: '0xfa2',
        chainName: 'Fantom TestNet',
        nativeCurrency: {
          name: 'Fantom Token',
          symbol: 'FTM',
          decimals: 18,
        },
        rpcUrls: ['https://rpc.testnet.fantom.network/'],
        blockExplorerUrls: ['https://testnet.ftmscan.com/'],
      },
    ],

    56: [
      {
        chainId: '0x38',
        chainName: 'Binance SmartChain Mainnet',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'bnb',
          decimals: 18,
        },
        rpcUrls: [
          'https://bsc-dataseed1.ninicoin.io',
          'https://bsc-dataseed1.defibit.io',
          'https://bsc-dataseed.binance.org',
        ],
        blockExplorerUrls: ['https://bscscan.com'],
      },
    ],
    250: [
      {
        chainId: '0xfa',
        chainName: 'Fantom Opera',
        nativeCurrency: {
          name: 'Fantom Token',
          symbol: 'FTM',
          decimals: 18,
        },
        rpcUrls: ['https://rpc.ftm.tools/'],
        blockExplorerUrls: ['https://ftmscan.com/'],
      },
    ],
  })

  const handleChangeNetwork = async (network) => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: getNetworkConnectParams()[network],
    })
  }

  useEffect(() => {
    if (!chainId) return

    const newFilteredConfigs = config.filter(
      (navigationItem) =>
        navigationItem.supportedChain &&
        navigationItem.supportedChain.length &&
        navigationItem.supportedChain.includes(chainId),
    )
    setFilteredConfig([...newFilteredConfigs])
    if (chains[chainId]) {
      setNetworkName(chains[chainId])
      if (chainId === 97 || chainId === 56) setNetworkLogo(binanceLogo)
      if (chainId === 4002 || chainId === 250) setNetworkLogo(fantomLogo)
    }
  }, [chainId])

  return (
    <div className="body-bg">
      <section className="topsmnav-bg mb-4">
        <div className="container-wrap1">
          <div className="tp-sm-wrap">
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
                <span>DJ Ezra - Live in the Afterlife</span>
                <audio controls>
                  <source src="/DJ-Ezra-live-in-the-afterlife.mp3" type="audio/mpeg" />
                  <track kind="captions" />
                </audio>
                <a href="https://soundcloud.com/dj_ezra_is_back" target="_blank" rel="noreferrer">
                  DJ Ezra on #SoundCloud
                </a>
              </div>
            </div>
            <div className="top-sm-nav">
              <ul>
                <li>
                  <a href="https://t.me/VladFinanceOfficial" target="_blank" rel="noreferrer">
                    <div>
                      <img src={telegramLogo} className="img-fluid" alt="telegram" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://vlad-finance.medium.com" target="_blank" rel="noreferrer">
                    <div>
                      <img src={mediumLogo} className="img-fluid" alt="medium" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/VladFinance" target="_blank" rel="noreferrer">
                    <div>
                      <img src={twitterLogo} className="img-fluid" alt="twitter" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="clear-fix" />
          </div>
          <div className="tp-btns">
            <ul>
              <li style={{ float: 'left' }}>
                <div className="btn-wrap">
                  <span className="btn-first">
                    <img src={networklogo} className="" alt="" />
                    {networkName}
                  </span>
                </div>
              </li>

              <li style={{ float: 'left' }}>
                <span className="btn-first">
                  <NetworkToggle onClick={() => handleChangeNetwork(binanceid)}>
                    <img src={binanceLogo} className="" alt="" />
                  </NetworkToggle>
                  <NetworkToggle onClick={() => handleChangeNetwork(fantomid)}>
                    <img src={fantomLogo} className="" alt="" />
                  </NetworkToggle>
                </span>
              </li>
              <li>
                <div className="btn-wrap">
                  <span className="btn-first">
                    <img src={vladLogo} className="" alt="" />${vladValue}
                  </span>
                  <span className="btn-second">
                    <a
                      href="https://bscscan.com/token/0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={bscscanLogo} alt="" />
                    </a>
                    <a
                      href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={pancakeLogo} alt="" />
                    </a>
                  </span>
                </div>
              </li>
              <li>
                <div className="btn-wrap">
                  <span className="btn-first">
                    <img src={lifeLogo} className="" alt="" />${lifeValue}
                  </span>
                  <span className="btn-second">
                    <a
                      href="https://bscscan.com/token/0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={bscscanLogo} alt="" />
                    </a>
                    <a
                      href="https://v1exchange.pancakeswap.finance/#/swap?outputCurrency=0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={pancakeLogo} alt="" />
                    </a>
                  </span>
                </div>
              </li>
              <li>
                <div className="btn-wrap">
                  <span className="btn-first">
                    <img src={alifeLogo} className="" alt="" />${cakePriceUsd.toNumber().toFixed(2)}
                  </span>
                  <span className="btn-second">
                    <a
                      href="https://bscscan.com/token/0x42ba7bbddecb471c1e1fe08636918952b6c19019"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={bscscanLogo} alt="" />
                    </a>
                    <a
                      href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x42ba7bbddecb471c1e1fe08636918952b6c19019"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={pancakeLogo} alt="" />
                    </a>
                  </span>
                </div>
              </li>
            </ul>
          </div>
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
          links={filteredConfig}
          priceLink="https://bscscan.com/token/0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
          {...props}
        />
      </Container>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-3 footer-logoblock">
              <ul className="footer-logo">
                <li>
                  <a href="https://vlad.finance" target="_blank" rel="noreferrer">
                    <img src={vladLogo} className="img-fluid" alt="Vlad Finance" />
                  </a>
                </li>
              </ul>
              <h4 style={{ color: 'white' }}>Vlad.Finance</h4>
              <p>
                Come for the Immortality. <br /> Stay for the NFTs.
              </p>
              <ul className="footermenu">
                <li>
                  <a href="https://vlad.finance/token-facts" target="_blank" rel="noreferrer">
                    TOKEN FACTS
                  </a>
                </li>
                <li>
                  <a href="https://vlad.finance/nft" target="_blank" rel="noreferrer">
                    NFTs
                  </a>
                </li>
                <li>
                  <a href="https://vlad.finance/team" target="_blank" rel="noreferrer">
                    TEAM
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-9 footer-sm">
              <div className="row">
                <div className="col-sm-12 col-md-3">
                  <h6 style={{ color: 'white' }}>COMMUNITY</h6>
                  <ul>
                    <li>
                      <a href="https://t.me/VladFinanceOfficial" target="_blank" rel="noreferrer">
                        <img src={telegramLogo} className="img-fluid" alt="" />
                        <span>Telegram</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://vlad-finance.medium.com/" target="_blank" rel="noreferrer">
                        <img src={mediumLogo} className="img-fluid" alt="" />
                        Medium
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/VladFinance" target="_blank" rel="noreferrer">
                        <img src={twitterLogo} className="img-fluid" alt="" />
                        Twitter
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-12 col-md-3">
                  <h6 style={{ color: 'white' }}>$VLAD</h6>
                  <ul>
                    <li>
                      <a
                        href="https://bscscan.com/token/0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fbscscanlogo.svg" className="img-fluid" alt="" />
                        BSCScan
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fpancakeswap.svg" className="img-fluid" alt="" />
                        Buy $VLAD
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://dex.guru/token/0x279d41f3f78fe5c1f0ba41ae963d6e545113c973-bsc"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/dexguru.png" className="img-fluid" alt="" />
                        DexGuru
                      </a>
                    </li>
                    <li>
                      <a href="https://www.coingecko.com/en/coins/vlad-finance" target="_blank" rel="noreferrer">
                        <img src="../images/fcoingecko.svg" className="img-fluid" alt="" />
                        CoinGecko
                      </a>
                    </li>
                    <li>
                      <a href="https://coinmarketcap.com/currencies/vlad-finance/" target="_blank" rel="noreferrer">
                        <img src="../images/fcoinmarketcap.svg" className="img-fluid" alt="" />
                        CoinMarketCap
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://goswappcharts.web.app/?isbsc=true&tokenId=0x279d41f3f78fe5c1f0ba41ae963d6e545113c973"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fgoswapp.svg" className="img-fluid" alt="" />
                        GoSwapp
                      </a>
                    </li>
                    <li>
                      <a href="https://nomics.com/assets/vlad-vlad-finance" target="_blank" rel="noreferrer">
                        <img src="../images/fnomics.svg" className="img-fluid" alt="" />
                        Nomics
                      </a>
                    </li>
                    <li>
                      <a href="https://www.livecoinwatch.com/price/VladFinance-VLAD" target="_blank" rel="noreferrer">
                        <img src="../images/fLiveCoinWatch.svg" className="img-fluid" alt="" />
                        LiveCoinWatch
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-12 col-md-3">
                  <h6 style={{ color: 'white' }}>$LIFE</h6>
                  <ul>
                    <li>
                      <a
                        href="https://bscscan.com/token/0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fbscscanlogo.svg" className="img-fluid" alt="" />
                        BSCScan
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fpancakeswap.svg" className="img-fluid" alt="" />
                        Buy $LIFE
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://dex.guru/token/0x50f4220c82c9325dc99f729c3328fb5c338beaae-bsc"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/dexguru.png" className="img-fluid" alt="" />
                        DexGuru
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://goswappcharts.web.app/?isbsc=true&tokenId=0x50f4220C82c9325dC99f729C3328FB5c338BEaae"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fgoswapp.svg" className="img-fluid" alt="goswapp" />
                        GoSwapp
                      </a>
                    </li>
                    <li className="fdeactive">
                      <img src="../images/fcoinmarketcap.svg" className="img-fluid" alt="" />
                      CoinMarketCap
                    </li>
                    <li className="fdeactive">
                      <img src="../images/fcoingecko.svg" className="img-fluid" alt="" />
                      CoinGecko
                    </li>
                    <li className="fdeactive">
                      <img src="../images/fnomics.svg" className="img-fluid" alt="" />
                      Nomics
                    </li>
                    <li className="fdeactive">
                      <img src="../images/fLiveCoinWatch.svg" className="img-fluid" alt="" />
                      LiveCoinWatch
                    </li>
                  </ul>
                </div>
                <div className="col-sm-12 col-md-3">
                  <h6 style={{ color: 'white' }}>$aLIFE</h6>
                  <ul>
                    <li>
                      <a
                        href="https://bscscan.com/token/0x42bA7BbDDEcb471c1e1Fe08636918952b6C19019"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fbscscanlogo.svg" className="img-fluid" alt="" />
                        BSCScan
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x42bA7BbDDEcb471c1e1Fe08636918952b6C19019"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fpancakeswap.svg" className="img-fluid" alt="" />
                        Buy $ALIFE
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://dex.guru/token/0x42ba7bbddecb471c1e1fe08636918952b6c19019-bsc"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/dexguru.png" className="img-fluid" alt="" />
                        DexGuru
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://goswappcharts.web.app/?isbsc=true&tokenId=0x42ba7bbddecb471c1e1fe08636918952b6c19019"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="../images/fgoswapp.svg" className="img-fluid" alt="GoSwapp" />
                        GoSwapp
                      </a>
                    </li>
                    <li className="fdeactive">
                      <img src="../images/fcoinmarketcap.svg" className="img-fluid" alt="" />
                      CoinMarketCap
                    </li>
                    <li className="fdeactive">
                      <img src="../images/fcoingecko.svg" className="img-fluid" alt="" />
                      CoinGecko
                    </li>
                    <li className="fdeactive">
                      <img src="../images/fnomics.svg" className="img-fluid" alt="" />
                      Nomics
                    </li>
                    <li className="fdeactive">
                      <img src="../images/fLiveCoinWatch.svg" className="img-fluid" alt="" />
                      LiveCoinWatch
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 fo-copyright">&copy; Vlad Finance.All Rights Reserved</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Menu

const RankingLink = (value) => {
  const { link, name } = value
  return (
    <LiveLink target="_blank" href={link}>
      {name}
    </LiveLink>
  )
}

const SocialFooterLink = (value) => {
  const { link, src, alt } = value
  return (
    <SocialLink target="_blank" title={alt} href={link}>
      <SocialImageFooter src={src} alt={alt} />
    </SocialLink>
  )
}

const SocialHeaderLink = (value) => {
  const { link, src, alt } = value
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
