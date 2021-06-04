import React, { useState, useContext, useCallback } from 'react'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
  ModalWrapper,
  LogoIcon,
} from '@pancakeswap-libs/uikit'

import { Link } from 'react-router-dom'
import { Table } from 'antd'
import useI18n from 'hooks/useI18n'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import { NftProviderContext } from '../contexts/NftProvider'
import TransferNftModal from './TransferNftModal'
import { getNftContract } from '../utils/contracts'

const NftTable = () => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: true,
  })

  const { nftTableData } = useContext(NftProviderContext)

  const TranslateString = useI18n()

  const handleSuccess = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      isDataFetched: true,
    }))
  }

  const columns = [
    {
      title: 'NFT Name',
      dataIndex: 'nftName',
      render: (text, record) => {
        return <p style={{ fontWeight: 600, fontSize: '18px' }}>{record.nftName}</p>
      },
    },
    {
      title: 'NFT preview Image',
      dataIndex: 'nftPreviewImage',
      render: (text, record) => {
        return (
          <div>
            <img
              src={`images/nfts/${record.nftPreviewImage}`}
              alt="preview"
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '25px' }}
            />
          </div>
        )
      },
    },
    {
      title: 'Token ID',
      dataIndex: 'tokenId',
      key: 'tokenId',
    },
    {
      title: 'Rarity',
      dataIndex: 'rarity',
      key: 'rarity',
    },
    {
      title: 'NFT Details',
      dataIndex: 'nftDetailLink',
      render: (text, record) => (
        <Link to={record.nftDetailLink} style={{ color: 'black' }}>
          View Detail
        </Link>
      ),
      key: 'nftDetailLink',
    },
    {
      title: 'Transfer NFT',
      dataIndex: '',
      render: (text, record) => {
        const nft = {
          name: record.nftName,
          metadata: '',
          description: '',
          originalImage: '',
          previewImage: '',
          fileType: '',
          blurImage: '',
          sortOrder: 1,
          nftId: 0,
          tokenAmount: 0,
          tokenSupply: 0,
          nftFarmContract: '',
          nftContract: '',
        }
        const tokenIds = [record.tokenId]
        const [onPresentTransferModal] = ModalWrapper(
          <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
        )
        return (
          <Button
            fullWidth
            variant="primary"
            mt="24px"
            onClick={() => {
              onPresentTransferModal()
            }}
          >
            {TranslateString(999, 'Transfer')}
          </Button>
        )
      },
      key: '',
    },
  ]

  return <Table columns={columns} dataSource={nftTableData} style={{ marginTop: '25px' }} />
}

export default NftTable
