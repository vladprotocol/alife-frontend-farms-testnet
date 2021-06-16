import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
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
import { usePancakeRabbits } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import { NftFarm, NFT } from 'config/constants/newnfts'
import orderBy from 'lodash/orderBy'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import { NftProviderContext } from '../contexts/NftProvider'
import TransferNftModal from './TransferNftModal'
import { getNftContract } from '../utils/contracts'

const NftTable = () => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: true,
    nftTableData: [],
  })

  const { account } = useWallet()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState(null)
  const { nftTableData, reInitialize } = useContext(NftProviderContext)


  const TranslateString = useI18n()

  const onTransfer = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isDataFetched: true,
        nftTableData,
      }))
    } catch (err) {
      console.log(err)
    }
  }, [nftTableData])
  const nftContract = usePancakeRabbits(NFT)

  const handleApprove = useCallback(
    async (tokenId) => {
      console.log('tokenId', tokenId)
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }))
        setRequestedApproval(true)
        console.log('onApprove', tokenId)

        console.log('nftContract', nftContract, NftFarm, tokenId)
        await nftContract.methods
          .approve(NftFarm, tokenId)
          .send({ from: account })
          .on('sending', () => {
            setIsLoading(true)
          })
          .on('receipt', () => {
            console.log('receipt')
          })
          .on('error', () => {
            setError('Unable to transfer NFT')
            setIsLoading(false)
          })
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          isDataFetched: true,
          nftTableData,
        }))

        reInitialize()
        setRequestedApproval(false)
      } catch (e) {
        console.error(e)
      }
    },
    [nftTableData, account, nftContract, reInitialize],
  )

  const handleSuccess = () => {
    onTransfer()
    reInitialize()
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
      title: 'NFT Details',
      dataIndex: 'nftDetailLink',
      render: (text, record) => (
        <Button as={Link} to={record.nftDetailLink}>
          View Detail
        </Button>
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
          bunnyId: 0,
        }
        const isApproved = record.isApproved
        const tokenIds = [record.tokenId]
        const [onPresentTransferModal] = ModalWrapper(
          <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
        )
        if (isApproved) {
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
        }
        return (
          <Button
            fullWidth
            variant="primary"
            mt="24px"
            onClick={() => {
              handleApprove(parseInt(record.tokenId, 10))
            }}
            disabled={requestedApproval}
          >
            Approve
          </Button>
        )
      },
      key: '',
    },
  ]

  return <Table columns={columns} dataSource={nftTableData} style={{ marginTop: '25px' }} />
}

export default NftTable
