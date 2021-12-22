import React,{useContext} from "react"
import styled from "styled-components"
import { Heading, LogoIcon, Text, Button } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import NftProvider from '../../contexts/NftProvider'
import NftList from './NftList'



const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const CustomHeading = styled(Heading)`
  text-align: center;
`

const Grid = styled.div`
  display: flex;
  width: 100%;
`
const Section = styled.div`
  width: 50%;
  padding: 10px;
`

const Detail = (props) => {
    const { match } = props
    const id = parseInt(match.params.id)
    
    return(
        <NftProvider>
            <Page>
               
               <NftList id={id}/>
            </Page>
        </NftProvider>
    )}
    export default Detail