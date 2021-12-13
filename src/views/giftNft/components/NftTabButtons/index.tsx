import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'

const mapIndexWithUrl: { [k: string]: number } = {
  '/gift-nft': 0,
  '/gift-nft/owned-gifts': 1,
  '/gift-nft/sent-gifts': 2,
}

const NftTabButtons = () => {
  const getDefaultPathIndex = (path: string): number => {
    const defaultIndex = mapIndexWithUrl[path]
    return defaultIndex
  }

  const location = useLocation()
  const path = location.pathname

  const defaultIndex = getDefaultPathIndex(path)

  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex)

  const { url, isExact } = useRouteMatch()

  const handleClick = (index: number) => {
    setActiveTabIndex(index)
  }

  return (
    <Wrapper>
      <ButtonMenu activeIndex={activeTabIndex} onClick={handleClick} size="sm" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          Send
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/owned-gifts`}>
          Owned
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/sent-gifts`}>
          Sent
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default NftTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  margin-top: 32px;
`
