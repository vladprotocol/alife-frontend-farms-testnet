import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const mapIndexWithUrl: { [k: string]: number } = {
  '/farms': 0,
  '/farms/base': 1,
  '/farms/rare': 2,
  '/farms/elite': 3,
}

const FarmTabButtons = ({ stakedOnly, setStakedOnly }) => {
  const getDefaultPathIndex = (path: string): number => {
    const defaultIndex = mapIndexWithUrl[path]
    return defaultIndex
  }

  const location = useLocation()
  const path = location.pathname

  const defaultIndex = getDefaultPathIndex(path)

  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex)

  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  const handleClick = (index: number) => {
    setActiveTabIndex(index)
  }

  const getActiveInactiveIndex = (locationPath): number => {
    let index = parseInt(localStorage.getItem('activeInactiveIndex'))
    if (locationPath === '/farms/history') {
      index = 1
    } else if (locationPath === '/farms') {
      index = 0
    }
    localStorage.setItem('activeInactiveIndex', index.toString())
    return index
  }

  const activeInactiveIndex = getActiveInactiveIndex(path)

  return (
    <>
      <Wrapper>
        <ToggleWrapper>
          <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
          <Text> {TranslateString(699, 'Staked only')}</Text>
        </ToggleWrapper>
        <ButtonMenu activeIndex={activeInactiveIndex} size="sm" variant="subtle">
          <ButtonMenuItem as={Link} to={`${url}`}>
            {TranslateString(698, 'Active')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {TranslateString(700, 'Inactive')}
          </ButtonMenuItem>
        </ButtonMenu>
      </Wrapper>
      <Wrapper>
        <ButtonMenu activeIndex={activeTabIndex} onClick={handleClick} size="sm" variant="subtle">
          <ButtonMenuItem as={Link} to={`${url}/all`}>
            {TranslateString(10006, 'All')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/base`}>
            {TranslateString(10007, 'Base')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/rare`}>
            {TranslateString(10008, 'Rare')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/elite`}>
            {TranslateString(10009, 'Elite')}
          </ButtonMenuItem>
        </ButtonMenu>
      </Wrapper>
    </>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
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
