import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Pools = lazy(() => import('./views/Pools'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Nft = lazy(() => import('./views/Nft'))
const NewNft = lazy(() => import('./views/NewNft'))
const GiftNft = lazy(() => import('./views/giftNft'))

const NftArtist = lazy(() => import('./views/NftArtist'))
const Legendary = lazy(() => import('./views/Legendary'))
const Epic = lazy(() => import('./views/Epic'))
const MyCollection = lazy(() => import('./views/MyCollection'))
const MyNewCollection = lazy(() => import('./views/MyNewCollection'))
const MyEpicCollection = lazy(() => import('./views/MyEpicCollection'))
const MyLegendaryCollection = lazy(() => import('./views/MyLegendaryCollection'))
const Detail = lazy(() => import('./views/Detail'))
const NewDetail = lazy(() => import('./views/NewDetail'))
const LegendaryDetail = lazy(() => import('./views/LegendaryDetail'))
const EpicDetail = lazy(() => import('./views/EpicDetail'))
const GiftNftDetail = lazy(() => import('./views/GiftNftDetail'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/coffin">
              <Farms tokenMode />
            </Route>
            {/* <Route path="/pools"> */}
            {/*  <Pools /> */}
            {/* </Route> */}
            {/* <Route path="/lottery"> */}
            {/*  <Lottery /> */}
            {/* </Route> */}
            {/* <Route path="/ifo"> */}
            {/*  <Ifos /> */}
            {/* </Route> */}
            <Route path="/nft">
              <Nft />
            </Route>
            <Route path="/shibari-nft">
              <NewNft />
            </Route>
            <Route path="/nft-artist">
              <NftArtist />
            </Route>
            <Route path="/gift-nft">
              <GiftNft />
            </Route>

            <Route path="/legendary">
              <Legendary />
            </Route>
            <Route path="/epic">
              <Epic />
            </Route>
            <Route path="/my-collection">
              <MyCollection />
            </Route>
            <Route path="/my-shibari-collection">
              <MyNewCollection />
            </Route>
            <Route path="/my-epic-collection">
              <MyEpicCollection />
            </Route>
            <Route path="/my-legendary-collection">
              <MyLegendaryCollection />
            </Route>
            <Route path="/detail/:id" component={Detail} />
            <Route path="/shibari-detail/:id" component={NewDetail} />
            <Route path="/legendary-detail/:id" component={LegendaryDetail} />
            <Route path="/epic-detail/:id" component={EpicDetail} />
            <Route path="/gift-nft-detail/:id" component={GiftNftDetail} />

            {/* Redirect */}
            {/* <Route path="/staking"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* <Route path="/syrup"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
    </Router>
  )
}

export default React.memo(App)
